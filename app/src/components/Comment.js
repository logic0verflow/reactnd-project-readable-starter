import React, { Component } from 'react'
import { connect } from 'react-redux'
import VoteScore from './VoteScore'
import ToggleDisplay from 'react-toggle-display'
import {
  fetchEditComment,
  fetchDeleteComment
} from '../utils/api'
import {
  replaceComment,
  removeComment
} from '../actions'

class Comment extends Component {

  state = {
    beingModified: false,
    modifiedDetails: {
      body: '',
    }
  }

  // submit changes to the server when a comment has been edited and store
  // changes in the redux store
  submitChanges() {
    fetchEditComment(this.props.details.id, this.state.modifiedDetails)
    .then(details => this.props.updateComment(details))
  }

  // submit delete operation to the server and remove the comment from the store
  submitDelete() {
    fetchDeleteComment(this.props.details.id)
    .then(details => this.props.deleteComment(details.id))
  }

  // function to handle form changes of comments
  handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState(() => ({
      ...this.state,
      modifiedDetails: {
        ...this.state.modifiedDetails,
        [name] : value
      },
    }))
  }

  // Used to toggle the state of editing, hides and shows the new comment form
  toggleEdit() {
    this.setState(() => ({
      ...this.state,
      beingModified: !this.state.beingModified,
      modifiedDetails: {...this.props.details}
    }))
  }

  render() {

    const { id, timestamp, body, author, voteScore } = this.props.details

    return (
      <div className="post-snippet">
        <div className="row">

          {/* View of the comment details and the form if editing */}

          <div className="col-xs-1">
            <VoteScore itemType="comments" id={id} voteScore={voteScore}/>
          </div>

          <div className="col-xs-8 text-left">

            <ToggleDisplay show={this.state.beingModified}>
              <form>
                <div className="form-group">
                <textarea
                  name="body"
                  placeholder="Enter comment"
                  value={this.state.modifiedDetails.body}
                  className="form-control"
                  onChange={(event) => this.handleChange(event)} />
                </div>
              </form>
            </ToggleDisplay>

            <ToggleDisplay show={!this.state.beingModified}>
              <p>{body}</p>
            </ToggleDisplay>

            <p>by {author} at {new Date(timestamp).toLocaleString()}</p>
          </div>


          {/* Comment menu section */}


          <div className="col-xs-3 text-right">

            <ToggleDisplay show={!this.state.beingModified}>
              <input type="button" className="btn btn-default" value="Delete"
                onClick={() => this.submitDelete()}/>
              <input type="button" className="btn btn-default" value="Edit"
                onClick={() => this.toggleEdit()}/>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.beingModified}>
              <input type="button" className="btn btn-default" value="Delete"
                onClick={() => this.submitDelete()}/>
              <input type="button" className="btn btn-default" value="Submit"
                onClick={() => {
                  this.toggleEdit()
                  this.submitChanges()
                }}/>
              <input type="button" className="btn btn-default" value="Cancel"
                onClick={() => this.toggleEdit()}/>

            </ToggleDisplay>

          </div>

        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (data) => dispatch(replaceComment(data)),
    deleteComment: (data) => dispatch(removeComment(data))
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(Comment)
