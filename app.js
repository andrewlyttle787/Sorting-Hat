// Draft logic & automated process
let draftActive = false;
let draftAssignments = [];
let draftRound = 1;
let draftTeamTurn = 0;
let remainingPeople = [];

const draftPhaseSection = document.getElementById('draft-phase');
const draftBoard = document.getElementById('draft-board');
const draftRoundSpan = document.getElementById('draft-round');
const draftTeamTurnSpan = document.getElementById('draft-team-turn');
const nextPickBtn = document.getElementById('next-pick');
const remainingPeopleList = document.getElementById('remaining-people-list');

function startDraft() {
	draftActive = true;
	draftAssignments = teams.map(team => ({ name: team, members: [] }));
	draftRound = 1;
	draftTeamTurn = 0;
	remainingPeople = [...people];
	setupPhaseSection.style.display = 'none';
	draftPhaseSection.style.display = '';
	renderDraftBoard();
	updateDraftUI();
	nextPickBtn.disabled = false;
}

function renderDraftBoard() {
	draftBoard.innerHTML = '';
	draftAssignments.forEach(team => {
		const div = document.createElement('div');
		div.style.marginBottom = '1em';
		div.innerHTML = `<strong>${team.name}</strong>: ${team.members.join(', ')}`;
		draftBoard.appendChild(div);
	});
}

function updateDraftUI() {
	draftRoundSpan.textContent = `Round: ${draftRound}`;
	draftTeamTurnSpan.textContent = ` | Team Turn: ${draftAssignments[draftTeamTurn].name}`;
	remainingPeopleList.innerHTML = '';
	remainingPeople.forEach(person => {
		const li = document.createElement('li');
		li.textContent = person;
		remainingPeopleList.appendChild(li);
	});
}

function fairDistributionCounts(total, numTeams) {
	// Returns array of team sizes for fair distribution
	const base = Math.floor(total / numTeams);
	const remainder = total % numTeams;
	return Array(numTeams).fill(base).map((v, i) => v + (i < remainder ? 1 : 0));
}

function nextPick() {
	if (remainingPeople.length === 0) {
		nextPickBtn.disabled = true;
		return;
	}
	// Determine fair team sizes
	const teamSizes = fairDistributionCounts(people.length, teams.length);
	// Only pick if team hasn't reached its fair size
	while (draftAssignments[draftTeamTurn].members.length >= teamSizes[draftTeamTurn]) {
		draftTeamTurn = (draftTeamTurn + 1) % teams.length;
		if (draftAssignments.every((team, idx) => team.members.length >= teamSizes[idx])) {
			nextPickBtn.disabled = true;
			renderDraftBoard();
			updateDraftUI();
			return;
		}
	}
	// Randomly select a participant
	const randIdx = Math.floor(Math.random() * remainingPeople.length);
	const selected = remainingPeople.splice(randIdx, 1)[0];
	draftAssignments[draftTeamTurn].members.push(selected);
	renderDraftBoard();
	updateDraftUI();
	// Advance team turn
	draftTeamTurn = (draftTeamTurn + 1) % teams.length;
	// If all assigned, disable button
	if (remainingPeople.length === 0) {
		nextPickBtn.disabled = true;
	}
	// If all teams have reached their fair size, end draft
	if (draftAssignments.every((team, idx) => team.members.length >= teamSizes[idx])) {
		nextPickBtn.disabled = true;
	}
}

startDraftBtn.addEventListener('click', startDraft);
nextPickBtn.addEventListener('click', nextPick);
// Setup phase logic
const setupTeamList = document.getElementById('setup-team-list');
const setupPersonList = document.getElementById('setup-person-list');
const startDraftBtn = document.getElementById('start-draft');
const setupError = document.getElementById('setup-error');

function renderSetupLists() {
    setupTeamList.innerHTML = '';
    teams.forEach((team, idx) => {
        const li = document.createElement('li');
        li.textContent = team;
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTeam(idx);
        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteTeam(idx);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        setupTeamList.appendChild(li);
    });
    setupPersonList.innerHTML = '';
    people.forEach((person, idx) => {
        const li = document.createElement('li');
        li.textContent = person;
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editPerson(idx);
        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deletePerson(idx);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        setupPersonList.appendChild(li);
    });
    validateSetup();
}

