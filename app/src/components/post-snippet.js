import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openPost } from '../actions'
import { connect } from 'react-redux'
import VoteScore from './VoteScore'
import { fetchPostComments } from '../utils/api'

class PostSnippet extends Component {

  constructor(props) {
    super(props)
    this.state = {
      commentCount: 0,
    }
  }

  componentDidMount() {
    fetchPostComments(this.props.post.id)
    .then(comments => this.setState(()=> ({
      ...this.state,
      commentCount: comments.length,
    })))
  }


  render() {
    const { postSelected, post } = this.props
    let postTime = new Date(post.timestamp).toLocaleString()

    return (
      <div className="post-snippet">
        <div className="row">
          <div className="col-xs-1 text-center">
            <VoteScore itemType="posts" id={post.id} voteScore={post.voteScore}/>
          </div>

          <Link to={"/post/" + post.id} onClick={() => postSelected(post)}>
            <div className="col-xs-9 text-left">
              <p>{post.title}</p>
              <span>by <strong>{post.author}</strong> at {postTime}</span>
              <p>{this.state.commentCount} Comments</p>
            </div>
          </Link>

          <div className="col-xs-2 text-right">{post.category}</div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postSelected: (post) => dispatch(openPost(post)),
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(PostSnippet)
