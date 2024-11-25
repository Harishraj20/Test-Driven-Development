const exp = require('constants');
const fs = require('fs');
const path = require('path');

describe('User MANAGEMENT HTML', () => {
    const checkElementPresence = (selector) => {
        const element = document.querySelector(selector);
        expect(element).not.toBeNull();
        return element;
    };

    const checkTextContent = (selector, expectedText) => {
        const element = checkElementPresence(selector);
        expect(element.textContent.trim()).toBe(expectedText);
    };

    const checkInputAttributes = (selector, expectedName) => {
        const input = checkElementPresence(selector);
        expect(input.getAttribute('name')).toBe(expectedName);
    };

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
        document.body.innerHTML = html;
        jest.resetModules();
    });
    test('User Management Page Elements', () => {
        // Check title
        checkTextContent('.titleofPage', 'USER MANAGEMENT');

        // Check presence of elements in the sidebar
        checkElementPresence('.child1');
        checkElementPresence('.child1 .Heading');
        checkTextContent('.child1 .userbutton', 'User Management');
        checkTextContent('.child1 .groupbutton', 'Group Management');
        checkTextContent('.child1 .rolebutton', 'Role Management');

        // Check logo icon
        const logoIcon = checkElementPresence('.child1 .logo i');
        expect(logoIcon.classList).toContain('fa-users');

        // Check elements in .child2
        checkElementPresence('.child2');
        checkElementPresence('#userManagement');

        checkElementPresence('.AddUserTableDiv');
        checkTextContent('.listTitle h2', 'USERS LIST');

        // Check Add User button
        checkTextContent('.addUserButton', 'ADD USER');

        // Check table headers
        const headers = document.querySelectorAll('#usersTable thead th');
        expect(headers).toHaveLength(5);
        expect(headers[0].textContent).toBe('Username');
        expect(headers[1].textContent).toBe('Email');
        expect(headers[2].textContent).toBe('First Name');
        expect(headers[3].textContent).toBe('Last Name');
        expect(headers[4].textContent).toBe('Actions');

        // Check users list
        const usersList = checkElementPresence('#usersList');
        expect(usersList.children.length).toBe(0);

        // Check modal elements
        const modal = checkElementPresence('#addUserModal');
        expect(modal.style.display).toBe('none');

        const closeButton = checkElementPresence('#addUserModal .close-button');
        expect(closeButton.textContent.trim()).toBe('×');

        const form = checkElementPresence('#addUserForm');

        // Check input fields within the form
        checkInputAttributes('#username', 'username');
        checkInputAttributes('#email', 'email');
        checkInputAttributes('#firstName', 'firstName');
        checkInputAttributes('#lastName', 'lastName');

        // Check submit button within the form
        const submitButton = checkElementPresence('#addUserForm button[type="submit"]');
        expect(submitButton.textContent.trim()).toBe('Submit');
    });

});


describe('GROUP MANAGEMENT HTML', () => {

    const checkElementPresence = (selector) => {
        const element = document.querySelector(selector);
        expect(element).not.toBeNull();
        return element;
    };

    const checkTextContent = (selector, expectedText) => {
        const element = checkElementPresence(selector);
        expect(element.textContent.trim()).toBe(expectedText);
    };

    const checkTableHeaders = (selector, expectedHeaders) => {
        const headers = document.querySelectorAll(selector);
        expect(headers).toHaveLength(expectedHeaders.length);
        expectedHeaders.forEach((text, index) => {
            expect(headers[index].textContent).toBe(text);
        });
    };

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
        document.body.innerHTML = html;
        jest.resetModules();
    });

    test('Group Management Page Elements', () => {
        checkElementPresence('#userManagement');
        checkTextContent('#groupTitle h2', 'GROUP MANAGEMENT');
        checkElementPresence('.grouplistTitle');
        checkTextContent('.grouplistTitle h2', 'GROUP LIST');
        checkTextContent('.createGroupButton', 'Create Group');
        checkElementPresence('#usersTable');
        checkTableHeaders('#usersTableofGroup thead th', ['GROUP NAME', 'USERS', 'ACTION']);
    });
    test('renders modal elements, checks label name, and handles form submission', () => {
        const title = document.querySelector('#titleGroup h3');
        expect(title.textContent).toBe('ADD GROUP');
        const groupNameLabel = document.querySelector('label[for="groupName"]');
        expect(groupNameLabel.textContent).toBe('GROUP NAME:');
        const groupNameInput = document.querySelector('#groupName');
        const submitButton = document.querySelector('.formButton button');

        expect(groupNameInput).not.toBeNull();
        expect(submitButton).not.toBeNull();
    });
});


