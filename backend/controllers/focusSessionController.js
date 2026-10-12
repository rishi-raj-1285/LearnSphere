const FocusSession = require('../models/FocusSession');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

function sessionToResponse(s) {
  return {
    id: s._id.toString(),
    subject: s.subject,
    plannedDurationMinutes: s.plannedDurationMinutes,
    actualDurationMinutes: s.actualDurationMinutes,
    startedAt: s.startedAt,
    endedAt: s.endedAt,
    completionStatus: s.completionStatus,
    scratchpadNotes: s.scratchpadNotes,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  };
}

const listFocusSessions = asyncHandler(async (req, res) => {
  const limit = Math.min(100, parseInt(req.query.limit, 10) || 50);
  const sessions = await FocusSession.find({ owner: req.user._id })
    .sort({ startedAt: -1 })
    .limit(limit);
  res.json({ success: true, data: sessions.map(sessionToResponse) });
});

const createFocusSession = asyncHandler(async (req, res) => {
  const { subject, plannedDurationMinutes, startedAt, scratchpadNotes } = req.body;
  if (!subject) throw new ApiError(400, 'Subject is required');
  if (!plannedDurationMinutes || plannedDurationMinutes < 1) {
    throw new ApiError(400, 'plannedDurationMinutes must be at least 1');
  }

  const start = startedAt ? new Date(startedAt) : new Date();
  if (Number.isNaN(start.getTime())) {
    throw new ApiError(400, 'Invalid startedAt');
  }

  const session = await FocusSession.create({
    owner: req.user._id,
    subject: String(subject).trim(),
    plannedDurationMinutes: Number(plannedDurationMinutes),
    startedAt: start,
    completionStatus: 'in_progress',
    scratchpadNotes: scratchpadNotes || ''
  });

  res.status(201).json({ success: true, data: sessionToResponse(session) });
});

const patchFocusSession = asyncHandler(async (req, res) => {
  const session = await FocusSession.findOne({ _id: req.params.id, owner: req.user._id });
  if (!session) throw new ApiError(404, 'Focus session not found');

  if (req.body.completionStatus !== undefined) {
    const allowed = ['in_progress', 'completed', 'cancelled'];
    if (!allowed.includes(req.body.completionStatus)) {
      throw new ApiError(400, 'Invalid completion status');
    }
    session.completionStatus = req.body.completionStatus;
  }

  if (req.body.endedAt !== undefined) {
    const end = new Date(req.body.endedAt);
    if (Number.isNaN(end.getTime())) throw new ApiError(400, 'Invalid endedAt');
    if (end < session.startedAt) throw new ApiError(400, 'endedAt cannot be before startedAt');
    session.endedAt = end;
  }

  if (req.body.actualDurationMinutes !== undefined) {
    const mins = Number(req.body.actualDurationMinutes);
    if (mins < 0 || mins > 480) throw new ApiError(400, 'Invalid actual duration');
    session.actualDurationMinutes = mins;
  } else if (session.endedAt && session.startedAt) {
    const diffMs = session.endedAt - session.startedAt;
    session.actualDurationMinutes = Math.min(480, Math.max(0, Math.round(diffMs / 60000)));
  }

  if (req.body.scratchpadNotes !== undefined) {
    session.scratchpadNotes = String(req.body.scratchpadNotes).slice(0, 5000);
  }

  if (session.completionStatus === 'completed' && !session.endedAt) {
    session.endedAt = new Date();
    if (session.actualDurationMinutes == null) {
      session.actualDurationMinutes = session.plannedDurationMinutes;
    }
  }

  await session.save();
  res.json({ success: true, data: sessionToResponse(session) });
});

module.exports = { listFocusSessions, createFocusSession, patchFocusSession };
