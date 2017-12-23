import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { refreshCategories } from '../actions'
import { CATEGORY_ALL } from '../reducers'
import Post from './post';
import ListPosts from './ListPosts'
import EditPost from './EditPost'
import DeletePost from './DeletePost'
import CreatePost from './CreatePost'
import { Route, Link, withRouter } from 'react-router-dom'
import { fetchCategories } from '../utils/api'

export const SORT_BY_SCORE = 'voteScore'
export const SORT_BY_MOST_RECENT = 'timestamp'

class App extends Component {

  state = {
    categorySelected: CATEGORY_ALL,
    sortProp: SORT_BY_MOST_RECENT,
  }

  openCategory = (categorySelected) => { this.setState(() => ({ categorySelected }))}
  sortPostBy = (sortProp) => { this.setState(() => ({ sortProp }))}


  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState(() => ({
      ...this.state,
      [name]: value,
    }))
  }

  componentDidMount() {
    fetchCategories().then(categories => this.props.updateCategories(categories))
  }

  render() {
    const { selectedPostID, categories } = this.props
    const { categorySelected, sortProp } = this.state

    return (
      <div className="App container">


        <div className="row">
          <div className="col-xs-12">
            <header className="App-header">
              <h1 className="App-title">Readable</h1>
            </header>
          </div>
        </div>


        {/***** Default app view with all post visible *****/}


        <Route exact path="/" render={() => (
          <div>
          <h1>root</h1>

          <div className="row"><div className="col-xs-12">

            <div className="posts-pane">

              <div className="row"><div className="col-xs-12">

                  <div className="row posts-pane-menu">


                    <form>

                    {/* ***** Category Filter ***** */}
                      <div className="col-xs-4">
                        <div className="form-group">
                          <label htmlFor="filterByCategory">Category</label>
                          <select
                            name="categorySelected"
                            className="form-control"
                            value={categorySelected}
                            onChange={this.handleChange}>
                            {categories.map((category) => (
                              <option value={category} key={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* ***** Sort Method ***** */}
                      <div className="col-xs-4">
                        <div className="form-group">
                          <label htmlFor="sortBy">Sort By</label>
                          <select
                            name="sortProp"
                            className="form-control"
                            value={sortProp}
                            onChange={this.handleChange}
                            >
                            <option value={SORT_BY_MOST_RECENT}>Most Recent</option>
                            <option value={SORT_BY_SCORE}>Highest Score</option>
                          </select>
                        </div>
                      </div>
                    </form>

                    {/* ***** Add Post Button ***** */}


                    <div className="col-xs-4 text-right">
                      <div className="row"><div className="col-xs-12">
                      <Link to="/create-post">
                        <button
                          className="btn btn-default">
                            Add Post
                        </button>
                      </Link>
                      </div></div>
                    </div>

                  </div>

              </div></div>


              {/* ***** Post Snippet Section ***** */}


              <div className="row"><div className="col-xs-12">
                <ListPosts categorySelected={categorySelected} sortProp={sortProp}/>
              </div></div>

            </div>
          </div></div>
          </div>
        )}/>


        {/***** Single Post View *****/}


        <Route path={"/post"} render={() => (
          <div>
            <h1>post</h1>
            <Post
              route={this.props}
              id={
                /* If a post wasn't selected, try obtaining the id from URL */
                selectedPostID
                ? selectedPostID
                : this.props.location.pathname.replace('/post/','')}
              beingModified={false}
            />
          </div>
        )}/>


        {/***** EDIT Single Post View *****/}


        <Route path={`/edit-post-${selectedPostID}`} render={() => (
          <div>
            <h1>edit post</h1>
            <EditPost id={selectedPostID} />
          </div>
        )}/>


        {/***** DELETE Single Post View *****/}


        <Route path={`/delete-post-${selectedPostID}`} render={() => (
          <div>
            <h1>delete post</h1>
            <DeletePost id={selectedPostID} />
          </div>
        )}/>


        {/***** Create new post *****/}


        <Route path="/create-post" render={() => (
          <div>
            <h1>Create Post</h1>
            <CreatePost />
          </div>
        )}/>

      </div>

    )
  }
}

function mapStateToProps ({ selectedPostID, categories, otherCategories}) {
  return {
    selectedPostID,
    categories: [...categories, ...otherCategories]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategories: (data) => dispatch(refreshCategories(data)),
  }
}

// Using withRouter to fix/improve compatibility between react-router-dom and
// react-redux. Suggestion found at the link below
// https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
