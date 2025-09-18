# 2. Team Management

## Goals
- Allow users to create, edit, and delete teams before the draft starts
- Enforce a minimum of 2 teams

## Steps
1. Design a UI section for team management (form input for team name, add button, list of teams).
2. Implement logic in `app.js` to add new teams to an in-memory array.
3. Enable editing team names before the draft starts.
4. Enable deleting teams before the draft starts.
5. Prevent starting the draft if fewer than 2 teams exist.

## Details
- Each team should have a unique name (validate for duplicates).
- Provide clear feedback for invalid actions (e.g., duplicate names, too few teams).
- Use session-based storage (JavaScript variables only).
- UI should update in real time as teams are added/edited/deleted.