describe('ROLE MANAGEMENT HTML', () => {
    beforeEach(() => {

        const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
        document.body.innerHTML = html;
        jest.resetModules();
    });

    test('To check the presence of .child2 div', () => {
        const childDiv = document.querySelector('.child2');
        expect(childDiv).not.toBeNull();
    });

    test('To check the title text in the UserTitle div', () => {
        const titlediv = document.querySelector('#roleTitle');
        expect(titlediv).not.toBeNull();
        const title = document.querySelector('#roleTitle h2');
        expect(title.textContent).toBe('ROLE MANAGEMENT');
    });

    test('To check the presence of roleTitle div with ROLES LIST', () => {
        const roleTitleDiv = document.querySelector('.roleTitle');
        expect(roleTitleDiv).not.toBeNull();
        const listTitleDiv = document.querySelector('.listTitle');
        expect(listTitleDiv).not.toBeNull()
        const roleTitle = document.querySelector('.roleTitle .listTitle h2');
        expect(roleTitle.textContent).toBe('ROLES LIST');
    });

    test('To check the presence of Add User button', () => {
        const addroleButton = document.querySelector('.addroleButton');
        expect(addroleButton).not.toBeNull();
        expect(addroleButton.textContent.trim()).toBe('Add Role');
    });

    test('To check the presence of roleTable element', () => {
        const roleTable = document.querySelector('.roleTable table');
        expect(roleTable).not.toBeNull();
    });

    test('To check the table headers in roleTable', () => {
        const headers = document.querySelectorAll('.roleTable table thead th');
        expect(headers).toHaveLength(2);
        expect(headers[0].textContent).toBe('Role Name');
        expect(headers[1].textContent).toBe('Description');
    });

    test('To check the presence of Role Assignment title', () => {
        const roleAssignmentTitle = document.querySelector('.roleToUserTitle .listTitle h2');
        expect(roleAssignmentTitle.textContent).toBe('ROLE ASSIGNMENT');
    });
    test('To check the presence of Assign To Users button', () => {
        const assignToUsersButton = document.querySelector('.buttonContainer .assignToUser button');
        expect(assignToUsersButton).not.toBeNull();
        expect(assignToUsersButton.textContent).toBe('Assign To Users');
    });

    test('To check the presence of Assign to group button', () => {
        const assignToGroupButton = document.querySelector('.buttonContainer .assignToGroup button');
        expect(assignToGroupButton).not.toBeNull();
        expect(assignToGroupButton.textContent).toBe('Assign To Group');
    });

    test('To check the presence of roleToUserTable element', () => {
        const roleToUserTable = document.querySelector('.roleToUserTable table');
        expect(roleToUserTable).not.toBeNull();
    });

    test('To check the table headers in roleToUserTable', () => {
        const headers = document.querySelectorAll('.roleToUserTable table thead th');
        expect(headers).toHaveLength(3);
        expect(headers[0].textContent).toBe('ROLES');
        expect(headers[1].textContent).toBe('USERS');
        expect(headers[2].textContent).toBe('GROUPS');

    });
    test('should have correct label titles, buttons, and selects', () => {
        const roleLabel = document.querySelector('label[for="selectRoleForUser"]');
        const userLabel = document.querySelector('label[for="selectUserForRole"]');
        const selectRole = document.querySelector('#selectRoleForUser');
        const selectUser = document.querySelector('#selectUserForRole');
        const submitButton = document.querySelector('.AssignRole button');
        const closeButton = document.querySelector('.closefor-AssignRoleToUser');

        expect(roleLabel).toBeTruthy();
        expect(roleLabel.textContent).toBe('SELECT ROLE:');

        expect(userLabel).toBeTruthy();
        expect(userLabel.textContent).toBe('SELECT USERS: ');

        expect(selectRole).toBeTruthy();
        expect(selectUser).toBeTruthy();
        expect(selectUser.multiple).toBe(true);

        expect(submitButton).toBeTruthy();
        expect(submitButton.textContent).toBe('Assign Role');

        expect(closeButton).toBeTruthy();
    });
    test('should have correct label titles, buttons, and selects', () => {
        const roleLabel = document.querySelector('label[for="selectRoleForGroup"]');
        const groupLabel = document.querySelector('label[for="selectGroupForRole"]');
        const selectRole = document.querySelector('#selectRoleForGroup');
        const selectGroup = document.querySelector('#selectGroupForRole');
        const submitButton = document.querySelector('.AssignGroup button');
        const closeButton = document.querySelector('#closebntforAssignRoleToGroup');

        expect(roleLabel).toBeTruthy();
        expect(roleLabel.textContent).toBe('SELECT ROLE');

        expect(groupLabel).toBeTruthy();
        expect(groupLabel.textContent).toBe('SELECT GROUPS:');

        expect(selectRole).toBeTruthy();
        expect(selectGroup).toBeTruthy();
        expect(selectGroup.multiple).toBe(true);

        expect(submitButton).toBeTruthy();
        expect(submitButton.textContent).toBe('Assign Group');

        expect(closeButton).toBeTruthy();
    });
});


