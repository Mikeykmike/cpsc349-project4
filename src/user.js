import './tailwind.css'
import * as mockroblog from './mockroblog.js'
/*
Initialize all components from HTML
*/
const btn = document.querySelector(".mobile-menu-button")
const menu = document.querySelector(".mobile-menu")
const myPost = document.querySelector(".postContainer")
const displayUser = document.querySelector(".userName")
const signUpbtn = document.querySelector('.tempbtn')
const logoutNav = document.querySelector(".logout-nav")
const activeLink = document.querySelector(".navbaraboutuslink")

if(document.URL.includes("user.html"))
{
    activeLink.classList.add("text-blue-400")
    activeLink.classList.add("font-extrabold")
}

/*
Extracting object from local storage and parsing it JSON
*/
const account = JSON.parse(localStorage.getItem('profile'))

if(localStorage.getItem('loggedin') === 'true')
{
    signUpbtn.textContent = 'Log Out'
    signUpbtn.style.backgroundColor = "red"
    logoutNav.classList.toggle("hidden")
    
}
else
{
    alert("Please log in first.")
    location.href = "index.html"
}

/*
Api variables
*/
const userPost = mockroblog.getUserTimeline(account.username)
displayUser.textContent = account.username

//Event Listeners 
signUpbtn.addEventListener('click', () => {
    localStorage.clear()
    alert("Successfully logged out.")
    location.href = "index.html"
})

btn.addEventListener('click', () => {
    console.log("mobile");
    menu.classList.toggle("hidden")
})

logoutNav.addEventListener('click', () => {
    localStorage.clear()
    alert("Successfully logged out.")
    location.href = "index.html"
})

userPost.forEach(obj => {
    myPost.innerHTML += `
    <span
    <span class="font-bold text-indigo-600 text-sm tracking-wide"> 
    ${obj.timestamp}</span>
    <p class="pt-1">
        ${obj.text}
    </p>
    <br>
    `
})