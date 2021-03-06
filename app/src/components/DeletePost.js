import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {
  fetchDeletePost,
  fetchPostDetails
} from '../utils/api'

class DeletePost extends Component {

  state = {
    post: {
      deleted: false,
    }
  }

  getPostDetails() {
    fetchPostDetails(this.props.id)
    .then(post => this.setState(() => ({
      ...this.state,
      post
    })))
  }

  // Delete this post from the server which causes this component to unmount
  onDelete(id) {
    fetchDeletePost(id)
  }

  componentDidMount() {
    this.getPostDetails()
  }

  render() {
    const { post } = this.state

    let postTime = new Date(post.timestamp).toLocaleString()


    if (post.deleted || post.deleted === undefined) {
      return (
        <Redirect to='/404-page-not-found'/>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h2>Deleting The Post Below</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12"><h4>Are you sure?</h4></div>
        </div>

        <div className="row">
          <div className="col-xs-12 text-center">
            <Link to='/'
              className="btn btn-default"
              onClick={() => { this.onDelete(this.props.id) }}
              >Yes</Link>
            <Link to={`/${post.category}/${post.id}`} className="btn btn-default">No</Link>
          </div>
        </div>

        <div className="post-snippet">
          <div className="row">
            <div className="col-xs-1"><p>{post.voteScore}</p></div>

            <div className="col-xs-9 text-left">
              <p>{post.title}</p>
              <span>by <strong>{post.author}</strong> at {postTime}</span>
            </div>

            <div className="col-xs-2 text-right">{post.category}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default DeletePost