describe('User Management Functionality', () => {
    let addButton, successMsg, confirmButton, cancelButton, confirmationModal, modalText, successMessageDiv, modal, closebutton, username, email, firstName, lastName, submitButton, errormessagediv, errormsg, table, rows, cells;

    const setupDOM = () => {
        const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
        document.body.innerHTML = html;
        jest.resetModules();

        const mockLocalStorage = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                clear: () => (store = {}),
                removeItem: (key) => delete store[key],
            };
        })();
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
        });
        localStorage.clear();

        require('./TDD.js');
        ({ setActiveButton, showSection } = require('./TDD.js'));
        cacheDOMElements();
    };

    const cacheDOMElements = () => {
        addButton = document.querySelector('#openAddUserModal');
        modal = document.querySelector('#addUserModal');
        closebutton = document.querySelector('.close-button');
        username = document.querySelector('#username');
        email = document.querySelector('#email');
        firstName = document.querySelector('#firstName');
        lastName = document.querySelector('#lastName');
        submitButton = document.querySelector('button[type="submit"]');
        errormessagediv = document.querySelector('.errorMessage');
        errormsg = document.querySelector('.errorMessage p');
        table = document.querySelector('#usersList');
        successMsg = document.querySelector('#successMessage p');
        successMessageDiv = document.querySelector('#successMessage');
        cancelButton = document.querySelector('#cancelButton');
        confirmationModal = document.querySelector('.modalforConfirmation');
        modalText = document.querySelector('#modalText');
        confirmButton = document.querySelector('#confirmButton');
    };

    const fillForm = (user, mail, first, last) => {
        username.value = user;
        email.value = mail;
        firstName.value = first;
        lastName.value = last;
    };

    const expectErrorMessage = (message) => {
        expect(errormessagediv.style.visibility).toBe('visible');
        expect(errormsg.textContent).toBe(message);
        expect(errormsg.style.color).toBe('red');
        jest.advanceTimersByTime(2500);
        expect(errormessagediv.style.visibility).toBe('hidden');
    };
    const expectsuccessMessage = (message) => {
        expect(successMessageDiv.style.visibility).toBe('visible');
        expect(successMsg.textContent).toBe(message);
        expect(successMsg.style.color).toBe('green');
        jest.advanceTimersByTime(2500);
        expect(successMessageDiv.style.visibility).toBe('hidden');
    };

    const addUser = (user, mail, first, last) => {
        fillForm(user, mail, first, last);
        submitButton.click();
    };

    const verifyUserInTable = (index, expectedUser) => {
        rows = table.getElementsByTagName('tr');
        cells = rows[index].getElementsByTagName('td');
        expect(cells[0].textContent).toBe(expectedUser.username);
        expect(cells[1].textContent).toBe(expectedUser.email);
        expect(cells[2].textContent).toBe(expectedUser.firstName);
        expect(cells[3].textContent).toBe(expectedUser.lastName);
    };

    const verifyUserInLocalStorage = (expectedUsers) => {
        const userlist = JSON.parse(localStorage.getItem('users') || '[]');
        expect(userlist.length).toBe(expectedUsers.length);

        expectedUsers.forEach((expectedUser, index) => {
            expect(userlist[index].username).toBe(expectedUser.username);
            expect(userlist[index].email).toBe(expectedUser.email);
            expect(userlist[index].firstName).toBe(expectedUser.firstName);
            expect(userlist[index].lastName).toBe(expectedUser.lastName);
        });
    };
    const verifyUserNotInLocalStorage = (userToCheck) => {
        const userlist = JSON.parse(localStorage.getItem('users') || '[]');

        const userExists = userlist.some(user =>
            user.username === userToCheck.username &&
            user.email === userToCheck.email &&
            user.firstName === userToCheck.firstName &&
            user.lastName === userToCheck.lastName
        );

        expect(userExists).toBe(false);
    };



    const clickEditButton = (index) => {
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons[index].click();
        expect(modal.style.display).toBe('flex');
        const text = document.querySelector('#formTitle h3');
        expect(text.textContent).toBe('UPDATE USER');
    };
    const clickdeleteButton = (index) => {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons[index].click();
    };
    const testButtonClick = (button, clickHandler) => {
        expect(button).not.toBeNull();
        button.addEventListener('click', clickHandler);
        button.click();
        expect(clickHandler).toHaveBeenCalled();
    };


    beforeEach(() => {
        jest.useFakeTimers();
        setupDOM();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        localStorage.clear();
    });

    describe('To test the functionality of ADD USER', () => {
        test('To check No User Available text when table is empty', () => {
            const noUsersMessage = document.querySelector('#usersList').textContent.trim();
            expect(noUsersMessage).toBe('No users available');
        })
        test('should open modal when "Add User" button is clicked', () => {
            const clickHandler = jest.fn();
            testButtonClick(addButton, clickHandler);
            addButton.click();
            expect(modal.style.display).toBe('flex');
            testButtonClick(closebutton, clickHandler);
            closebutton.click();
            expect(modal.style.display).toBe('none');
        });
        test('To check form field and user addition functionality', () => {
            expect(username.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

            addUser('Rohan', 'sharish@gmail.com', 'harish', 'raj');
            closebutton.click();
            expect(errormessagediv.style.visibility).toBe('hidden');

            verifyUserInTable(0, {
                username: 'Rohan',
                email: 'sharish@gmail.com',
                firstName: 'harish',
                lastName: 'raj'
            });
            verifyUserInLocalStorage([
                {
                    username: 'Rohan',
                    email: 'sharish@gmail.com',
                    firstName: 'harish',
                    lastName: 'raj'
                }
            ]);
            expectsuccessMessage('User added successfully')

            fillForm('Rohan', 'sharish@gmail.com', 'harish', '');
            submitButton.click();
            const clickHandler = jest.fn();
            testButtonClick(submitButton, clickHandler);
            expectErrorMessage('Field is Empty');
        });
        test('To check the error message when the same username and email id is used', () => {
            addUser('Rohan', 'sharish@gmail.com', 'harish', 'raj');

            fillForm('Rohan', 'sharish1@gmail.com', 'harish', 'raj');
            submitButton.click();
            expectErrorMessage('Username already exists');

            fillForm('Rohan1', 'sharish@gmail.com', 'harish', 'raj');
            submitButton.click();
            expectErrorMessage('Email already exists');
        });
        test('To check first name and last name with numbers and special characters', () => {
            fillForm('xyz', 'sharish12@gmail.com', '123', 'raj');
            submitButton.click();
            expectErrorMessage('First Name cannot be numbers or special characters!');

            fillForm('xyz', 'sharish12@gmail.com', '@#%', 'raj');
            submitButton.click();
            expectErrorMessage('First Name cannot be numbers or special characters!');

            fillForm('xyz', 'sharish12@gmail.com', 'Harish', '#$%$');
            submitButton.click();
            expectErrorMessage('Last Name cannot be numbers or special characters!');

        });
    });

    describe('To check the functionality of Edit User', () => {
        beforeEach(() => {
            addUser('Harish1', 'sharish@gmail.com', 'harish', 'raj');
            addUser('Kishore', 'kishore@gmail.com', 'kishore', 'kumar');
        });

        test('edit user', () => {
            clickEditButton(1);
            expect(modal.style.display).toBe('flex');
            expect(username.value).toBe('Kishore');
            expect(email.value).toBe('kishore@gmail.com');
            expect(firstName.value).toBe('kishore');
            expect(lastName.value).toBe('kumar');
        });

        test('To check the user updated successfully', () => {
            clickEditButton(1);

            username.value = 'kishore1';
            email.value = 'kishore1@gmail.com';
            submitButton.click();

            verifyUserInTable(0, {
                username: 'Harish1',
                email: 'sharish@gmail.com',
                firstName: 'harish',
                lastName: 'raj'
            });
            verifyUserInTable(1, {
                username: 'kishore1',
                email: 'kishore1@gmail.com',
                firstName: 'kishore',
                lastName: 'kumar'
            });
        });

        test('To check validations of update user form', () => {
            clickEditButton(1);

            username.value = 'Harish1';
            email.value = 'kishore1@gmail.com';
            submitButton.click();
            expectErrorMessage('Username already exists');

            clickEditButton(1);

            username.value = 'harish1';
            email.value = 'sharish@gmail.com';
            submitButton.click();
            expectErrorMessage('Email already exists');
        });
    });
    describe('showSection Function', () => {
        let userManagement;
        let groupManagement;
        let roleManagement;

        beforeEach(() => {
            // Set up the DOM structure
            document.body.innerHTML = `
                    <div id="UserManagement" style="display: none;">User Management Section</div>
                    <div id="GroupManagement" style="display: none;">Group Management Section</div>
                    <div id="RoleManagement" style="display: none;">Role Management Section</div>
                `;

            // Get references to the sections
            userManagement = document.getElementById('UserManagement');
            groupManagement = document.getElementById('GroupManagement');
            roleManagement = document.getElementById('RoleManagement');
        });

        test('should show the specified section and hide others', () => {
            // Call the function to show the User Management section
            showSection('UserManagement');

            expect(userManagement.style.display).toBe('block');
            expect(groupManagement.style.display).toBe('none');
            expect(roleManagement.style.display).toBe('none');

            // Call the function to show the Group Management section
            showSection('GroupManagement');

            expect(userManagement.style.display).toBe('none');
            expect(groupManagement.style.display).toBe('block');
            expect(roleManagement.style.display).toBe('none');

            // Call the function to show the Role Management section
            showSection('RoleManagement');

            expect(userManagement.style.display).toBe('none');
            expect(groupManagement.style.display).toBe('none');
            expect(roleManagement.style.display).toBe('block');
        });
    });

    describe('To Check the functionality of Delete User', () => {
        beforeEach(() => {
            addUser('Harish1', 'sharish@gmail.com', 'harish', 'raj');
            addUser('Kishore', 'kishore@gmail.com', 'kishore', 'kumar');
        });

        test('should delete a user successfully on clicking confirm', () => {
            const rows = table.getElementsByTagName('tr');
            expect(rows.length).toBe(2);
            clickdeleteButton(0);
            confirmButton.click();



            expect(rows.length).toBe(1);
            verifyUserInTable(0, {
                username: 'Kishore',
                email: 'kishore@gmail.com',
                firstName: 'kishore',
                lastName: 'kumar'
            });
            verifyUserInLocalStorage([
                {
                    username: 'Kishore',
                    email: 'kishore@gmail.com',
                    firstName: 'kishore',
                    lastName: 'kumar'
                }
            ]);
            verifyUserNotInLocalStorage({
                username: 'Harish1',
                email: 'sharish@gmail.com',
                firstName: 'harish',
                lastName: 'kumar'
            });


        });
        test('shouldnot delete a user on cancelling', () => {
            const rows = table.getElementsByTagName('tr');
            expect(rows.length).toBe(2);
            clickdeleteButton(0);
            cancelButton.click();



            expect(rows.length).toBe(2);
            verifyUserInTable(0, {
                username: 'Harish1',
                email: 'sharish@gmail.com',
                firstName: 'harish',
                lastName: 'raj'
            });

            verifyUserInTable(1, {
                username: 'Kishore',
                email: 'kishore@gmail.com',
                firstName: 'kishore',
                lastName: 'kumar'
            });
            verifyUserInLocalStorage([
                {


                    username: 'Harish1',
                    email: 'sharish@gmail.com',
                    firstName: 'harish',
                    lastName: 'raj'
                },
                {
                    username: 'Kishore',
                    email: 'kishore@gmail.com',
                    firstName: 'kishore',
                    lastName: 'kumar'
                }

            ]);


        });
    });

});

