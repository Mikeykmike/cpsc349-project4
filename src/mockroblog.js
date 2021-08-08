export async function newMsg() {
  try {

  } catch (err) {
    console.log(err);
    return null
  }
}

export async function deleteMsg() {
  try {

  } catch (err) {
    console.log(err);
    return null
  }
}


export async function getContacts(curUser) {
  try {
    const response = await fetch(`http://localhost:5000/direct_messages/?from_user_id=${curUser.id}`)
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null
  }
}

export async function getMessages(from_user_id, to_user_id) {
  try {
    console.log(from_user_id, to_user_id);
    const response = await fetch(`http://localhost:5000/direct_messages/?from_user_id=${from_user_id}&to_user_id=${to_user_id}`)
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null
  }
}


export async function getUser(username) {
  try {
    const response = await fetch(`http://localhost:5000/users/?username=${username}`)
    const result = await response.json()
    return result.resources[0]
  } catch (err) {
    console.log(err);
    return null
  }
}

export async function getUserById(user_id) {
  try {
    const response = await fetch(`http://localhost:5000/users/?id=${user_id}`)
    const result = await response.json()
    return result.resources[0]
  } catch (err) {
    console.log(err);
    return null
  }
}


export async function getUserTimeline(username) {
  try {
    if (!username) return null
    const response = await fetch(`http://localhost:5000/posts/?user_id=${(username.id)}`)
    const userTimeline = await response.json()
    return userTimeline.resources
  } catch (err) {
    console.log(err);
    return null
  }
}

export async function likedMessage() {
  try {
    const response = await fetch('http://localhost:5000/likes/')
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null
  }
}

export async function addLike(user_id, post_id, timestamp) {
  try {
    await fetch('http://localhost:5000/likes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user_id': user_id,
        'post_id': post_id,
        'timestamp': timestamp
      })
    })

    return true
  } catch (err) {
    console.log(err);
    return false
  }
}

export async function removeLike(post_id) {
  try {
    await fetch(`http://localhost:5000/likes/${post_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}

export async function likedMessageUserId(currUser) {
  try {
    const response = await fetch(`http://localhost:5000/likes/?user_id=${currUser.id}`)
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null
  }
}

export async function getAllPosts() {
  try {
    const response = await fetch('http://localhost:5000/posts/')
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getPostsUserId(currUser) {
  try {
    const response = await fetch(`http://localhost:5000/posts/?user_id=${currUser.id}`)
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null
  }
}

// export async function sendMessage(sendingId, recievingId, text) {
//   try {
//     const response = await fetch(`http://localhost:5000/direct_messages/?from_user_id=${sendingId.id}`)
//     const result = await response.json()
//   } catch (err) {
//     console.log(err);
//     return null;
//   }

// }

export async function sendMessage(sendingId, recievingId, text) {
  try {
    await fetch('http://localhost:5000/direct_messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'from_user_id': sendingId,
        'to_user_id': recievingId,
        'text': text
      })
    })
    //getUser('ProfAvery')
    return true
  } catch (err) {
    console.log(err);
    return false;
  }

}

export async function postMessage(userId, text) {
  try {
    await fetch('http://localhost:5000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user_id': userId,
        'text': text
      })
    })
    getUser('ProfAvery')
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}



export async function createUser(username, email, password) {
  try {
    const response = await fetch('http://localhost:5000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'email': email,
        'password': password
      })
    })
    let result = await response.json()
    return {
      'email': email,
      'username': username,
      'password': password
    }
  } catch (err) {
    console.log(err);
    return false
  }
}

export async function authenticateUser(username, password) {
  try {
    console.log(username, password);
    const response = await fetch(`http://localhost:5000/users/?username=${username}&password=${password}`)
    const result = await response.json()
    console.log(result);
    return result.resources[0]
  } catch (err) {
    console.log(err);
    return null
  }
}

export function addFollower(userId, userIdToFollow) {
  if (userId > 3) {
    return {
      id: 6,
      follower_id: userId,
      following_id: userIdToFollow
    }
  }
}

export function removeFollower(userId, userIdToStopFollowing) {
  if (userId <= 3) {
    return {
      message: null
    }
  }
}

export async function getPublicTimeline1() {
  try {
    const response = await fetch('http://localhost:5000/posts/')
    const result = await response.json()
    return result.resources
  } catch (err) {
    console.log(err);
    return null;
  }
}


export function getPublicTimeline() {
  return [
    {
      id: 2,
      user_id: 1,
      text: 'FYI: https://www.levels.fyi/still-hiring/',
      timestamp: '2021-07-24 05:11:12'
    },
    {
      id: 5,
      user_id: 2,
      text: "I keep seeing video from before COVID, of people not needing to mask or distance, and doing something like waiting in line at Burger King. YOU'RE WASTING IT!",
      timestamp: '2021-07-24 05:10:12'
    },
    {
      id: 3,
      user_id: 1,
      text: 'Yes, the header file ends in .h. C++ is for masochists.',
      timestamp: '2021-07-24 05:09:12'
    },
    {
      id: 4,
      user_id: 2,
      text: 'If academia were a video game, then a 2.5 hour administrative meeting that votes to extend time 15 minutes is a fatality. FINISH HIM',
      timestamp: '2021-07-24 05:08:12'
    },
    {
      id: 6,
      user_id: 3,
      text: '#cpsc315 #engr190w NeurIPS is $25 for students and $100 for non-students this year! https://medium.com/@NeurIPSConf/neurips-registration-opens-soon-67111581de99',
      timestamp: '2021-07-24 05:07:12'
    },
    {
      id: 1,
      user_id: 1,
      text: 'Meanwhile, at the R1 institution down the street... https://uci.edu/coronavirus/messages/200710-sanitizer-recall.php',
      timestamp: '2021-07-24 05:06:12'
    }
  ]
}

export async function getHomeTimeline(username) {

  const fetch1 = await fetch(`http://localhost:5000/followers/?following_id=${username.id}`)
  const result = await fetch1.json()
  const postContainer = []
  for (let i = 0; i <= result.resources.length - 1; i++) {
    const fetch2 = await fetch(`http://localhost:5000/posts/?user_id=${result.resources[i].follower_id}`)
    const result2 = await fetch2.json()
    postContainer.push(result2.resources)
  }
  return postContainer
}