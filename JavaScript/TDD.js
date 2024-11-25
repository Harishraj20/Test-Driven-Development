// Elements for user management
const addUserButton = document.querySelector('.addUserButton');
const closeButton = document.querySelector('.close-button');
const addUserForm = document.querySelector('#addUserForm');
const userModal = document.querySelector('#addUserModal');
const usersList = document.querySelector('#usersList');
const createGroupButton = document.querySelector('.createGroupButton');
const closeAddGroupModalButton = document.querySelector('.close-button-for-AddGroup');
const closeAssignGroupModalButton = document.querySelector('.close-button-for-Assign');
const closeRemoveGroupModalButton = document.querySelector('.close-button-for-Remove');
const addGroupForm = document.querySelector('#addGroupForm');
const addGroupModal = document.querySelector('#addgroupModal');
const groupTable = document.querySelector('#usersTableofGroup tbody');
const assignGroupModal = document.querySelector('#assignGroupModal');
const removeGroupModal = document.querySelector('#removeGroupModal');
const assignGroupForm = document.querySelector('#assignGroupForm');
const removeGroupForm = document.querySelector('#removeGroupForm');
const assignUsersSelect = document.querySelector('#assignUsers');
const removeUsersSelect = document.querySelector('#removeUsers');
const assignGroupButton = document.querySelector('.assignUsers');

function showSection(sectionId) {
    const sections = ['UserManagement', 'GroupManagement', 'RoleManagement'];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
    });
}

function setActiveButton(buttonId) {
    document.querySelectorAll('.child1 button').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.getElementById(buttonId);

    if (activeButton) {
        activeButton.classList.add('active');
    }
}

document.querySelectorAll('.child1 button').forEach(button => {
    button.addEventListener('click', () => {
        setActiveButton(button.id);
    });
});

addUserButton.addEventListener('click', () => {
    userModal.style.display = 'flex';
    addUserForm.reset();
    document.querySelector('#formTitle h3').textContent = 'ADD USER FORM';
    userModal.dataset.userId = '';
});

closeButton.addEventListener('click', () => {
    userModal.style.display = 'none';
});

function renderUsers() {
    let users = getUsersFromLocalStorage();

    if (users.length === 0) {
        usersList.innerHTML = '<tr><td colspan="5">No users available</td></tr>';
    } else {
        const rows = users.map(user => `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>
                        <button class="edit-button" data-username="${user.username}"><i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>Edit</button>
                        <button class="delete-button" data-username="${user.username}"><i class="fa-solid fa-trash" style="color: #ffffff;"></i>Delete</button>
                    </td>
                </tr>
            `).join('');

        usersList.innerHTML = rows;
        attachUserEventListeners();
    }
}

function attachUserEventListeners() {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', () => {
            editUser(button.dataset.username);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', () => {
            deleteUser(button.dataset.username);
        });
    });
}

function addUser(event) {
    event.preventDefault();
    const userId = userModal.dataset.userId;
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();

    if (!username || !email || !firstName || !lastName) {
        displayErrorMessage('Field is Empty', 'red');
        return;
    }
    if (!validateName(firstName) || !validateName(lastName) || !validateMailId(email)) {
        if (!validateName(firstName)) {
            displayErrorMessage('First Name cannot be numbers or special characters!', 'red');
            return;
        } else if (!validateMailId(email)) {
            displayErrorMessage('Invalid email format!');
            return;
        } else {
            displayErrorMessage('Last Name cannot be numbers or special characters!', 'red');
            return;
        }
    }

    let storedUsers = getUsersFromLocalStorage();
    const usernameExists = storedUsers.some(user => user.username === username && user.username !== userId);
    const emailExists = storedUsers.some(user => user.email === email && user.username !== userId);

    if (usernameExists) {
        displayErrorMessage('Username already exists', 'red');
        return;
    }

    if (emailExists) {
        displayErrorMessage('Email already exists', 'red');
        return;
    }

    let userIndex = storedUsers.findIndex(user => user.username === userId);
    if (userId && userIndex > -1) {
        storedUsers[userIndex] = { username, email, firstName, lastName };
        saveUsersToLocalStorage(storedUsers);
        displaySuccessMessage('User updated successfully', 'green');
    } else {
        storedUsers.push({ username, email, firstName, lastName });
        saveUsersToLocalStorage(storedUsers);
        displaySuccessMessage('User added successfully', 'green');
    }

    renderUsers();
    userModal.style.display = 'none';
}