describe('Group Management Functionality', () => {
    let createGroupButton, addGroupModal, groupNameInput, closeAddGroupModalButton, submitGroupButton;
    let assignGroupModal, assignUsersSelect, assignGroupButton, successMessage;
    let removeGroupModal, removeUsersSelect, removeUsersButton, closeRemoveGroupModalButton;

    const verifyGroupName = (index, expectedValues) => {
        const rows = document.querySelectorAll('#usersTableofGroup tbody tr');
        const row = rows[index];
        const cells = row.querySelectorAll('td');

        expectedValues.forEach((expectedValue, i) => {
            expect(cells[i].textContent.trim()).toBe(expectedValue);
        });
    };

    const verifyLocalStorage = (key, expectedValue) => {
        const storedValue = localStorage.getItem(key);
        const parsedValue = JSON.parse(storedValue);
        expect(parsedValue).toEqual(expectedValue);
    };

    const displayErrorMessageForGroup = (message, color) => {
        const errorMessageDivForGroup = document.querySelector('.errorMessageForGroup');
        const errorMessage = document.querySelector('.errorMessageForGroup p');
        errorMessage.textContent = message;
        errorMessageDivForGroup.style.visibility = 'visible';
        errorMessageDivForGroup.style.color = color;
        jest.advanceTimersByTime(2500);
        expect(errorMessageDivForGroup.style.visibility).toBe('hidden');
    };

    const displaySuccessMessageForGroup = (message) => {
        const successMessageDivForGroup = document.querySelector('#successMessageForGroup');
        const successMessage = document.querySelector('#successMessageForGroup p');
        successMessage.textContent = message;
        successMessageDivForGroup.style.visibility = 'visible';
        successMessageDivForGroup.style.color = 'green';
        jest.advanceTimersByTime(2500);
        expect(successMessageDivForGroup.style.visibility).toBe('hidden');
    };

    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
        document.body.innerHTML = html;
        jest.resetModules();

        const mockLocalStorage = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                clear: () => (store = {}),
                removeItem: (key) => delete store[key],
            };
        })();
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
        });
        localStorage.clear();

        ({ renderGroups } = require('./TDD.js'));

        createGroupButton = document.querySelector('.createGroupButton');
        addGroupModal = document.querySelector('#addgroupModal');
        groupNameInput = document.querySelector('#groupName');
        closeAddGroupModalButton = document.querySelector('.close-button-for-AddGroup');
        closeRemoveGroupModalButton = document.querySelector('.close-button-for-Remove');
        submitGroupButton = document.querySelector('#addGroupForm button[type="submit"]');

        assignGroupModal = document.querySelector('#assignGroupModal');
        assignUsersSelect = document.querySelector('#assignUsers');
        assignGroupButton = document.querySelector('.assignUsers');

        removeGroupModal = document.querySelector('#removeGroupModal');
        removeUsersSelect = document.querySelector('#removeUsers');
        removeUsersButton = document.querySelector('.removeUsers');

        successMessage = document.querySelector('#successMessageForGroup p');
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        localStorage.clear();
    });

    test('should open and close the Create Group modal', () => {
        createGroupButton.click();
        expect(addGroupModal.style.display).toBe('flex');
        closeAddGroupModalButton.click();
        expect(addGroupModal.style.display).toBe('none');
    });

    test('should have an empty form field by default', () => {
        expect(groupNameInput.value).toBe('');
    });

    test('Should display error message if fields are empty and submit clicked', () => {
        groupNameInput.value = '';
        submitGroupButton.click();

        displayErrorMessageForGroup('Group Name Field Cannot Be Empty', 'red');
        expect(document.querySelector('.errorMessageForGroup p').textContent).toBe('Group Name Field Cannot Be Empty');
    });

    test('should create a group and display success message', () => {
        groupNameInput.value = 'G1';
        submitGroupButton.click();

        verifyGroupName(0, ['G1', '-']);
        displaySuccessMessageForGroup(`Group '${groupNameInput.value}' created successfully!`);
        expect(successMessage.textContent).toBe(`Group '${groupNameInput.value}' created successfully!`);
        verifyLocalStorage('groups', [
            { GroupName: 'G1', users: [] }
        ]);
    });

    test('should prevent creating a group with a duplicate name', () => {
        groupNameInput.value = 'G1';
        submitGroupButton.click();

        groupNameInput.value = 'G1';
        submitGroupButton.click();

        displayErrorMessageForGroup('Group already exists', 'red');
    });

    test('should open Assign Modal and display the correct title', () => {
        groupNameInput.value = 'G1';
        submitGroupButton.click();

        const assignButton = document.querySelector('.assign-button');
        assignButton.click();
        expect(assignGroupModal.style.display).toBe('flex');

        const modalTitle = document.querySelector('#formTitleForAssign h2');
        expect(modalTitle.textContent).toBe('ASSIGN USERS FORM');
        const closeAssignGroupModalButton = document.querySelector('.close-button-for-Assign');
        closeAssignGroupModalButton.click();
        expect(assignGroupModal.style.display).toBe('none');
    });

    test('should open Remove Modal and display the correct title', () => {
        groupNameInput.value = 'G1';
        submitGroupButton.click();

        const deleteButton = document.querySelector('.delete-button');
        deleteButton.click();
        expect(removeGroupModal.style.display).toBe('flex');

        const modalTitle = document.querySelector('.formTitleForDelete h3');
        expect(modalTitle.textContent).toBe('REMOVE USERS FORM');
        closeRemoveGroupModalButton.click();
    });

    test('should display users in the assign dropdown and assign selected users to the group', () => {
        localStorage.setItem('users', JSON.stringify([
            { username: 'user1' },
            { username: 'user2' },
            { username: 'user3' }
        ]));
        groupNameInput.value = 'G1';
        submitGroupButton.click();

        const assignActionButton = document.querySelector('.assign-button');
        assignActionButton.click();
        const options = Array.from(assignUsersSelect.options).map(option => option.value);
        expect(options).toEqual(['user1', 'user2', 'user3']);

        assignUsersSelect.options[0].selected = true;
        assignUsersSelect.options[2].selected = true;
        assignGroupButton.click();

        verifyGroupName(0, ['G1', 'user1, user3']);
        verifyLocalStorage('groups', [
            { GroupName: 'G1', users: ['user1', 'user3'] }
        ]);
    });

    test('should display group members in the remove dropdown and remove selected user from the group', () => {
        localStorage.setItem('users', JSON.stringify([
            { username: 'user1' },
            { username: 'user2' },
            { username: 'user3' }
        ]));
        localStorage.setItem('groups', JSON.stringify([
            { GroupName: 'G1', users: ['user1', 'user2'] }
        ]));
        renderGroups();
        const deleteButton = document.querySelector('.delete-button');
        deleteButton.click();

        expect(removeGroupModal.style.display).toBe('flex');

        const options = Array.from(removeUsersSelect.options).map(option => option.value);
        expect(options).toEqual(['user1', 'user2']);

        removeUsersSelect.value = 'user1';
        removeUsersButton.click();  /* Remove user from the group */

        verifyGroupName(0, ['G1', 'user2']);
        verifyLocalStorage('groups', [
            { GroupName: 'G1', users: ['user2'] }
        ]);
    });
});

