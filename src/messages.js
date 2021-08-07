import './tailwind.css'
import * as mockroblog from './mockroblog.js'

/*
Extracting object from local storage and parsing it JSON
*/
const account = JSON.parse(localStorage.getItem('profile'))

/*
Initialize all components from HTML
*/
const btn = document.querySelector('.mobile-menu-button')
const menu = document.querySelector('.mobile-menu')
const signUpbtn = document.querySelector('.tempbtn')
const logoutNav = document.querySelector('.logout-nav')
const activeLink = document.querySelector('.navbaraboutuslink')
const typingMessage = document.querySelector('#typing-message')
const btnSend = document.querySelector('.btn-send')
const btnNewmsg = document.querySelector('.btn-new')
const btnDeletemsg = document.querySelector('.btn-delete')
const newMsgField = document.querySelector('.new-msg-field')
const deleteMsgField = document.querySelector('.delete-msg-field')

if (document.URL.includes('messages.html')) {
  activeLink.classList.add('text-blue-400')
  activeLink.classList.add('font-extrabold')
}

if (localStorage.getItem('loggedin') === 'true') {
  signUpbtn.textContent = 'Log Out'
  signUpbtn.style.backgroundColor = 'red'
  logoutNav.classList.toggle('hidden')
} else {
  alert('Please log in first.')
  location.href = 'index.html'
}


// Event Listeners
btn.addEventListener('click', () => {
  console.log('mobile')
  menu.classList.toggle('hidden')
})

logoutNav.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})

signUpbtn.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})


btnSend.addEventListener('click', () => {
  sendHelper()
})

btnNewmsg.classList.toggle('hidden') // Appear by default
btnDeletemsg.classList.toggle('hidden') // Appear by default

btnNewmsg.addEventListener('click', () => {
  btnNewmsg.classList.toggle('hidden')
  newMsgField.classList.toggle('hidden')
})

btnDeletemsg.addEventListener('click', () => {
  btnDeletemsg.classList.toggle('hidden')
  deleteMsgField.classList.toggle('hidden')
})
// Helper Functions
async function sendHelper() {
  const sendValid = await mockroblog.sendMessage(account.id, 2, typingMessage.value)
  
  if (sendValid) {
    console.log('SENT FROM',account.id)
    typingMessage.value= ''
  }
  else {
    console.log('ERROR NOT SENT')
  }
}
