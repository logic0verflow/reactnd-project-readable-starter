
import uuidv1 from 'uuid/v1'

const AUTHORIZATION_ID = 'SUPER_AMAZING_ID'

export function fetchCategories() {
  return fetch(`http://localhost:3001/categories`, {
    method: 'GET',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(({ categories }) => categories.map(({ name }) => name))
}

export function fetchPosts() {
  // console.log('fetchPosts CALLED');
  return fetch(`http://localhost:3001/posts`, {
    method: 'GET',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
  })
  .then(res => res.json())
}

export function fetchPostComments(postID) {
  return fetch(`http://localhost:3001/posts/${postID}/comments`, {
    method: 'GET',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
  })
  .then(res => res.json())
}

export function fetchPostInCategory(category) {
  return fetch(`http://localhost:3001/${category}/posts`, {
    method: 'GET',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
  })
  .then(res => res.json())
}

export function fetchPostDetails(postID) {
  return fetch(`http://localhost:3001/posts/${postID}`, {
    method: 'GET',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
  })
  .then(res => res.json())
}

export function fetchSubmitPost(postID, postDetails) {
  return fetch(`http://localhost:3001/posts/${postID}`, {
    method: 'PUT',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(postDetails)
  })
  .then(res => res.json())
}

export function fetchCreatePost(postDetails) {
  postDetails.id = uuidv1()
  postDetails.timestamp = Date.now()
  return fetch(`http://localhost:3001/posts/`, {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(postDetails)
  })
  .then(res => res.json())
}

export function fetchEditComment(commentID, commentDetails) {
  commentDetails.timestamp = Date.now()
  return fetch(`http://localhost:3001/comments/${commentID}`, {
    method: 'PUT',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(commentDetails)
  })
  .then(res => res.json())
}

export function fetchCreateComment(commentDetails) {
  commentDetails.id = uuidv1()
  commentDetails.timestamp = Date.now()
  return fetch(`http://localhost:3001/comments`, {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(commentDetails)
  })
  .then(res => res.json())
}

export function fetchDeletePost(postID) {
  return fetch(`http://localhost:3001/posts/${postID}`, {
    method: 'DELETE',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
  })
  .then(res => res.json())
}

export function fetchVoteScore(itemType, itemID, vote) {
  return fetch(`http://localhost:3001/${itemType}/${itemID}`, {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION_ID,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ option: vote }),
  })
  .then(res => res.json())
}