describe('Role Management Functionality', () => {
    let addRoleModal, roleTableBody, searchRoleInput, addRoleForm;

    beforeEach(() => {
        ({
            renderGroups, showAddRoleModal,
            closeAddRoleModal,
            addRole,
            renderRoles, renderRoleAssignments,
            handleAssignGroup,
            handleAssignRole,
            searchRoles, closeAddRoleModal
        } = require('./TDD.js'));
        addRoleModal = document.querySelector('#addRoleModal');
        roleTableBody = document.querySelector('#roleTableBody');
        searchRoleInput = document.querySelector('#searchRole');
        addRoleForm = document.querySelector('#addRoleForm');
        localStorage.clear();
    });

    test('should display the Add Role modal when showAddRoleModal is called', () => {
        showAddRoleModal();
        expect(addRoleModal.style.display).toBe('flex');
    });

    test('should hide the Add Role modal when closeAddRoleModal is called', () => {
        closeAddRoleModal();
        expect(addRoleModal.style.display).toBe('none');
    });

    test('should add a new role and render it in the table', () => {

        const roleNameInput = document.querySelector('#roleName');
        const roleDescriptionInput = document.querySelector('#roleDescription');
        const createRoleButton = document.querySelector('#createRoleButton');
        roleNameInput.value = 'Admin';
        roleDescriptionInput.value = 'Head of the group';
        createRoleButton.click();
        const tableBody = document.querySelector('#roleTableBody');
        const rows = tableBody.querySelectorAll('tr');
        expect(rows[0].cells[0].textContent).toBe('Admin');
        expect(rows[0].cells[1].textContent).toBe('Head of the group');
    });

    test('should add a new role and render it in the table', () => {

        addRole('Admin', 'Administrator');
        renderRoles();
        const roles = JSON.parse(localStorage.getItem('roles'));
        expect(roles.length).toBe(1);
        expect(roles[0]).toEqual({ roleName: 'Admin', description: 'Administrator' });
        const tableBody = document.querySelector('#roleTableBody');
        const rows = tableBody.querySelectorAll('tr');
        expect(rows[0].cells[0].textContent).toBe('Admin');
        expect(rows[0].cells[1].textContent).toBe('Administrator');
    });

    test('should add a role with an empty description and render it in the table', () => {
        addRole('Admin', '');
        renderRoles();
        const roles = JSON.parse(localStorage.getItem('roles'));
        expect(roles.length).toBe(1);
        expect(roles[0]).toEqual({ roleName: 'Admin', description: '' });
        const tableBody = document.querySelector('#roleTableBody');
        const rows = tableBody.querySelectorAll('tr');
        expect(rows[0].cells[0].textContent).toBe('Admin');
        expect(rows[0].cells[1].textContent).toBe('-');
    });

    test('should render "No results found" when there are no roles', () => {
        renderRoles([]);
        expect(roleTableBody.textContent).toContain('No results found');
    });

    test('should filter roles based on search input', () => {
        addRole('Admin', 'Administrator');
        addRole('User', 'Regular User');
        searchRoleInput.value = 'admin';
        searchRoles();
        expect(roleTableBody.textContent).toContain('Admin');
        expect(roleTableBody.innerHTML).not.toContain('User');
    });

    test('should render no results found when search input is only spaces', () => {
        addRole('Admin', 'Administrator');
        addRole('User', 'Regular User');
        searchRoleInput.value = '   ';
        searchRoles();
        expect(roleTableBody.textContent).toContain('No results found');

    });
    test('should render no results found when search input is not present in the table', () => {
        addRole('Admin', 'Administrator');
        addRole('User', 'Regular User');

        searchRoleInput.value = 'moderator';
        searchRoles();
        expect(roleTableBody.textContent).toContain('No results found');

    });

});

