import React, { Component } from 'react'
import PostSnippet from './post-snippet'
import ToggleDisplay from 'react-toggle-display';
import { addPost } from '../actions'
import { connect } from 'react-redux'


class Post extends Component {

  state = {
    beingModified: false,
    postChanges: {
      ...this.props.post
    }
  }

  toggleEdit = () => {
    const post = this.props.post
    this.setState(() => ({
      beingModified: !this.state.beingModified,
      postChanges: {
        ...post
      },
    }))
  }

  onTitleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState(() => ({
      postChanges: {
        ...this.props.post,
        [name]: value
      }
    }))
  }

  render() {
    const { beingModified , postChanges } = this.state
    const { submitPost, post } = this.props

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
                <p>{post.body}</p>
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
                <p>{postChanges.voteScore}</p>
              </div>

              <div className="col-xs-9 text-left">
                <div className="row">
                  <div className="col-xs-12">
                    <input
                    name="title"
                    type="text"
                    placeholder="Post Title"
                    value={postChanges.title}
                    onChange={(event) => this.onTitleChange(event)} /><br/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <p>by {postChanges.author} at {postChanges.timestamp}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <textarea
                      name="body"
                      placeholder="Post Body"
                      value={postChanges.body}
                      onChange={(event) => this.onTitleChange(event)} /><br/>
                  </div>
                </div>

              </div>

              <div className="col-xs-2 text-right">

              </div>
            </div>

            <button
              type="button"
              className="btn btn-default"
              onClick={() => {
                submitPost(this.state.postChanges)
                this.toggleEdit()
              }}>
                Submit
            </button>

          </form>
        </ToggleDisplay>

      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: (post) => dispatch(addPost(post))
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(Post)
