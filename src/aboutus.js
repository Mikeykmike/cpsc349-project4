import './tailwind.css'
// import * as mockroblog from './mockroblog.js'

/*
Initialize all components from HTML
*/
const btn = document.querySelector('.mobile-menu-button')
const menu = document.querySelector('.mobile-menu')
const signUpbtn = document.querySelector('.tempbtn')
const logoutNav = document.querySelector('.logout-nav')
const activeLink = document.querySelector('.navbaraboutuslink')

// Event Listeners
btn.addEventListener('click', () => {
  console.log('mobile')
  menu.classList.toggle('hidden')
})

if (document.URL.includes('aboutus.html')) {
  activeLink.classList.add('text-blue-400')
  activeLink.classList.add('font-extrabold')
}

if (localStorage.getItem('loggedin') === 'true') {
  signUpbtn.textContent = 'Log Out'
  signUpbtn.style.backgroundColor = 'red'
  logoutNav.classList.toggle('hidden')
  signUpbtn.addEventListener('click', () => {
    localStorage.clear()
    alert('Successfully logged out.')
    location.href = 'index.html'
  })
} else {
  signUpbtn.addEventListener('click', () => {
    location.href = 'index.html'
  })
}

logoutNav.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})
