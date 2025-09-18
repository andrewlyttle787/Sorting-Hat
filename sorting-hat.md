# Implementation Steps for Draft Pick Web Application

This checklist strictly follows the requirements in `spec.md`.

## 1. Project Setup
- [ ] Create `index.html` in the `draft/` directory
- [ ] Create `styles.css` for styling
- [ ] Create `app.js` for JavaScript logic
- [ ] Link CSS and JS files in `index.html`
- [ ] Use only HTML5, CSS3, and Vanilla JavaScript (ES6+)

## 2. Team Management
- [ ] Implement UI for creating teams with custom names
- [ ] Enable editing and deleting teams before draft starts
- [ ] Enforce minimum of 2 teams

## 3. People Management
- [ ] Implement UI for adding participants to the draft pool
- [ ] Enable editing and deleting participants before draft starts
- [ ] Enforce minimum of 2 participants

## 4. Setup Phase UI
- [ ] Add form inputs for teams and participants
- [ ] Display lists of current teams and participants
- [ ] Validate all inputs before allowing draft to start

## 5. Draft Logic & Automated Process
- [ ] Implement round-based, random assignment of participants to teams
- [ ] Ensure fair distribution (e.g., 23 people, 5 teams = 5,5,5,4,4)
- [ ] Handle remainder participants appropriately
- [ ] Guarantee all participants are assigned
- [ ] Use sequential team order for picks

## 6. Draft Phase UI
- [ ] Visual draft board showing team assignments
- [ ] Progress indicators (current round, team turn)
- [ ] "Next Pick" controls for user interaction
- [ ] Real-time updates of remaining participants

## 7. Results Phase
- [ ] Display final team rosters
- [ ] Option to restart with a new draft

## 8. Data Management
- [ ] Store all data in-memory (session-based) in `app.js`
- [ ] Reset data on page refresh or close
- [ ] Use JavaScript variables for state management

## 9. User Experience & Technical Constraints
- [ ] Ensure single-page application with state-based views
- [ ] Responsive design for desktop and mobile (use `styles.css`)
- [ ] Provide clear visual feedback and error messages
- [ ] No external libraries/frameworks
- [ ] Offline functionality after initial load
- [ ] Compatible with Chrome, Firefox, Safari, Edge

## 10. Success Criteria Validation
- [ ] Test all features for reliability and fairness
- [ ] Confirm intuitive and responsive interface

---

**Future Considerations (Optional, not required for spec):**
- LocalStorage persistence
- Export results
- Draft history
- Multiple algorithms
- Team size constraints
- Import participant lists