describe('Role Management System', () => {
    const setupDOM = () => {
        const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
        document.body.innerHTML = html;
        jest.resetModules();

        const mockLocalStorage = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                clear: () => (store = {}),
                removeItem: (key) => delete store[key],
            };
        })();
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
        });
        localStorage.clear();
    }

    beforeEach(() => {
        ({
            renderGroups, showAddRoleModal,
            closeAddRoleModal,
            addRole,
            renderRoles, renderRoleAssignments,
            handleAssignGroup,
            handleAssignRole,
            searchRoles, handleAssignGroup, handleAssignRole, renderRoleAssignments, populateSelects, closeAddRoleModal, showAddRoleModal, closeAddRoleModal, addRole, renderRoles, searchRoles, handleAssignGroup, handleAssignRole
        } = require('./TDD.js'));
        addRoleModal = document.querySelector('#addRoleModal');
        roleTableBody = document.querySelector('#roleTableBody');
        searchRoleInput = document.querySelector('#searchRole');
        addRoleForm = document.querySelector('#addRoleForm');
        openAssignToGroupModalButton = document.querySelector('#openAssignToGroupModalButton');
        openAssignToUserModalButton = document.querySelector('#openAssignToUserModalButton');
        closeButtonForAssignRoleToGroup = document.querySelector('.closeButtonForAssignRoleToGroup button');
        closeButtonForAssignRoleToUser = document.querySelector('.closeButtonForAssignRoleToUser button');
        assignRoleToGroupModal = document.querySelector('#assignRoleToGroupModal');
        assignRoleToUsersModal = document.querySelector('#assignRoleToUsersModal');


        localStorage.clear();
    }

    );
    test('should open the modal on clicking assign role to user', () => {
        const assignroleToUser = document.querySelector('#openAssignToUserModal');
        assignroleToUser.click();
        const assignRoleToUserDiv = document.querySelector('.AssignRoleToUsers');
        expect(assignRoleToUserDiv.style.display).toBe('flex');
        const dummy = document.querySelector('.closefor-AssignRoleToUser');
        dummy.click();
        expect(assignRoleToUserDiv.style.display).toBe('none')
    });
    test('should open the modal on clicking Assign to  Role to Group', () => {
        const assignroleToGroupp = document.querySelector('#openAssignToGroupModal');
        assignroleToGroupp.click();
        const assignRoleToGroupDiv = document.querySelector('.AssignRoleToGroup');
        expect(assignRoleToGroupDiv.style.display).toBe('flex');
        const close = document.querySelector('.closeButtonForAssignRoleToGroup button');
        close.click();
        expect(assignRoleToGroupDiv.style.display).toBe('none')
    });

    test('should populate role, group, and user selects', () => {
        localStorage.setItem('roles', JSON.stringify([{ roleName: 'Admin' }]));
        localStorage.setItem('groups', JSON.stringify([{ GroupName: 'Group1' }]));
        localStorage.setItem('users', JSON.stringify([{ username: 'User1' }]));

        populateSelects();

        const roleSelectForGroup = document.querySelector('#selectRoleForGroup');
        const groupSelectForRole = document.querySelector('#selectGroupForRole');
        const roleSelectForUser = document.querySelector('#selectRoleForUser');
        const userSelectForRole = document.querySelector('#selectUserForRole');

        expect(roleSelectForGroup.children).toHaveLength(1);
        expect(roleSelectForGroup.children[0].textContent).toBe('Admin');
        expect(groupSelectForRole.children).toHaveLength(1);
        expect(groupSelectForRole.children[0].textContent).toBe('Group1');
        expect(roleSelectForUser.children).toHaveLength(1);
        expect(roleSelectForUser.children[0].textContent).toBe('Admin');
        expect(userSelectForRole.children).toHaveLength(1);
        expect(userSelectForRole.children[0].textContent).toBe('User1');
    });

    test('should assign a role to a group', () => {
        localStorage.setItem('roles', JSON.stringify([{ roleName: 'Admin' }]));
        localStorage.setItem('groups', JSON.stringify([{ GroupName: 'Group1' }]));
        document.querySelector('#selectRoleForGroup').value = 'Admin';
        const groupOption = document.querySelector('#selectGroupForRole option');
        groupOption.selected = true;
        handleAssignGroup(new Event('submit'));
        const roleAssignments = JSON.parse(localStorage.getItem('roleAssignments'));
        expect(roleAssignments.length).toBe(1);
        expect(roleAssignments[0].roleName).toBe('Admin');
        expect(roleAssignments[0].groups).toContain('Group1');
    });

    test('should assign a role to a user', () => {
        localStorage.setItem('roles', JSON.stringify([{ roleName: 'Admin' }]));
        localStorage.setItem('users', JSON.stringify([{ username: 'User1' }]));

        document.querySelector('#selectRoleForUser').value = 'Admin';
        const userOption = document.querySelector('#selectUserForRole option');
        userOption.selected = true;

        handleAssignRole(new Event('submit'));

        const roleAssignments = JSON.parse(localStorage.getItem('roleAssignments'));
        expect(roleAssignments.length).toBe(1);
        expect(roleAssignments[0].roleName).toBe('Admin');
        expect(roleAssignments[0].users).toContain('User1');
    });
    test('should assign a role to a user without assigning a group', () => {

        localStorage.setItem('roles', JSON.stringify([{ roleName: 'Admin' }]));
        localStorage.setItem('users', JSON.stringify([{ username: 'User1' }]));

        document.querySelector('#selectRoleForUser').value = 'Admin';
        const userOption = document.querySelector('#selectUserForRole option');
        userOption.selected = true;
        handleAssignRole(new Event('submit'));

        const roleAssignments = JSON.parse(localStorage.getItem('roleAssignments'));

        expect(roleAssignments).toBeDefined();
        expect(roleAssignments.length).toBe(1);
        expect(roleAssignments[0].roleName).toBe('Admin');
        expect(roleAssignments[0].users).toContain('User1');
        expect(roleAssignments[0].groups).toEqual([]);

        renderRoleAssignments();

        const tableBody = document.querySelector('#roleToUserTableBody');
        const tableRows = tableBody.querySelectorAll('tr');

        expect(tableRows.length).toBe(1);

        const cells = tableRows[0].children;
        expect(cells[0].textContent).toBe('Admin');
        expect(cells[1].textContent).toBe('User1');
        expect(cells[2].textContent).toBe('-');
    });

    test('should render role assignments correctly', () => {
        const roleAssignments = [
            {
                roleName: 'Admin',
                users: ['User1'],
                groups: ['Group1']
            }
        ];
        localStorage.setItem('roleAssignments', JSON.stringify(roleAssignments));

        renderRoleAssignments();

        const roleToUserTableBody = document.querySelector('#roleToUserTableBody');
        expect(roleToUserTableBody.children).toHaveLength(1);
        const row = roleToUserTableBody.children[0];
        expect(row.children[0].textContent).toBe('Admin');
        expect(row.children[1].textContent).toBe('User1');
        expect(row.children[2].textContent).toBe('Group1');
    });

});