function editUser(username) {
    let users = getUsersFromLocalStorage();
    const user = users.find(user => user.username === username);
    document.querySelector('#username').value = user.username;
    document.querySelector('#email').value = user.email;
    document.querySelector('#firstName').value = user.firstName;
    document.querySelector('#lastName').value = user.lastName;
    document.querySelector('#formTitle h3').textContent = 'UPDATE USER';
    userModal.style.display = 'flex';
    userModal.dataset.userId = user.username;

}

function deleteUser(username) {
    const confirmationModal = document.querySelector('#confirmationModal');
    const modalText = document.querySelector('#modalText');
    const confirmButton = document.querySelector('#confirmButton');
    const cancelButton = document.querySelector('#cancelButton');

    modalText.textContent = `Are you sure to delete the user '${username}'?`;
    confirmationModal.style.display = 'flex';

    confirmButton.onclick = function () {
        let users = getUsersFromLocalStorage();
        users = users.filter(user => user.username !== username);
        saveUsersToLocalStorage(users);
        renderUsers();
        displaySuccessMessage(`User '${username}' deleted Successfully!`, 'red');
        confirmationModal.style.display = 'none';
    }

    cancelButton.onclick = function () {
        confirmationModal.style.display = 'none';
    }
}

function validateName(name) {
    const string = /^[A-Za-z]+$/;
    return string.test(name);
}

function validateMailId(MailId) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(MailId)
}

addUserForm.addEventListener('submit', addUser);
renderUsers();

// Display error message
function displayErrorMessage(text, color) {
    const errorMessage = document.querySelector('.errorMessage p');
    const errorMessageDiv = document.querySelector('.errorMessage');

    errorMessage.textContent = text;
    errorMessage.style.color = color;
    errorMessageDiv.style.visibility = 'visible';

    setTimeout(() => {
        errorMessageDiv.style.visibility = 'hidden';
    }, 2500);

}

function displaySuccessMessage(text, color) {
    const successMessage = document.querySelector('#successMessage p');
    const successMessageDiv = document.querySelector('#successMessage');

    successMessage.textContent = text;
    successMessage.style.color = color;
    successMessageDiv.style.visibility = 'visible';

    setTimeout(() => {
        successMessageDiv.style.visibility = 'hidden';
    }, 2500);

}

function getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Functions to interact with Local Storage
function getGroupsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('groups')) || [];
}

function saveGroupsToLocalStorage(groups) {
    localStorage.setItem('groups', JSON.stringify(groups));
}

// Function to render groups in the table
function renderGroups() {
    const groups = getGroupsFromLocalStorage();
    const rows = groups.map(group => `
            <tr>
                <td>${group.GroupName}</td>
                <td>${group.users.join(', ') || '-'}</td>
                <td>
                    <button class="assign-button" data-group-name="${group.GroupName}">Assign</button>
                    <button class="delete-button" data-group-name="${group.GroupName}">Delete</button>
                </td>
            </tr>
        `).join('');
    groupTable.innerHTML = rows;

    // Attach event listeners to dynamically created buttons
    document.querySelectorAll('.assign-button').forEach(button => {
        button.addEventListener('click', () => {
            const groupName = button.dataset.groupName;
            showAssignModal(groupName);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', () => {
            const groupName = button.dataset.groupName;
            showRemoveModal(groupName);
        });
    });
}

// Function to show the Add Group modal
function showAddGroupModal() {
    addGroupModal.style.display = 'flex';
}

// Function to handle adding a new group
function addGroup(event) {
    event.preventDefault();
    const groupName = document.querySelector('#groupName').value.trim();

    if (!groupName) {
        displayErrorMessageForGroup('Group Name Field Cannot Be Empty', 'red');
        return;
    }

    let groups = getGroupsFromLocalStorage();
    const groupExists = groups.some(group => group.GroupName === groupName);

    if (groupExists) {
        displayErrorMessageForGroup('Group already exists', 'red');
        return;
    }

    groups.push({ GroupName: groupName, users: [] });
    saveGroupsToLocalStorage(groups);
    displaySuccessMessageForGroup(`Group '${groupName}' created successfully!`, 'green');
    addGroupForm.reset()
    renderGroups();
    addGroupModal.style.display = 'none';
}

