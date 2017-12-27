import React, { Component } from 'react'
import { addComment, toggleCommentForm } from '../actions'
import { connect } from 'react-redux'
import { fetchCreateComment } from '../utils/api'


class CreateComment extends Component {

  state = {
    body: '',
    author: '',
  }

  // submit the new comment to the server and add to the store, reset form
  submitComment() {
    const comment = {
      author: this.state.author,
      body: this.state.body,
      parentId: this.props.parentID,
    }

    fetchCreateComment(comment)
    .then(details => this.props.addCommentToPost(details))

    this.setState(() => ({
      ...this.state,
      body: '',
      author: '',
    }))
    this.props.closeCommentForm()
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState(() => ({
      ...this.state,
      [name]: value,
    }))
  }

  render() {

    const { body, author } = this.state

    return (
        <div className="post-snippet">
          <div className="row">

            <div className="col-xs-1"></div>

            <div className="col-xs-9 text-left">
              <form>
                <div className="form-group">
                  <label htmlFor="createCommentAuthor">Author</label>
                  <input
                    name="author"
                    type="text"
                    placeholder="Enter Author"
                    value={author}
                    className="form-control"
                    id="createCommentAuthor"
                    onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                  <label htmlFor="createCommentBody">Comment</label>
                  <textarea
                    name="body"
                    placeholder="Enter comment"
                    value={body}
                    className="form-control"
                    id="createCommentBody"
                    onChange={(event) => this.handleChange(event)} />
                </div>
              </form>
            </div>

            <div className="col-xs-2 text-right">
              <button
                type="button"
                className="btn btn-default"
                onClick={() => this.submitComment()}
              >
                Submit
              </button>
            </div>

          </div>
        </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCommentToPost: (data) => dispatch(addComment(data)),
    closeCommentForm: () => dispatch(toggleCommentForm())
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(CreateComment)
