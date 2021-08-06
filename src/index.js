import './tailwind.css'
import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

const btnLogIn = document.querySelector('.btn-login')
const btnSignUp = document.querySelector('.btn-signup')
const inputUsername = document.querySelector('.input-username')
const inputPassword = document.querySelector('.input-password')
const btn = document.querySelector('.mobile-menu-button')
const menu = document.querySelector('.mobile-menu')
const loginContainer = document.querySelector('.login-container')
const signupContainer = document.querySelector('.signup-container')
const logoutNav = document.querySelector('.logout-nav')
const signupNav = document.querySelector('.signup-nav')
const btnCreate = document.querySelector('.btn-create')
const createUserEmail = document.querySelector('.create-email')
const createUserAcc = document.querySelector('.create-username')
const createUserPassword = document.querySelector('.create-password')
const emailErrorElement = document.getElementById('eerror')
const userErrorElement = document.getElementById('uerror')
const passwordErrorElement = document.getElementById('perror')
const textLogin = document.querySelector('.text-login')
const displayUser = document.querySelector('.userName')
const displayContainer = document.querySelector('.display-container')

let testUser
let createUser
let uerrorMessage
let eerrorMessage
let perrorMessage
let fakeEmail

/*
******************************
**** Login user button *****
**** Login btn on UI   *****
******************************
*/
btnLogIn.addEventListener('click', () => {
  loginUserHelper()
})

/*
******************************
**** Create user button *****
**** Create btn on UI   *****
******************************
*/
btnCreate.addEventListener('click', () => {
  createUserHelper()
})


/*
******************************
**** mobile menu button *****
**** mobile menu  UI   *****
******************************
*/
btn.addEventListener('click', () => {
  console.log('mobile')
  menu.classList.toggle('hidden')
})

btnSignUp.addEventListener('click', () => {
  loginContainer.classList.toggle('hidden')
  signupContainer.classList.toggle('hidden')
  signupNav.textContent = 'Login'
})

if (localStorage.getItem('loggedin') === 'true') {
  const account = JSON.parse(localStorage.getItem('profile'))
  displayUser.textContent = `${account.username}`
  signupNav.textContent = 'Log Out'
  signupNav.style.backgroundColor = 'red'
  loginContainer.classList.toggle('hidden')
  displayContainer.classList.toggle('hidden')
  logoutNav.classList.toggle('hidden')
}

logoutNav.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})

signupNav.addEventListener('click', () => {
  if (localStorage.getItem('loggedin') === 'true') {
    localStorage.clear()
    alert('Successfully logged out.')
    location.href = 'index.html'
  }
  logInSignupHelper()
})

textLogin.addEventListener('click', () => {
  logInSignupHelper()
})



/*
*******************************************************
************* HELPER FUNCTIONS BELOW ******************
*******************************************************
*******************************************************
*/


/*
******************************
**** login/signup Helper *****
**** change button between Login and Sign up
******************************
*/
function logInSignupHelper() {
  loginContainer.classList.toggle('hidden')
  signupContainer.classList.toggle('hidden')

  if (loginContainer.classList.contains('hidden')) {
    signupNav.textContent = 'Login'
  } else {
    signupNav.textContent = 'Sign Up'
  }
}


/*
******************************
**** Create user helper *****
**** function helps create user *****
******************************
*/
async function createUserHelper() {
  createUser = await mockroblog.createUser(createUserAcc.value, createUserEmail.value, createUserPassword.value)

  if (!createUser) {
    alert('There was an issue creating the user')
  }
  /*
  Email Validation
  */
  for (let i = 0; i < createUserEmail.value.length; i++) {
    if (createUserEmail.value[i] === '@') {
      fakeEmail = 0
      break
    }
    else if (i === createUserEmail.value.length - 1) {
      eerrorMessage = 'Please enter a valid email address.'
      emailErrorElement.innerText = eerrorMessage
      document.getElementById('eerror').classList.toggle('hidden')
      fakeEmail = 1
    }
  }

  /*
  Fields are filled out and validated
  */
  if (createUserAcc.value.length >= 4 && createUserEmail.value.length >= 7 && createUserPassword.value.length >= 8 && fakeEmail !== 1) {
    alert(`User successfully created.\n\n Email:${createUser.email} \n\n Username: ${createUser.username} \n\n Password: ${createUser.password}`)
    location.href = 'index.html'
  } else if (createUserEmail.value.length < 7) {
    eerrorMessage = 'Please enter a valid email address.'
    emailErrorElement.innerText = eerrorMessage
    document.getElementById('eerror').classList.toggle('hidden')
  } else if (createUserAcc.value.length < 4 || createUserAcc.value.length > 20) {
    uerrorMessage = 'Username must be between 4 - 20 characters.'
    userErrorElement.innerText = uerrorMessage
    document.getElementById('uerror').classList.toggle('hidden')
  } else if (createUserPassword.value.length < 8 || createUserPassword.value.length > 25) {
    perrorMessage = 'Password must be between 8 - 25 characters.'
    passwordErrorElement.innerText = perrorMessage
    document.getElementById('perror').classList.toggle('hidden')
  }
}


/*
******************************
**** Log in user helper*****
**** function helps log in user *****
******************************
*/
async function loginUserHelper() {
  testUser = await mockroblog.authenticateUser((inputUsername.value), (inputPassword.value))
  if (testUser) {
    alert(`Login Successful \n\nWelcome ${testUser.username}`)
    /*
    Local storage
    */
    localStorage.setItem('profile', JSON.stringify(testUser))
    localStorage.setItem('loggedin', 'true')
    location.href = 'user.html'
  } else if (inputUsername.value === '' || inputUsername.value == null) {
    alert('Login Failed \n\nUsername cannot be empty.')
  }
  else if (inputPassword.value === '' || inputPassword.value == null) {
    alert('Login Failed \n\nPassword cannot be empty.')
  } else if (!testUser) {
    alert('Login Failed \n\nUsername or password do not match any credentials in the system.')
  }
}
