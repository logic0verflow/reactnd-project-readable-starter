import {
  ADD_POST,
  OPEN_POST,
} from '../actions'


const initialPostsState = {
  allPost: {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0
    }
  },
  selectedPostID: null,
}

function post ( state = initialPostsState, action) {

  let { post } = action

  // if no post id exist, its a new post being created and needs an id
  if (post && !post.id) {
    const hash = require('object-hash');
    post.id = hash(post)
  }

  switch (action.type) {
    case ADD_POST :
      let updates = { ...state }
      updates.allPost[post.id] = post
      return updates
    case OPEN_POST :
      return {
        ...state,
        selectedPostID: post.id
      }
    default :
      return state
  }
}

export default post
