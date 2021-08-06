import './tailwind.css'
import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

// async function search (term = '') {
//   const query = encodeURIComponent(`%%${term}%%`)
//   const response = await fetch(`http://localhost:5000/posts/?text=${query}`)
//   const data = await response.json()

//   result.textContent = JSON.stringify(data.resources, null, 2)
//   resultDiv.hidden = !term
// }

// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault()
// })

// keyword.addEventListener('input', (event) => {
//   search(keyword.value)
// })

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

// Event Listeners
btnLogIn.addEventListener('click', (e) => {
  testUser = mockroblog.authenticateUser((inputUsername.value), (inputPassword.value))
  if (testUser != null) {
    e.preventDefault()
    alert(`Login Successful \n\nWelcome ${testUser.username}`)
    /*
    Local storage
    */
    localStorage.setItem('profile', JSON.stringify(testUser))
    localStorage.setItem('loggedin', 'true')
    location.href = 'user.html'
  } else if (inputUsername.value === '' || inputUsername.value == null) {
    e.preventDefault()
    alert('Login Failed \n\nUsername cannot be empty.')
  }
  else if (inputPassword.value === '' || inputPassword.value == null) {
    e.preventDefault()
    alert('Login Failed \n\nPassword cannot be empty.')
  } else {
    e.preventDefault()
    alert('Login Failed \n\nUsername or password do not match any credentials in the system.')
  }
})

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

btnCreate.addEventListener('click', (e) => {
  e.preventDefault()
  createUserHelper()
})

// Helper functions
function logInSignupHelper() {
  loginContainer.classList.toggle('hidden')
  signupContainer.classList.toggle('hidden')

  if (loginContainer.classList.contains('hidden')) {
    signupNav.textContent = 'Login'
  } else {
    signupNav.textContent = 'Sign Up'
  }
}



async function createUserHelper(){
  createUser = await mockroblog.createUser(createUserAcc.value,createUserEmail.value, createUserPassword.value)
  console.log(createUser);
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
    location.href = 'user.html'
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
