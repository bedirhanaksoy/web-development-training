function validateLogin() {
    var username = document.getElementById('login_username').value;
    var email = document.getElementById('login_email').value;
    var password = document.getElementById('login_password').value;

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
    performLogin();

    return false;
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
    performSignIn();

    return false;
}
function performSignIn() {

    const url = "../api/signin.php";
    
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

        if (data.status === 'success') {
            signInSuccessAlert()
            window.location.href = "../index.php";
        } 
        else {
            loginFailedAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function performLogout(){
    const url = "../api/logout.php";
    const fetchOptions = {
        method: "POST",
    };

    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => {

        if (data.status === 'success') {
            logoutAlert()
            window.location.href = "../index.php";
        } 
        else {
            errorAlert();
            window.location.href = "../index.php";
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });

}

function performLogin() {

    const url = "./api/performLogin.php";
    const usernameValue = document.getElementById('login_username').value;
    const emailValue = document.getElementById('login_email').value;
    const passwordValue = document.getElementById('login_password').value;

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

        if (data.status === 'success') {
            loginSuccessAlert(data.session_username, data.id, data.session_email)
            window.location.href = "./api/main.php";
        } 
        else {
            loginFailedAlert();
        }
    })
        .catch(error => {
        console.error('Fetch error:', error.message);
    });
}

function loginSuccessAlert(username, id, email){
    var message = 'User is logged in as\nID:' + id + '\nUsername: ' + username + '\nEmail: ' + email;
    alert(message);
}

function loginFailedAlert(username, id, email){
    var message = 'Some credentials are wrong, try again.';
    alert(message);
}

function logoutAlert(username, id, email){
    var message = 'Logout successfull, redirecting to log in page';
    alert(message);
}

function errorAlert(){
    var message = 'Something goes wrong, redirecting to log in page';
    alert(message);

}

function signInSuccessAlert(){
    var message = 'New user successfully created, redirecting to log in page';
    alert(message);
}