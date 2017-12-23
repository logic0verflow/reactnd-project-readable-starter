import React, { Component } from 'react'
import PostSnippet from './post-snippet'
import { CATEGORY_ALL } from '../reducers'
import {
  fetchPosts,
  fetchPostInCategory
} from '../utils/api'

class ListPosts extends Component {

  state = {
    posts: [],
  }

  getPosts() {
    fetchPosts()
    .then(posts => this.setState(() => ({
      ...this.state,
      posts
    })))
  }

  getCategoryPosts(category) {
    fetchPostInCategory(category)
    .then(posts => this.setState(() => ({
      ...this.state,
      posts
    })))
  }

  componentWillReceiveProps(nextProps) {
    const { categorySelected } = nextProps
    if (categorySelected === CATEGORY_ALL) {
      this.getPosts()
    } else {
      this.getCategoryPosts(categorySelected)
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    const { sortProp } = this.props
    const { posts } = this.state
    return (
      <div className="post-snippets">
        { posts.sort((a,b) => {
              if (a[sortProp] < b[sortProp]) return -1
              else if (a[sortProp] > b[sortProp]) return 1
              else return 0 })
          .reverse()
          .filter((post) => post.deleted === false)
          .map((post) => (<PostSnippet post={post} key={post.id}/>))
        }
      </div>
    )
  }
}

export default ListPosts
