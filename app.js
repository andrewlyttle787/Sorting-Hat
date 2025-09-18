// Setup phase logic
const setupTeamList = document.getElementById('setup-team-list');
const setupPersonList = document.getElementById('setup-person-list');
const startDraftBtn = document.getElementById('start-draft');
const setupError = document.getElementById('setup-error');

function renderSetupLists() {
	setupTeamList.innerHTML = '';
	teams.forEach(team => {
		const li = document.createElement('li');
		li.textContent = team;
		setupTeamList.appendChild(li);
	});
	setupPersonList.innerHTML = '';
	people.forEach(person => {
		const li = document.createElement('li');
		li.textContent = person;
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

// Initial render
renderSetupLists();
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
}

function editPerson(idx) {
	const newName = prompt('Edit participant name:', people[idx]);
	if (newName && newName.trim() && !people.includes(newName.trim())) {
		people[idx] = newName.trim();
		personError.textContent = '';
		renderPeople();
	} else if (people.includes(newName.trim())) {
		personError.textContent = 'Participant name must be unique.';
	}
}

function deletePerson(idx) {
	people.splice(idx, 1);
	renderPeople();
}

personForm.addEventListener('submit', function(e) {
	e.preventDefault();
	addPerson(personNameInput.value);
	personNameInput.value = '';
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
}

function editTeam(idx) {
	const newName = prompt('Edit team name:', teams[idx]);
	if (newName && newName.trim() && !teams.includes(newName.trim())) {
		teams[idx] = newName.trim();
		teamError.textContent = '';
		renderTeams();
	} else if (teams.includes(newName.trim())) {
		teamError.textContent = 'Team name must be unique.';
	}
}

function deleteTeam(idx) {
	teams.splice(idx, 1);
	renderTeams();
}

teamForm.addEventListener('submit', function(e) {
	e.preventDefault();
	addTeam(teamNameInput.value);
	teamNameInput.value = '';
});
