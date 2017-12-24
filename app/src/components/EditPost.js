import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'
import {
  fetchPostDetails,
  fetchSubmitPost,
} from '../utils/api'

class EditPost extends Component {

  // When creating the component ensure there are state values the component
  // can use while mounting
  constructor(props) {
    super(props)
    this.state = {
      originalDetails: {title: '', body: '', voteScore: 0, },
      modifiedDetails: {title: '', body: ''},
    }
  }

  // Get and set the details of the post, store the original details and the
  // modified version that gets submitted to the server
  getPostDetails() {
    fetchPostDetails(this.props.id)
    .then(details => this.setState(() => ({
      ...this.state,
      originalDetails: {...details},
      modifiedDetails: {...details},
    })))
  }

  componentDidMount() {
    this.getPostDetails()
  }

  submitChanges() {
    fetchSubmitPost(this.props.id, this.state.modifiedDetails)
  }

  onChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState(() => ({
      ...this.state,
      modifiedDetails: {
        ...this.state.modifiedDetails,
        [name]: value
      }
    }))
  }

  render() {
    const { modifiedDetails, originalDetails } = this.state
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
            <Link to={"/delete-post-" + this.props.id}>
              <div className="btn btn-default">Delete</div>
            </Link>

            <Link to={"/post/" + this.props.id}>
              <div className="btn btn-default">Edit</div>
            </Link>
          </div>

        </div>

        <form className="post-snippet">
          <div className="row">

            <div className="col-xs-1">
              <VoteScore postid={originalDetails.id} voteScore={originalDetails.voteScore}/>
            </div>

            <div className="col-xs-9 text-left">
              <div className="form-group">
                <label htmlFor="editPostTitle">Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Enter Post Title"
                  value={modifiedDetails.title}
                  className="form-control"
                  id="editPostTitle"
                  onChange={(event) => this.onChange(event)} />
              </div>
              <div className="form-group">
                <label htmlFor="editPostBody">Body</label>
                <textarea
                  id="editPostBody"
                  name="body"
                  placeholder="Post Body"
                  value={modifiedDetails.body}
                  className="form-control"
                  onChange={(event) => this.onChange(event)} />
              </div>
            </div>

            <div className="col-xs-2 text-right">

            </div>
          </div>

          <Link to={"/post/" + this.props.id} onClick={() => { this.submitChanges() }}>
            <div className="btn btn-default">Submit</div>
          </Link>

        </form>
      </div>
    )
  }
}

export default EditPost
