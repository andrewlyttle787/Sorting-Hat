# 4. Setup Phase UI

## Goals
- Provide intuitive forms and lists for teams and participants
- Validate all inputs before draft can start

## Steps
1. Add form inputs for team names and participant names in the UI.
2. Display lists of current teams and participants, with edit and delete controls.
3. Implement validation logic to ensure:
   - Minimum 2 teams and 2 participants
   - No duplicate names
   - All fields are filled before adding
4. Disable or hide the "Start Draft" button until all validations pass.
5. Show error messages for invalid actions (e.g., duplicate names, empty fields).

## Details
- Use clear labels and buttons for all actions.
- Update lists in real time as items are added/edited/deleted.
- Ensure accessibility and responsiveness in the UI.
