import './tailwind.css'
import * as mockroblog from './mockroblog.js'


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



/*
Chris is variables 
*/
const btnNewMsg = document.querySelector('.btnNewMsg')
const btnDeleteMsg = document.querySelector('.btnDeleteMsg')
const inputUsername = document.querySelector('.inputUsername')
const displayUsername = document.querySelector('.displayUsername')
const displayContactList = document.querySelector('.contactsContainer')
const displayConversation = document.querySelectorAll('.displayConversation')

/*
Ryan
*/
const displayRecipient = document.querySelector('.displayRecipient')

/*
Extracting object from local storage and parsing it JSON
*/
const account = JSON.parse(localStorage.getItem('profile'))




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

let recipient

btnNewMsg.addEventListener('click', () => {
  recipient = inputUsername.value
  console.log('obtained', recipient)
  // checkUser()
  displayRecipient.textContent = recipient
  inputUsername.value = ''
})

/*
*******************************************************
************* HELPER FUNCTIONS BELOW ******************
*******************************************************
*******************************************************
*/

async function sendHelper() {
  const sendValid = await mockroblog.sendMessage(account.id, recipient, typingMessage.value)

  if (sendValid) {
    console.log('SENT TO', recipient)
    typingMessage.value = ''
  }
  else {
    console.log('ERROR NOT SENT')
  }
}

displayContact()
async function displayContact() {
  const loggedUser = await mockroblog.getUser(account.username)
  const temp = await mockroblog.getContacts(loggedUser)
  let currUser

  for (let i = 0; i <= temp.length - 1; i++) {
    currUser = await mockroblog.getUserById(temp[i].to_user_id)
    displayContactList.innerHTML +=
      `
    <div class="w-full">
      <button class="displayConversation text-lg font-semibold">${currUser.username}
      </button>
    </div>
  `
  }
  loadConversations(document.querySelectorAll('.displayConversation'))
}


async function loadConversations(btnUsername) {
  const btnUser = btnUsername
  btnUser.forEach(obj => {
    obj.addEventListener('click', () => {
      console.log(obj.textContent);
      loadConversationsHelper(obj.textContent)
    })
  })

  async function loadConversationsHelper(user) {
    const currUser = await mockroblog.getUser(user)
    const conversations = await mockroblog.getMessages(account.id, currUser.id)
    console.log(conversations);
  }
}



// async function checkUser() {
//   const checking = await mockroblog.getUser(recipient)
  
//   if (mockroblog.getUser(recipient)!=null)
//   console.log('valid user')
//   else
//   console.log('person doesnt exist in database')
// }



