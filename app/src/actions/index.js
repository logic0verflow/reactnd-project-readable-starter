export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'

export function addPost({ title, body, author, category }) {
  return {
    type: ADD_POST,
    post: {
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
      voteScore: 1,
      deleted: false
    }
  }
}
