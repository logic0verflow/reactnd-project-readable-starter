import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { refreshPostComments } from '../actions'
import VoteScore from './VoteScore'
import Comment from './Comment'
import CreateComment from './CreateComment'
import {
  fetchPostDetails,
  fetchPostComments,
} from '../utils/api'

class Post extends Component {

  state = {
    details: {},
    comments: [],
    creatingComment: false,
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

  onCreateComment() {
    this.setState(() => ({
      ...this.state,
      creatingComment: !this.state.creatingComment,
    }))
  }

  componentDidMount() {
    this.getPostDetails()
    this.getAllComments()
  }

  render() {
    const { details:post } = this.state
    const { comments } = this.props

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

            <Link to={"/edit-post-" + post.id}>
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

        <CreateComment parentID={post.id} show={this.state.creatingComment}/>

        {comments
          .filter(comment => comment.deleted === false)
          .map(comment => (
          <Comment details={comment} key={comment.id} />
        ))}

      </div>
    )
  }
}

function mapStateToProps({ selectedPostComments }) {
  return {
    comments: selectedPostComments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComments: (data) => dispatch(refreshPostComments(data)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
