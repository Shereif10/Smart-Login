// variables



var userNameInput = document.getElementById('userName');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');

var signUpBtn = document.getElementById('signUp');

var message = document.getElementById('message')

var loginEmailInput = document.getElementById('loginEmail')
var loginPasswordInput = document.getElementById('loginPassword')

var loginBtn = document.getElementById('loginBtn');

var loginMessage = document.getElementById('loginMessage');

var welcomeMessage = document.getElementById('welcome');


var accountContainer = [];


if (localStorage.getItem('accounts') != null) {
    accountContainer = JSON.parse(localStorage.getItem('accounts'));
}



function createAccount() {


    if (userNameInput.value == '' || emailInput.value == '' || passwordInput.value == '') {
        message.innerHTML = 'All inputs are required !'

        message.classList.remove('text-success');
        message.classList.add('text-danger');

        userNameInput.classList.add('is-invalid')
        emailInput.classList.add('is-invalid')
        passwordInput.classList.add('is-invalid')

        return false;
    }


    if (validateEmail() == true && validatePassword() == true && validatePassword() == true) {


        for (var i = 0; i < accountContainer.length; i++) {

            if (emailInput.value == accountContainer[i].email) {
                message.innerHTML = 'This email already exists !'


                message.classList.remove('text-success');
                message.classList.add('text-danger');

                emailInput.classList.add('is-invalid')

                return true;
            }
        }



        account = {
            username: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }

        accountContainer.push(account);
        localStorage.setItem('accounts', JSON.stringify(accountContainer))

        message.classList.remove('text-danger');
        message.classList.add('text-success');
        message.innerHTML = 'Success'
    }
    else {
        Swal.fire({
            type: "error",
            title: "Something wrong",
            text: `Email or password is not valid, Please follow the rules below :
                  Email must be a valid mail &
                  Password must be at least 8 digits long and include at least one numeric digit & Username must start with uppercase letter.
                  Note: All of these fields are required`,
        });
    }
}



// validation 



function validateEmail() {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var text = emailInput.value;

    if (regex.test(text) == true) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');

        return true;
    }
    else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');

        return false;
    }
}



function validateUserName() {
    var regex = /([a-z]|[A-Z]){3,}$/
    var text = userNameInput.value;

    if (regex.test(text) == true) {
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');

        return true;
    }
    else {
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');

        return false;
    }
}



function validatePassword() {
    var regex = /^(?=.*\d).{8,}$/;
    var text = passwordInput.value;

    if (regex.test(text) == true) {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');

        return true;
    }
    else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');

        return false;
    }
}



// login page



function login() {

    if(loginEmailInput.value == '' || loginPasswordInput.value == ''){
        loginMessage.innerHTML = 'All inputs are required !'
        loginMessage.classList.add('text-danger');
    }
    else if (accountContainer.length == 0) {
        loginMessage.innerHTML = 'Please sign up first !'
        loginMessage.classList.add('text-danger');
    }
    else{
        for (var i = 0 ; i < accountContainer.length ; i++) {

            if (accountContainer[i].email == loginEmailInput.value && accountContainer[i].password == loginPasswordInput.value) {
                localStorage.setItem('username' ,JSON.stringify ( accountContainer[i].username) );
                window.location.href = './home.html';
                return true;
            }
            else {
                loginMessage.innerHTML = 'incorrect password or email !'
                loginMessage.classList.add('text-danger');
            }
        }
    }
    

}



// home page



function load(){
    welcomeMessage.innerHTML = 'welcome ' + JSON.parse(localStorage.getItem('username'));
}



function logOut(){
    localStorage.removeItem('username');
    window.location.href = './index.html';
}