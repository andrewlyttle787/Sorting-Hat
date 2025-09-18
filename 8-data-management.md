# 8. Data Management

## Goals
- Store all app data in-memory for the session
- Reset data on page refresh or close

## Steps
1. Use JavaScript variables/objects to store teams, participants, and assignments.
2. Ensure all data is lost when the page is refreshed or closed (no persistence).
3. Reset all data when the user restarts the draft.
4. Keep state management simple and clear.

## Details
- No use of LocalStorage or external storage.
- All logic should be in `app.js`.
- Consider using functions to encapsulate state changes.
