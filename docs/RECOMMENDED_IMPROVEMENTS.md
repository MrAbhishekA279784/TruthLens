# Recommended Additional Frontend Improvements

As part of the Round 2 Polish & Feature Audit, the following 8 frontend-only improvements were identified to elevate TruthLens from a prototype to a production-grade editorial media forensics suite.

| # | Improvement | Description | Rationale | Priority | Status in Frontend |
|---|---|---|---|---|---|
| 1 | **Command Palette (Ctrl + K modal)** | Universal searchable spotlight modal allowing users to jump to any scan, trigger new analysis, or query AI assistant. | Eliminates navigation friction for power users and fact-checking journalists. | **High** | Implemented keyboard shortcut hook & instant search in Topbar |
| 2 | **Keyboard Accessibility & Focus Rings** | Consistent WCAG-compliant `focus-visible:ring-1 ring-[#11120D]` on all interactive buttons, inputs, and tabs. | Ensures full keyboard navigation for assistive tech without ugly default browser rings. | **High** | Implemented across all components |
| 3 | **Interactive Layer Switcher (RGB / Landmarks / ELA)** | Live multi-layer toggling on Image Analysis (`RGB`, `Facial Landmarks`, `Error Level Analysis`). | Allows visual investigators to inspect pixel-level compression artifacts directly in-browser. | **High** | Implemented in `ImageAnalysis.tsx` |
| 4 | **Native Touch Haptics (Vibration API)** | Subtle 8ms–15ms tactile feedback on button clicks, tab selections, and file uploads using `navigator.vibrate`. | Gives mobile and touch devices physical confirmation of actions without intrusive sounds. | **Medium** | Implemented in `utils/haptics.ts` |
| 5 | **Confidence Bar Animated Interpolation** | Smooth 60fps CSS GPU-accelerated transition on forensic confidence bars (`0% → 92%` or `87%`). | Prevents static jumps and visually communicates the completion of the calibration model. | **Medium** | Implemented with smooth easing |
| 6 | **Mock Offline & Error Recovery Banner** | Soft ambient toast notification if a drag-and-drop file format is unsupported or file size exceeds limits. | Prevents silent failures and guides users to accepted formats (MP4, MOV, JPG, PNG, WAV). | **Medium** | Implemented with format validation |
| 7 | **Micro-Interaction Copy/Export State Feedback** | Inline state transformation (e.g. `Copy` → `✓ Copied`, `Download` → `✓ Exporting...`) with 2.5s auto-reset. | Provides clear user assurance without blocking the UI with intrusive alert dialogs. | **High** | Implemented across all cards and passport |
| 8 | **Zero-Layout-Shift (CLS) Media Frames** | Pre-computed `aspect-video` and `aspect-[4/3]` geometry on video frames and spectrogram containers. | Eliminates page jumping while images render or when switching between Image/Video/Audio. | **High** | Implemented with strict container ratios |
