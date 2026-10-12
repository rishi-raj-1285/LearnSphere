/**
 * Future AI agent integration point.
 *
 * Planned capabilities (not implemented):
 * - Document parsing, summarization, and topic extraction
 * - Grounded Q&A with citation verification
 * - Multilingual explanations and translation
 * - Study plan and quiz generation
 *
 * Controllers should call functions exported here instead of embedding AI logic.
 */

async function notImplemented(feature) {
  const err = new Error(`${feature} is not implemented yet`);
  err.statusCode = 501;
  throw err;
}

module.exports = {
  notImplemented
};
