import {
  OPEN_POST,
  REFRESH_CATEGORIES,
  ADD_COMMENT,
  REFRESH_POST_COMMENTS,
  REPLACE_COMMENT,
  REMOVE_COMMENT,
} from '../actions'

export const CATEGORY_ALL = 'All'

const initialAppState = {
  selectedPostID: null,
  selectedPostComments: [],
  categories: [],
  otherCategories: [ CATEGORY_ALL ],
}

function app ( state = initialAppState, action) {
  switch (action.type) {
    case OPEN_POST :
      return {
        ...state,
        selectedPostID: action.post.id
      }
    case REFRESH_CATEGORIES :
      return {
        ...state,
        categories: [ ...action.categories ]
      }
    case ADD_COMMENT :
      return {
        ...state,
        selectedPostComments: [ action.comment, ...state.selectedPostComments ]
      }
    case REFRESH_POST_COMMENTS :
      return {
        ...state,
        selectedPostComments: [ ...action.comments ]
      }
    case REPLACE_COMMENT :
      let comments = state.selectedPostComments
      comments = comments.map(comment => comment.id === action.comment.id
        ? action.comment
        : comment)
      return {
        ...state,
        selectedPostComments: comments
      }
    case REMOVE_COMMENT :
      const commentID = action.commentID
      const postComments = state.selectedPostComments
      return {
        ...state,
        selectedPostComments: postComments.filter(({ id }) => id !== commentID)
      }
    default :
      return state
  }
}

export default app
