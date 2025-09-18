# 5. Draft Logic & Automated Process

## Goals
- Randomly and fairly assign participants to teams in rounds
- Guarantee all participants are assigned

## Steps
1. Implement a round-based draft system:
   - Each round, each team picks one participant
   - Team order is sequential (A, B, C, ...)
2. Use a random selection algorithm to pick from remaining participants.
3. Calculate fair distribution:
   - Evenly distribute participants
   - Handle remainders (e.g., 23 people, 5 teams = 5,5,5,4,4)
4. Continue rounds until all participants are assigned.
5. Store assignments in an in-memory structure (e.g., array of teams with members).

## Details
- No participant should be left unassigned.
- Show draft progress visually in the UI.
- Allow user to trigger "Next Pick" for each round.
- Update remaining participants in real time.
