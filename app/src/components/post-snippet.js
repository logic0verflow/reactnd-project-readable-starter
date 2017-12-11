import React, { Component } from 'react';

class PostSnippet extends Component {
  render() {
    const { post } = this.props
    return (
      <div className="post-snippet">
        <div className="row">
          <div className="col-xs-1"><p>{post.voteScore}</p></div>
          <div className="col-xs-9 text-left">
            <p>{post.title}</p>
            <span>by {post.author} at {post.timeStamp}</span>
          </div>
          <div className="col-xs-2 text-right">{post.category}</div>
        </div>
      </div>
    );
  }
}

export default PostSnippet;
