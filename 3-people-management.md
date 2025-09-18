# 3. People Management

## Goals
- Allow users to add, edit, and delete participants before the draft starts
- Enforce a minimum of 2 participants

## Steps
1. Design a UI section for people management (form input for participant name, add button, list of participants).
2. Implement logic in `app.js` to add new participants to an in-memory array.
3. Enable editing participant names before the draft starts.
4. Enable deleting participants before the draft starts.
5. Prevent starting the draft if fewer than 2 participants exist.

## Details
- Each participant should have a unique name (validate for duplicates).
- Provide clear feedback for invalid actions (e.g., duplicate names, too few participants).
- Use session-based storage (JavaScript variables only).
- UI should update in real time as participants are added/edited/deleted.