function validateSetup() {
	if (teams.length < 2) {
		setupError.textContent = 'At least 2 teams are required.';
		startDraftBtn.disabled = true;
		return;
	}
	if (people.length < 2) {
		setupError.textContent = 'At least 2 participants are required.';
		startDraftBtn.disabled = true;
		return;
	}
	setupError.textContent = '';
	startDraftBtn.disabled = false;
}

// Update setup lists whenever teams or people change
function updateAllLists() {
	renderTeams();
	renderPeople();
	renderSetupLists();
}

// People management logic
const people = [];

const personForm = document.getElementById('person-form');
const personNameInput = document.getElementById('person-name');
const personList = document.getElementById('person-list');
const personError = document.getElementById('person-error');

function renderPeople() {
	personList.innerHTML = '';
	people.forEach((person, idx) => {
		const li = document.createElement('li');
		li.textContent = person;
		// Edit button
		const editBtn = document.createElement('button');
		editBtn.textContent = 'Edit';
		editBtn.onclick = () => editPerson(idx);
		// Delete button
		const delBtn = document.createElement('button');
		delBtn.textContent = 'Delete';
		delBtn.onclick = () => deletePerson(idx);
		li.appendChild(editBtn);
		li.appendChild(delBtn);
		personList.appendChild(li);
	});
}

function addPerson(name) {
    if (!name.trim()) {
        personError.textContent = 'Participant name cannot be empty.';
        return;
    }
    if (people.includes(name.trim())) {
        personError.textContent = 'Participant name must be unique.';
        return;
    }
    people.push(name.trim());
    personError.textContent = '';
    renderPeople();
    renderSetupLists();
}

function editPerson(idx) {
    const newName = prompt('Edit participant name:', people[idx]);
    if (newName && newName.trim() && !people.includes(newName.trim())) {
        people[idx] = newName.trim();
        personError.textContent = '';
        renderPeople();
        renderSetupLists();
    } else if (people.includes(newName.trim())) {
        personError.textContent = 'Participant name must be unique.';
    }
}

function deletePerson(idx) {
    people.splice(idx, 1);
    renderPeople();
    renderSetupLists();
}

personForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addPerson(personNameInput.value);
    personNameInput.value = '';
    renderSetupLists();
});
// Sorting Hat Draft Pick App
// Team management logic
console.log('Sorting Hat JS loaded');

const teams = [];

const teamForm = document.getElementById('team-form');
const teamNameInput = document.getElementById('team-name');
const teamList = document.getElementById('team-list');
const teamError = document.getElementById('team-error');

function renderTeams() {
	teamList.innerHTML = '';
	teams.forEach((team, idx) => {
		const li = document.createElement('li');
		li.textContent = team;
		// Edit button
		const editBtn = document.createElement('button');
		editBtn.textContent = 'Edit';
		editBtn.onclick = () => editTeam(idx);
		// Delete button
		const delBtn = document.createElement('button');
		delBtn.textContent = 'Delete';
		delBtn.onclick = () => deleteTeam(idx);
		li.appendChild(editBtn);
		li.appendChild(delBtn);
		teamList.appendChild(li);
	});
}

function addTeam(name) {
    if (!name.trim()) {
        teamError.textContent = 'Team name cannot be empty.';
        return;
    }
    if (teams.includes(name.trim())) {
        teamError.textContent = 'Team name must be unique.';
        return;
    }
    teams.push(name.trim());
    teamError.textContent = '';
    renderTeams();
    renderSetupLists();
}

function editTeam(idx) {
    const newName = prompt('Edit team name:', teams[idx]);
    if (newName && newName.trim() && !teams.includes(newName.trim())) {
        teams[idx] = newName.trim();
        teamError.textContent = '';
        renderTeams();
        renderSetupLists();
    } else if (teams.includes(newName.trim())) {
        teamError.textContent = 'Team name must be unique.';
    }
}

function deleteTeam(idx) {
    teams.splice(idx, 1);
    renderTeams();
    renderSetupLists();
}

teamForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTeam(teamNameInput.value);
    teamNameInput.value = '';
    renderSetupLists();
});

// Override render functions to also update setup lists
const originalRenderTeams = renderTeams;
renderTeams = function() {
    originalRenderTeams();
    renderSetupLists();
};
const originalRenderPeople = renderPeople;
renderPeople = function() {
    originalRenderPeople();
    renderSetupLists();
};

// Initial render (must be last)
renderTeams();
renderPeople();
renderSetupLists();
