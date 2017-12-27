import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { refreshPostComments, toggleCommentForm } from '../actions'
import VoteScore from './VoteScore'
import Comment from './Comment'
import CreateComment from './CreateComment'
import ToggleDisplay from 'react-toggle-display'
import {
  fetchPostDetails,
  fetchPostComments,
} from '../utils/api'

class Post extends Component {

  state = {
    details: {
      deleted: false,
    },
    comments: [],
  }

  getPostDetails() {
    fetchPostDetails(this.props.id)
    .then(details => this.setState(() => ({
      ...this.state,
      details
    })))
  }

  getAllComments() {
    fetchPostComments(this.props.id)
    .then(comments => this.props.updateComments(comments))
  }

  // Toggle to show and hide the new comment form
  onCreateComment() {
    this.props.toggleCommentForm()
  }

  componentDidMount() {
    this.getPostDetails()
    this.getAllComments()
  }

  render() {
    const { details:post } = this.state
    const { comments } = this.props

    if (post.deleted || post.deleted === undefined) {
      return (
        <Redirect to='/404-page-not-found'/>
      )
    }

    return (
      <div>

        {/* ***** Post Menu ***** */}


        <div className="row">

          <div className="col-xs-6 text-left">
            <Link to="/">
              <div className="btn btn-default">Back</div>
            </Link>
          </div>

          <div className="col-xs-6 text-right">

            <Link to={`/${post.category}/${post.id}/delete`}>
              <div className="btn btn-default">Delete</div>
            </Link>
            <Link to={`/${post.category}/${post.id}/edit`}>
              <div className="btn btn-default">Edit</div>
            </Link>

          </div>

        </div>


        {/* ***** Normal Post View ***** */}


        <div className="post-snippet">
          <div className="row">
            <div className="col-xs-1">
              <VoteScore itemType="posts" id={post.id} voteScore={post.voteScore}/>
            </div>
            <div className="col-xs-9 text-left">
              <h4>{post.title}</h4>
              <p>by {post.author} at {new Date(post.timestamp).toLocaleString()}</p>
              <p>{post.body}</p>
            </div>
            <div className="col-xs-2 text-right">{post.category}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4"></div>
          <div className="col-xs-4"><h3>{comments.length} Comments</h3></div>
          <div className="col-xs-4 text-right">
            <button
              type="button"
              onClick={() => this.onCreateComment()}
              className="btn btn-default">Add Comment</button>
          </div>
        </div>

        <ToggleDisplay show={this.props.commentFormOpen}>
          <CreateComment parentID={post.id} />
        </ToggleDisplay>

        {/* only show comments that haven't been deleted */}
        {comments
          .filter(comment => comment.deleted === false)
          .map(comment => (
          <Comment details={comment} key={comment.id} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ selectedPostComments, commentFormOpen }) {
  return {
    comments: selectedPostComments,
    commentFormOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComments: (data) => dispatch(refreshPostComments(data)),
    toggleCommentForm: () => dispatch(toggleCommentForm())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
