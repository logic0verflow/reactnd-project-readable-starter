import React, { Component } from 'react'
import PostSnippet from './post-snippet'
import ToggleDisplay from 'react-toggle-display';


class Post extends Component {

  state = {
    beingModified: false
  }

  toggleEdit = () => {
    this.setState(() => ({
      beingModified: !this.state.beingModified
    }))
  }

  render() {
    const post = this.props.post
    const { body } = post
    const { beingModified } = this.state

    return (
      <div>


        {/* ***** Post Menu ***** */}


        <div className="row">
          <div className="col-xs-12 text-right">
            <button type="button" className="btn btn-default">Delete</button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => { this.toggleEdit() }}>
                Edit
            </button>
          </div>
        </div>


        {/* ***** Normal Post View ***** */}


        <ToggleDisplay show={!this.state.beingModified}>
          <div className="post-snippet">
            <div className="row">
              <div className="col-xs-1"><p>{post.voteScore}</p></div>
              <div className="col-xs-9 text-left">
                <p>{post.title}</p>
                <p>by {post.author} at {post.timestamp}</p>
                <p>{body}</p>
              </div>
              <div className="col-xs-2 text-right">{post.category}</div>
            </div>
          </div>
        </ToggleDisplay>


        {/* ***** Editing Post View ***** */}


        <ToggleDisplay show={this.state.beingModified}>
          <form className="post-snippet">
            <div className="row">

              <div className="col-xs-1">
                <p>{post.voteScore}</p>
              </div>

              <div className="col-xs-9 text-left">
                <input type="text" name="post-title" placeholder="Post Title"/><br/>
                <p>by {post.author} at {post.timestamp}</p>
                <input type="text" name="post-body" placeholder="Post Body"/><br/>
              </div>

              <div className="col-xs-2 text-right">
                <input type="text" name="post-category" placeholder="Post Category"/><br/>
              </div>
            </div>

          </form>
        </ToggleDisplay>

      </div>
    )
  }
}

export default Post
