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
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import { fetchCategories } from '../utils/api'
import { toUpperFirstChar } from '../utils/helpers'
import MdRightArrow from 'react-icons/lib/md/keyboard-arrow-right'


export const SORT_BY_SCORE = 'voteScore'
export const SORT_BY_MOST_RECENT = 'timestamp'

class App extends Component {

  state = {
    categorySelected: CATEGORY_ALL,
    categorySubmitted: null,
    sortProp: SORT_BY_MOST_RECENT,
  }

  openCategory = (categorySelected) => { this.setState(() => ({ categorySelected }))}
  sortPostBy = (sortProp) => { this.setState(() => ({ sortProp }))}

  // function to handle changes to inputs i.e. sorting and filters
  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState(() => ({
      ...this.state,
      [name]: value,
    }))
  }

  submitCategory() {
    this.setState(() => ({
      ...this.state,
      categorySubmitted: this.state.categorySelected,
    }))
  }

  componentDidMount() {
    // get the categories available from the server and store in redux store
    fetchCategories().then(categories => {
      this.props.updateCategories(categories)

      let defaultCategory = CATEGORY_ALL
      let route = this.props.location.pathname
      if (this.props.categories.includes(route.replace('/',''))) {
        defaultCategory = route.replace('/','')
      }
      this.setState(() => ({
        ...this.state,
        categorySelected: defaultCategory
      }))
    })

  }

  render() {
    let { selectedPostID, categories } = this.props
    const { sortProp, categorySelected } = this.state

    let [,categoryURL,postIdURL] = this.props.location.pathname.split('/')

    let category = null
    let route = this.props.location.pathname
    // URL is at root i.e. no category selected or is viewing a specific category
    if (route === '/') {
      category = CATEGORY_ALL
    }
    else if (categories.includes(route.replace('/',''))) {
      category = route.replace('/','')
    }

    if (!selectedPostID) {
      selectedPostID = postIdURL
    }

    return (
      <div className="App container">


        <div className="row">
          <div className="col-xs-12">
            <header className="App-header">
              <h1 className="App-title">Readable</h1>
            </header>
          </div>
        </div>

        <Switch>


          {/***** Default app view, all post *****/}


          <Route exact path={ category === CATEGORY_ALL
            ? '/'
            : '/' + category}
            render={() => (
            <div>

              <div className="row"><div className="col-xs-12">
                <div className="posts-pane">

                  <div className="row"><div className="col-xs-12">
                      <div className="row posts-pane-menu">

                        <form>

                        {/* ***** Category Filter ***** */}
                          <div className="col-xs-4">
                            <label htmlFor="filterByCategory">Category</label>
                            <div className="input-group">

                              <select
                                name="categorySelected"
                                className="form-control"
                                value={categorySelected}
                                onChange={this.handleChange}>
                                {categories.map((category) => (
                                  <option value={category} key={category}>
                                    {toUpperFirstChar(category)}
                                  </option>
                                ))}
                              </select>

                              <span className="input-group-btn">
                                <Link to={ categorySelected === CATEGORY_ALL
                                  ? "/"
                                  : "/" + categorySelected }
                                  onClick={() => this.submitCategory()}>
                                  <button
                                    className="btn btn-default"
                                    type="button">
                                    <MdRightArrow />
                                  </button>
                                </Link>
                              </span>

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
                    <ListPosts
                      categorySelected={ category }
                      sortProp={sortProp}/>
                  </div></div>

                </div>
              </div></div>
            </div>
          )}/>


          {/***** Single Post View *****/}


          <Route exact path={"/" + categoryURL + "/" + postIdURL} render={() => (
            <div>
              <Post
                id={postIdURL}
              />
            </div>
          )}/>


          {/***** EDIT Single Post View *****/}


          <Route path={"/" + categoryURL + "/" + postIdURL + "/edit"} render={() => (
            <div>
              <h1>Editing Post</h1>
              <EditPost id={postIdURL} />
            </div>
          )}/>


          {/***** DELETE Single Post View *****/}


          <Route path={"/" + categoryURL + "/" + postIdURL + "/delete"} render={() => (
            <div>
              <DeletePost id={postIdURL} />
            </div>
          )}/>


          {/***** Create new post *****/}


          <Route path="/create-post" render={() => (
            <div>
              <h1>Create Post</h1>
              <CreatePost />
            </div>
          )}/>

          <Route path="/" render={() => (
            <div>
              <h1>404 Page Not Found</h1>
            </div>
          )}/>

        </Switch>

      </div>

    )
  }
}

function mapStateToProps ({ selectedPostID, selectedPostCategory, categories, otherCategories}) {
  return {
    selectedPostID,
    selectedPostCategory,
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
