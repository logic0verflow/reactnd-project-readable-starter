import * as type from '../actions'

export const CATEGORY_ALL = 'All'

const initialAppState = {
  selectedPostID: null,
  selectedPostCategory: null,
  selectedPostComments: [],
  categories: [],
  otherCategories: [ CATEGORY_ALL ],
  commentFormOpen: false,
}

function app ( state = initialAppState, action) {
  switch (action.type) {
    case type.OPEN_POST :
      return {
        ...state,
        selectedPostID: action.post.id,
        selectedPostCategory: action.post.category
      }
    case type.REFRESH_CATEGORIES :
      return {
        ...state,
        categories: [ ...action.categories ]
      }
    case type.ADD_COMMENT :
      return {
        ...state,
        selectedPostComments: [ action.comment, ...state.selectedPostComments ]
      }
    case type.REFRESH_POST_COMMENTS :
      return {
        ...state,
        selectedPostComments: [ ...action.comments ]
      }
    case type.REPLACE_COMMENT :
      let comments = state.selectedPostComments
      comments = comments.map(comment => comment.id === action.comment.id
        ? action.comment
        : comment)
      return {
        ...state,
        selectedPostComments: comments
      }
    case type.REMOVE_COMMENT :
      const commentID = action.commentID
      const postComments = state.selectedPostComments
      return {
        ...state,
        selectedPostComments: postComments.filter(({ id }) => id !== commentID)
      }
    case type.TOGGLE_COMMENT_FORM :
      return {
        ...state,
        commentFormOpen: !state.commentFormOpen,
      }
    default :
      return state
  }
}

export default app