describe('setActiveButton', () => {
    let setActiveButton;
    const html = fs.readFileSync(path.resolve(__dirname, '../UserAssign.html'), 'utf8');
    beforeEach(() => {
        document.body.innerHTML = html;
        ({ setActiveButton, showSection } = require('./TDD.js'));
        document.querySelectorAll('.child1 button').forEach(button => {
            button.addEventListener('click', () => {
                setActiveButton(button.id);
            });
        });
    });

    test('should add the active class to the clicked button and remove it from others', () => {
        const button1 = document.getElementById('userSection');
        const button2 = document.getElementById('groupSection');
        const button3 = document.getElementById('roleSection');
        expect(button1).not.toBeNull();
        expect(button2).not.toBeNull();
        expect(button3).not.toBeNull();
        button1.click();
        expect(button1.classList.contains('active')).toBe(true);
        expect(button2.classList.contains('active')).toBe(false);
        expect(button3.classList.contains('active')).toBe(false);
        button2.click();
        expect(button1.classList.contains('active')).toBe(false);
        expect(button2.classList.contains('active')).toBe(true);
        expect(button3.classList.contains('active')).toBe(false);
        button3.click();
        expect(button1.classList.contains('active')).toBe(false);
        expect(button2.classList.contains('active')).toBe(false);
        expect(button3.classList.contains('active')).toBe(true);
    });


});







