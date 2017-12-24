export const OPEN_POST = 'OPEN_POST'
export const REFRESH_CATEGORIES = 'REFRESH_CATEGORIES'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REFRESH_POST_COMMENTS = 'REFRESH_POST_COMMENTS'
export const REPLACE_COMMENT = 'REPLACE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

export function openPost(post) {
  return {
    type: OPEN_POST,
    post,
  }
}

export function refreshCategories(categories) {
  return {
    type: REFRESH_CATEGORIES,
    categories,
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function replaceComment(comment) {
  return {
    type: REPLACE_COMMENT,
    comment
  }
}

export function removeComment(commentID) {
  return {
    type: REMOVE_COMMENT,
    commentID
  }
}

export function refreshPostComments(comments) {
  return {
    type: REFRESH_POST_COMMENTS,
    comments
  }
}