function showAssignModal(groupName) {
    const users = getUsersFromLocalStorage();
    const groups = getGroupsFromLocalStorage();
    const group = groups.find(g => g.GroupName === groupName);

    const availableUsers = users.filter(user => !group.users.includes(user.username));

    let userOptions;

    if (availableUsers.length > 0) {
        userOptions = availableUsers
            .map(user => `<option value="${user.username}">${user.username}</option>`)
            .join('');
    } else {
        userOptions = '<option value="">No Users to Assign</option>';
    }

    assignUsersSelect.innerHTML = userOptions;
    assignGroupModal.style.display = 'flex';
    assignGroupForm.dataset.groupName = groupName;
    assignGroupButton.textContent = 'Assign Users';
}

function showRemoveModal(groupName) {
    const groups = getGroupsFromLocalStorage();

    const group = groups.find(g => g.GroupName === groupName);

    const assignedUsers = group.users;

    const userOptions = assignedUsers
        .map(username => `<option value="${username}">${username}</option>`)
        .join('');
    removeUsersSelect.innerHTML = userOptions;

    removeGroupForm.dataset.groupName = groupName;

    removeGroupModal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

assignGroupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const groupName = this.dataset.groupName;
    const selectedUsers = Array.from(assignUsersSelect.selectedOptions).map(option => option.value);

    let groups = getGroupsFromLocalStorage();
    groups = groups.map(group => group.GroupName === groupName
        ? { ...group, users: [...new Set([...group.users, ...selectedUsers])] }
        : group
    );

    saveGroupsToLocalStorage(groups);
    closeModal(assignGroupModal);
    renderGroups();
});

removeGroupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const groupName = this.dataset.groupName;
    const selectedUsers = Array.from(removeUsersSelect.selectedOptions).map(option => option.value);

    let groups = getGroupsFromLocalStorage();
    groups = groups.map(group => {
        if (group.GroupName === groupName) {
            group.users = group.users.filter(user => !selectedUsers.includes(user));
        }
        return group;
    });
    saveGroupsToLocalStorage(groups);
    closeModal(removeGroupModal);
    renderGroups();
});
// Function to display error messages
function displayErrorMessageForGroup(text, color) {
    const errorMessage = document.querySelector('.errorMessageForGroup p');
    const errorMessageDiv = document.querySelector('.errorMessageForGroup');

    errorMessage.textContent = text;
    errorMessage.style.color = color;
    errorMessageDiv.style.visibility = 'visible';

    setTimeout(() => {
        errorMessageDiv.style.visibility = 'hidden';
    }, 2500);
}

// Function to display success messages
function displaySuccessMessageForGroup(text, color) {
    const successMessage = document.querySelector('#successMessageForGroup p');
    const successMessageDiv = document.querySelector('#successMessageForGroup');

    successMessage.textContent = text;
    successMessage.style.color = color;
    successMessageDiv.style.visibility = 'visible';

    setTimeout(() => {
        successMessageDiv.style.visibility = 'hidden';
    }, 2500);
}

// Event listeners
createGroupButton.addEventListener('click', showAddGroupModal);
closeAddGroupModalButton.addEventListener('click', () => closeModal(addGroupModal));
closeAssignGroupModalButton.addEventListener('click', () => closeModal(assignGroupModal));
closeRemoveGroupModalButton.addEventListener('click', () => closeModal(removeGroupModal));

addGroupForm.addEventListener('submit', addGroup);

renderGroups();

// For Role Managemennt
const openAddRoleModalButton = document.querySelector('#openAddRoleModal');
const closeAddRoleModalButton = document.querySelector('.close-button-for-AddRole');
const addRoleModal = document.querySelector('#addRoleModal');
const addRoleForm = document.querySelector('#addRoleForm');
const roleTableBody = document.querySelector('#roleTableBody');
const searchRoleInput = document.querySelector('#searchRole');
const createRoleButton = document.querySelector('#createRoleButton');

