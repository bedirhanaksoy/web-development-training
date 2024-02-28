function getData() {
    const url = "read.php";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const users = data.users;

                // Log the users array to the console for debugging
                console.log('Users:', users);

                // Display user information on the screen
                const userList = document.getElementById('userList');
                if (users.length > 0) {
                    users.forEach(user => {
                        userList.innerHTML += `
                            <p>
                                User ID: ${user.id}<br>
                                Username: ${user.username}<br>
                                Email: ${user.email}<br>
                                Password: ${user.password}
                            </p><br>
                        `;
                    });
                } 
                else {
                    userList.innerHTML = "<p>No users found.</p>";
                }
            } 
            else {
                console.error('Failed to fetch users:', data.error);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function validateCreateUser() {
    var username = document.getElementById('create_username').value;
    var email = document.getElementById('create_email').value;
    var password = document.getElementById('create_password').value;

    // username validation 
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        alert('Username must contain only alphanumeric characters');
        return false;
    }

    // email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return false;
    }

    // password validation 
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters and it should include uppercase and lowercase chars and at least one number');
        return false;
    }

    //confirmation
    var confirmSubmit = window.confirm('Are you sure to send this form?');
    if (!confirmSubmit) {
        return false;
    }

    // if all validations done, it posts data
    postData();

    return false;
}

function validateUpdateUser() {
    var update_id = document.getElementById('update_id').value;
    var update_username = document.getElementById('update_username').value;
    var update_email = document.getElementById('update_email').value;
    var update_password = document.getElementById('update_password').value;

    //id validation
    var idRegex = /^\d+$/;
    if (!idRegex.test(update_id) || update_id<=0 ||update_id >= 1000) {
        alert('ID must be a positive integer and less than 1000');
        return false;
    }

    // username validation 
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(update_username)) {
        alert('Username must contain only alphanumeric characters');
        return false;
    }

    // email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(update_email)) {
        alert('Invalid email format');
        return false;
    }

    // password validation 
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(update_password)) {
        alert('Password must be at least 8 characters and it should include uppercase and lowercase chars and at least one number');
        return false;
    }

    // confirmation
    var confirmSubmit = window.confirm('Are you sure to send this form?');
    if (!confirmSubmit) {
        return false;
    }

    // if all validations done, it puts data
    putData();

    return false;
}

function validateDeleteUser() {
    var delete_id = document.getElementById('delete_id').value;

    // id validation
    var idRegex = /^\d+$/;
    if (!idRegex.test(delete_id) || delete_id<=0 ||delete_id >= 1000) {
        alert('ID must be a positive integer and less than 1000');
        return false;
    }

    // confirmation
    var confirmSubmit = window.confirm('Are you sure to send this form?');
    if (!confirmSubmit) {
        return false;
    }

    // if validation done, it deletes data
    deleteData();

    return false;
}


function postData() {

    const url = "create.php";
    
    const usernameValue = document.getElementById('create_username').value;
    const emailValue = document.getElementById('create_email').value;
    const passwordValue = document.getElementById('create_password').value;

    const data = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue
    };

    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function putData() {

    const url = "update.php";

    const idValue = document.getElementById('update_id').value;
    const newUsernameValue = document.getElementById('update_username').value;
    const newEmailValue = document.getElementById('update_email').value;
    const newPasswordValue = document.getElementById('update_password').value;

    const data = {
        id: idValue,
        username: newUsernameValue,
        email: newEmailValue,
        password: newPasswordValue
    };

    const fetchOptions = {
        method: "PUT",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function deleteData() {

    const url = "delete.php";
    
    const deleteId = document.getElementById('delete_id').value;

    const data = {
        id: deleteId
    };

    const fetchOptions = {
        method: "DELETE",
        body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

