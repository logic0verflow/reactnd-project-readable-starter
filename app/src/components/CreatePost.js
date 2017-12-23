import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import { fetchCreatePost } from '../utils/api'

class CreatePost extends Component {

  state = {
    details: {
      title: '',
      author: '',
      body: '',
      category: '',
    }
  }

  onChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState(() => ({
      ...this.state,
      details: {
        ...this.state.details,
        [name]: value
      }
    }))
  }

  submitChanges() {
    fetchCreatePost(this.state.details)
    .then(details => console.log('Post submitted!', details) )
  }

  render() {
    const { title, author, body, category } = this.state.details

    const { categories } = this.props

    return (
      <div>

        <div className="row">

          <div className="col-xs-6 text-left">
            <Link to="/">
              <div className="btn btn-default">Back</div>
            </Link>
          </div>

          <div className="col-xs-6 text-right"></div>

        </div>

        <form>
          <div className="form-group">
            <label htmlFor="createPostTitle">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Enter Post Title"
              value={title}
              className="form-control"
              id="createPostTitle"
              onChange={(event) => this.onChange(event)} />
          </div>
          <div className="form-group">
            <label htmlFor="createPostAuthor">Author</label>
            <input
              id="createPostAuthor"
              name="author"
              type="text"
              placeholder="Post Author"
              value={author}
              className="form-control"
              onChange={(event) => this.onChange(event)} />
          </div>
          <div className="form-group">
            <label htmlFor="createPostBody">Body</label>
            <textarea
              id="createPostBody"
              name="body"
              placeholder="Post Body"
              value={body}
              className="form-control"
              onChange={(event) => this.onChange(event)} />
          </div>
          <div className="form-group">
            <label htmlFor="createPostCategory">Category</label>
            <select
              name="category"
              id="createPostCategory"
              className="form-control"
              value={category}
              onChange={this.onChange}
              >
              <option value="" disabled>-- Select a Category --</option>
              {categories.map(category => (
                <option value={category} key={category}>{category}</option>
              ))}
            </select>
          </div>
          <Link to="/" onClick={() => { this.submitChanges() }}>
            <div className="btn btn-default">Create Post</div>
          </Link>
        </form>

      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(CreatePost)
