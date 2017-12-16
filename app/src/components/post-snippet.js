import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { openPost } from '../actions'
import { connect } from 'react-redux'

class PostSnippet extends Component {
  render() {
    const { post, postSelected } = this.props

    let postTime = new Date(post.timestamp)
    postTime = postTime.toLocaleString()

    return (
      <div className="post-snippet">
        <div className="row">
          <div className="col-xs-1"><p>{post.voteScore}</p></div>

          <Link to={"/post-" + post.id} onClick={() => postSelected(post)}>
            <div className="col-xs-9 text-left">
              <p>{post.title}</p>
              <span>by <strong>{post.author}</strong> at {postTime}</span>
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
