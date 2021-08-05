import './tailwind.css'
import * as mockroblog from './mockroblog.js'
/*
Initialize all components from HTML
*/
const btn = document.querySelector('.mobile-menu-button')
const menu = document.querySelector('.mobile-menu')
const textPost = document.querySelector('#text-post')
const textDisplayPost = document.querySelector('.text-display-post')
const btnPost = document.querySelector('.btn-post')
const signUpbtn = document.querySelector('.tempbtn')
const logoutNav = document.querySelector('.logout-nav')
const activeLink = document.querySelector('.navbaraboutuslink')
const username = document.querySelector('.username')
const timestamp = document.querySelector('.post-timestamp')
const dispalyPost = document.querySelector('.displayPost')

/*
Extracting object from local storage and parsing it JSON
*/
const account = JSON.parse(localStorage.getItem('profile'))

if (document.URL.includes('post.html')) {
  activeLink.classList.add('text-blue-400')
  activeLink.classList.add('font-extrabold')
  username.classList.add('hidden')
  timestamp.classList.add('hidden')
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
btnPost.addEventListener('click', () => {
  mockroblog.postMessage(account.id, textPost.value)
  username.classList.remove('hidden')
  timestamp.classList.remove('hidden')
  username.textContent = `${account.username} Posted`
  timestamp.textContent = timestampGenerator()
  textDisplayPost.textContent = textPost.value
  textPost.value = ''
})
signUpbtn.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})

btn.addEventListener('click', () => {
  console.log('mobile')
  menu.classList.toggle('hidden')
})

logoutNav.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})


//Create timestamp
function timestampGenerator(){
  const now = new Date()
  const timestamp =
    now.getUTCFullYear() + '-' +
    String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(now.getUTCDate()).padStart(2, '0') + ' ' +
    String(now.getUTCHours()).padStart(2, '0') + ':' +
    String(now.getUTCMinutes()).padStart(2, '0') + ':' +
    String(now.getUTCSeconds()).padStart(2, '0')
  
  return timestamp
}