/*
Initialize all components from HTML
*/
import './tailwind.css'
import * as mockroblog from './mockroblog.js'

const textPost = document.querySelector('.publicPostContainer')
const btn = document.querySelector('.mobile-menu-button')
const menu = document.querySelector('.mobile-menu')
const publicPost = mockroblog.getPublicTimeline()
const signUpbtn = document.querySelector('.tempbtn')
const logoutNav = document.querySelector('.logout-nav')
const activeLink = document.querySelector('.navbaraboutuslink')

if (document.URL.includes('public.html')) {
  activeLink.classList.add('text-blue-400')
  activeLink.classList.add('font-extrabold')
}

/*
Extracting object from local storage and parsing it JSON
*/
const account = JSON.parse(localStorage.getItem('profile'))
// Event Listeners

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

btn.addEventListener('click', () => {
  console.log('mobile')
  menu.classList.toggle('hidden')
})

logoutNav.addEventListener('click', () => {
  localStorage.clear()
  alert('Successfully logged out.')
  location.href = 'index.html'
})

publicPost.forEach(obj => {
  textPost.innerHTML += `
    <div class='userName pt-5 w-40 px-3 font-bold text-blue-700' >
    </p> User ID: ${obj.user_id}</p>
    </div>

    <!--follow button-->

        <button class = 'followtbtn hidden m-2 w-20 h-5 h-2 pb-2 text-white font-bold tracking-wider rounded bg-blue-500 active:bg-blue-700'>
        follow
        </button> 


    <!--unfollow button-->

        <button class = "unfollowbtn hidden m-2 w-20 h-5 text-white font-bold tracking-wider rounded bg-blue-500 active:bg-blue-700">
        unfollow
        </button> 


        <div class="timeline-container"> </div>
        <div class="timeline-pointer" aria-hidden="true">
            <div class="postContainer bg-white p-2 rounded-md shadow-md">
                <span
                <span class="font-bold text-indigo-600 text-sm tracking-wide"> 
                ${obj.timestamp}</span>
                <p class="pt-1">
                    ${obj.text}
                </p>
                <br>
            </div>
        </div>

        <!--Like/unlike feature-->
        <div class="container pt-2 pl-2 flex space-x-2">
            <div class="like flex active:bg-green-300">
                <p class="likeCount text-blue-400 text-lg pr-2">0</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="likebtn h-5 w-5" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
            </div>

            <div class="unlike flex active:bg-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                <p class="unlikeCount text-red-400 text-lg pl-2">0</p>
            </div>
        </div>
    `
})

const follow = document.querySelectorAll('.followtbtn')
const unfollow = document.querySelectorAll('.unfollowbtn')
const likeCount = document.querySelectorAll('.likeCount')
const likebtn = document.querySelectorAll('.likebtn')
let likecounter = 0

if (localStorage.getItem('loggedin') === 'true') {
  follow.forEach((btnFollow, index) => {
    btnFollow.classList.remove('hidden')
    btnFollow.addEventListener('click', () => {
      btnFollow.classList.add('hidden')
      unfollow[index].classList.remove('hidden')
      unfollow[index].style.backgroundColor = 'red'
      const addingFollower = mockroblog.addFollower(publicPost[index].id, account.id)
      console.log(addingFollower)
      console.log('you followed User ID:', publicPost[index].user_id)
    })
  })

  unfollow.forEach((btnUnFollow, index) => {
    btnUnFollow.addEventListener('click', () => {
      btnUnFollow.classList.add('hidden')
      follow[index].classList.remove('hidden')
      const removingFollower = mockroblog.removeFollower(publicPost[index].id, account.id)
      console.log(removingFollower)
      console.log('you unfollowed User ID:', publicPost[index].user_id)
    })
  })
} else {
  console.log('im not logged in')
}

likebtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    likeHelper(index)
  })
})

/*
*******************************************************
************* HELPER FUNCTIONS BELOW ******************
*******************************************************
*******************************************************
*/

async function likeHelper(index) {
  const currUser = await mockroblog.getUser(account.username)
  const likeContainer = await mockroblog.likedMessageUserId(currUser)
  let flag = true
  let tempIndex = 0
  let temp = Number(likeCount[index].textContent)

  for (let i = 0; i <= likeContainer.length - 1; i++) {
    if (likeContainer[i].post_id != index + 1 && flag != false) {
      flag = true
    } else {
      flag = false
      tempIndex = likeContainer[i].id
      break
    }
  }

  if (flag) {
    temp++
    likeCount[index].textContent = String(temp)
    mockroblog.addLike(currUser.id, index + 1, timestampGenerator())
  } else {
    temp--
    likeCount[index].textContent = String(temp)
    mockroblog.removeLike(tempIndex)
  }
}


displayLikesHelper()
async function displayLikesHelper() {
  const likedMessages = await mockroblog.likedMessage()
  const posts = await mockroblog.getAllPosts()
  let likeCounter = 0;
  posts.forEach((obj, index) => {
    likedMessages.forEach(obj2 => {
      if (obj2.post_id == obj.id) {
        likeCounter++
      }
    })
    likeCount[index].textContent = String(likeCounter)
    likeCounter = 0;
  })
}


/*
Time stamp Generator
*/
// Create timestamp
function timestampGenerator() {
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