function showAddRoleModal() {
    addRoleModal.style.display = 'flex';
}

function closeAddRoleModal() {
    addRoleModal.style.display = 'none';
}

function addRole(roleName, description) {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    const newRole = {
        roleName: roleName,
        description: description || ''
    };

    roles.push(newRole);

    localStorage.setItem('roles', JSON.stringify(roles));

    renderRoles();
}

function renderRoles(filteredRoles = null) {
    const roles = filteredRoles || JSON.parse(localStorage.getItem('roles')) || [];

    if (roles.length === 0) {
        roleTableBody.innerHTML = `<tr><td colspan="2">No results found</td></tr>`;
    } else {
        const rows = roles.map(role => `
                <tr>
                    <td>${role.roleName}</td>
                    <td>${role.description || '-'}</td>
                </tr>
            `).join('');
        roleTableBody.innerHTML = rows;
    }
}

function searchRoles() {
    const searchTerm = searchRoleInput.value.toLowerCase();
    const roles = JSON.parse(localStorage.getItem('roles'));

    const filteredRoles = roles.filter(role =>
        role.roleName.toLowerCase().includes(searchTerm)
    );

    renderRoles(filteredRoles);
}

openAddRoleModalButton.addEventListener('click', showAddRoleModal);
closeAddRoleModalButton.addEventListener('click', closeAddRoleModal);

// Handle "Create Role" button click
createRoleButton.addEventListener('click', () => {
    const roleName = document.querySelector('#roleName').value.trim();
    const roleDescription = document.querySelector('#roleDescription').value.trim();

    if (roleName) {
        addRole(roleName, roleDescription);
        closeAddRoleModal();
        addRoleForm.reset();
    }
});

searchRoleInput.addEventListener('input', searchRoles);

// Initial render
renderRoles();

const assignRoleToGroupModal = document.querySelector('.AssignRoleToGroup');
const assignRoleToUsersModal = document.querySelector('.AssignRoleToUsers');
const openAssignToGroupModalButton = document.querySelector('#openAssignToGroupModal');
const openAssignToUserModalButton = document.querySelector('#openAssignToUserModal');
const roleSelectForGroup = document.querySelector('#selectRoleForGroup');
const groupSelectForRole = document.querySelector('#selectGroupForRole');
const roleSelectForUser = document.querySelector('#selectRoleForUser');
const userSelectForRole = document.querySelector('#selectUserForRole');

function populateSelects() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    roleSelectForGroup.innerHTML = '';
    roleSelectForUser.innerHTML = '';
    groupSelectForRole.innerHTML = '';
    userSelectForRole.innerHTML = '';

    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.roleName;
        option.textContent = role.roleName;
        roleSelectForGroup.appendChild(option.cloneNode(true));
        roleSelectForUser.appendChild(option.cloneNode(true));
    });

    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.GroupName;
        option.textContent = group.GroupName;
        groupSelectForRole.appendChild(option);
    });

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        userSelectForRole.appendChild(option);
    });
}

openAssignToGroupModalButton.addEventListener('click', () => {
    populateSelects();
    assignRoleToGroupModal.style.display = 'flex';
});

openAssignToUserModalButton.addEventListener('click', () => {
    populateSelects();
    assignRoleToUsersModal.style.display = 'flex';
});

document.querySelector('.closeButtonForAssignRoleToGroup button').addEventListener('click', () => {
    assignRoleToGroupModal.style.display = 'none';
});

document.querySelector('.closeButtonForAssignRoleToUser button').addEventListener('click', () => {
    assignRoleToUsersModal.style.display = 'none';
});

