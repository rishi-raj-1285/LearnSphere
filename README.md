# LearnSphere — Accessible & Multilingual AI Learning Assistant

LearnSphere is a responsive, student-facing educational website frontend built for students to study uploaded notes, grasp complex concepts, learn in regional languages (English, Hindi, Tamil), and manage focused study sessions.

---

## 🎨 Design System & Theme
- **Sky-Blue and White Educational Theme**:
  - Primary Blue: `#38BDF8`
  - Strong Blue: `#0284C7`
  - Dark Blue: `#075985`
  - Main Background: `#F0F9FF`
  - Card Background: `#FFFFFF`
  - Light Blue Surface: `#E0F2FE`
  - Text: `#0F172A` / Secondary: `#64748B`
  - Border: `#DBEAFE`
- **Accessibility Modes**:
  - Dynamic Typography Scaling: Standard (15px), Medium (17px), Large (19px).
  - High-Contrast Mode: Elevated contrast borders and solid fills adhering to WCAG standards.
  - Simplified Layout Mode: Hides decorative elements and enlarges touch targets.
  - Read-Aloud Pacing: 0.8x, 1.0x, 1.2x, 1.5x.

---

## 🚀 Key Features

### 1. Student Onboarding Wizard
- 5-step interactive onboarding process:
  1. Academic Information (Level, Institution, Degree).
  2. Subjects of Interest & Initial Proficiencies.
  3. Primary & Secondary Languages (English, Hindi, Tamil) and Preferred Formats.
  4. Learning Goals, Daily Study Target & Preferred Study Periods.
  5. Accessibility Settings & Optional 4-Question Diagnostic Assessment with feedback.
- Preferences are persisted in `localStorage` and can be re-run or edited anytime.

### 2. Student Dashboard
- Personalized greeting and study milestone trackers.
- Today's interactive study plan with completion checkboxes.
- "Continue Learning" banner with progress indicators.
- Spaced repetition revision tasks.
- Subject mastery bars across enrolled topics.
- Quick action triggers: Upload Notes, Ask Question, Summarize PDF, Generate Quiz, Start Focus Sprint.

### 3. AI Study Workspace
- Grounded study discussions tied to specific uploaded documents.
- Suggested prompt pills for quick inquiry.
- Educational response cards featuring:
  - Concept summaries and step-by-step breakdowns.
  - Formatted LaTeX mathematical formulas.
  - Verified source references with page citations.
- Copy to clipboard and bookmarking with toast notifications.
- New conversation creation and thread switching.

### 4. Document Library & Upload
- Frontend file selection supporting PDFs, PowerPoint slides (`.pptx`), plain text (`.txt`), and textbook page images (`.png`, `.jpg`).
- Drag-and-drop upload zone, progress bar simulating extraction phases, cancel capability, and format verification.
- Pre-populated realistic sample documents (Data Structures, Cell Biology, Macroeconomics, Linear Algebra).

### 5. Document Study Interface & PDF Summarizer
- **Summary Options**: Switch instantly between One-Page Summary, Detailed Chapter Summary, Bullet-Point Notes, Quick Revision Sheet, and Last-Minute Exam Cram.
- **Topic Extraction**: Expandable sections for Chapters, Subtopics, Key Concepts, Definitions, Formulas, and Important Results.
- **Explain a Concept**: Adaptive explainer providing Simple, Step-by-Step, With Examples, Advanced Technical, or Bilingual explanations.
- **Multilingual Translation Station**: Side-by-side English, Hindi, and Tamil technical terms.
- **Formulas & Definitions Library**: Organized index with exact page citations.
- **Diagram & Table Explanations**: Visual model side-by-side with structured pedagogical breakdown.
- **Syllabus Coverage Analyzer**: Matches topics against official course syllabi, categorizing topics into Covered, Partially Covered, and Gaps.
- **Generated Resources**: Interactive flashcards (flip & master), multiple-choice practice quiz with instant explanations, concept mind maps, and glossaries.
- **Multi-Document Comparative Learning**: Synthesize cross-cutting principles across 2+ documents in the same subject.

### 6. Study Conversations Archive
- Search, filter by subject, rename, reopen in workspace, and delete conversations.

### 7. Learning Resources Repository
- Central hub for flashcards, summaries, quizzes, glossaries, and bookmarked notes.

### 8. My Learning Profile & Settings
- Full editing of student information, subjects, languages, schedules, and accessibility preferences.

---

## 🛠️ Technology Stack
- **Framework**: Vanilla React (JavaScript + JSX). Minimal hooks (`useState`, `useEffect`).
- **Styling**: Standard CSS with CSS variables. No Tailwind, no component libraries.
- **Storage**: `localStorage` for state persistence.
- **Tooling**: Vite for fast bundling and local dev server.

---

## 🏃 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```
