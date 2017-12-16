import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostSnippet from './post-snippet'

import {
  CATEGORY_ALL,
  CATEGORY_REACT,
  CATEGORY_REDUX,
  CATEGORY_UDACITY,
} from './App'

class ListPosts extends Component {
  render() {
    const { categorySelected, sortProp, posts } = this.props

    return (
      <div className="post-snippets">
        {
          posts.filter(post =>
            post.category === categorySelected
            || categorySelected === CATEGORY_ALL)
          .sort((a,b) => {
              if (a[sortProp] < b[sortProp]) return -1
              else if (a[sortProp] > b[sortProp]) return 1
              else return 0 })
          .reverse()
          .map((post) => (
            <PostSnippet post={post} key={post.id}/>))}
      </div>
    )
  }
}

function mapStateToProps ({ allPost }) {
  return {
    posts: Object.values(allPost)
  }
}

export default connect(
  mapStateToProps
)(ListPosts)