function handleAssignGroup(event) {
    event.preventDefault();

    const selectedRole = document.querySelector('#selectRoleForGroup').value;
    const selectedGroups = Array.from(document.querySelector('#selectGroupForRole').selectedOptions).map(option => option.value);

    let roleAssignments = JSON.parse(localStorage.getItem('roleAssignments')) || [];
    let assignment = roleAssignments.find(assignment => assignment.roleName === selectedRole);

    if (!assignment) {
        assignment = {
            roleName: selectedRole,
            users: [],
            groups: []
        };
        roleAssignments.push(assignment);
    }
    selectedGroups.forEach(group => {
        if (!assignment.groups.includes(group)) {
            assignment.groups.push(group);
        }
    });
    localStorage.setItem('roleAssignments', JSON.stringify(roleAssignments));
    assignRoleToGroupModal.style.display = 'none';
    renderRoleAssignments();
}

function handleAssignRole(event) {
    event.preventDefault();

    const selectedRole = document.querySelector('#selectRoleForUser').value;
    const selectedUsers = Array.from(document.querySelector('#selectUserForRole').selectedOptions).map(option => option.value);

    let roleAssignments = JSON.parse(localStorage.getItem('roleAssignments')) || [];

    // Find the existing assignment for the selected role, or create a new one
    let assignment = roleAssignments.find(assignment => assignment.roleName === selectedRole);

    if (!assignment) {
        assignment = {
            roleName: selectedRole,
            users: [],
            groups: []
        };
        roleAssignments.push(assignment);
    }

    // Add new users to the assignment if they don't already exist
    selectedUsers.forEach(user => {
        if (!assignment.users.includes(user)) {
            assignment.users.push(user);
        }
    });

    localStorage.setItem('roleAssignments', JSON.stringify(roleAssignments));

    assignRoleToUsersModal.style.display = 'none';
    renderRoleAssignments();
}


document.querySelector('.AssignGroup button').addEventListener('click', handleAssignGroup);
document.querySelector('.AssignRole button').addEventListener('click', handleAssignRole);

function renderRoleAssignments() {
    const roleAssignments = JSON.parse(localStorage.getItem('roleAssignments')) || [];
    const tableBody = document.querySelector('#roleToUserTableBody');
    tableBody.innerHTML = '';

    if (roleAssignments.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 3;
        cell.textContent = 'No role assignments found';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    roleAssignments.forEach(assignment => {
        const row = document.createElement('tr');

        const roleCell = document.createElement('td');
        roleCell.textContent = assignment.roleName;
        row.appendChild(roleCell);

        const usersCell = document.createElement('td');
        usersCell.textContent = assignment.users.length > 0 ? assignment.users.join(', ') : '-';
        row.appendChild(usersCell);

        const groupsCell = document.createElement('td');
        groupsCell.textContent = assignment.groups.length > 0 ? assignment.groups.join(', ') : '-';
        row.appendChild(groupsCell);

        tableBody.appendChild(row);
    });
}

renderRoleAssignments();


const tables = document.querySelectorAll('.sortable');

tables.forEach((table) => {
    table.addEventListener('click', function (e) {
        if (e.target.tagName !== 'TH') return;

        let th = e.target;
        sortGrid(table, th.cellIndex, th.dataset.type);
    });
});

let sortDirection = 'asc'; // Initialize sort direction

function sortGrid(table, colNum, type) {
    let tbody = table.querySelector('tbody');
    let rowsArray = Array.from(tbody.rows);

    let compare;

    switch (type) {
        case 'number':
            compare = function (rowA, rowB) {
                const a = Number(rowA.cells[colNum].innerHTML) || 0;
                const b = Number(rowB.cells[colNum].innerHTML) || 0;
                return sortDirection === 'asc' ? a - b : b - a;
            };
            break;
        case 'string':
            compare = function (rowA, rowB) {
                const a = rowA.cells[colNum].innerHTML.toLowerCase();
                const b = rowB.cells[colNum].innerHTML.toLowerCase();
                return sortDirection === 'asc' ? (a > b ? 1 : -1) : (a < b ? 1 : -1);
            };
            break;
    }

    rowsArray.sort(compare);
    tbody.append(...rowsArray);

    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
}

module.exports = {
    renderGroups, showAddRoleModal,showSection,
    closeAddRoleModal,
    addRole,
    renderRoles,
    searchRoles, closeAddRoleModal, renderRoleAssignments,
    handleAssignGroup, setActiveButton,
    handleAssignRole, handleAssignGroup, handleAssignRole, renderRoleAssignments, populateSelects
};



