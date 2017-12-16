import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { addPost } from '../actions'
import PostSnippet from './post-snippet';
import Post from './post';
import ListPosts from './ListPosts'
import { Route, Link, withRouter } from 'react-router-dom'

export const CATEGORY_ALL = 'CATEGORY_ALL'
export const CATEGORY_REACT = 'react'
export const CATEGORY_REDUX = 'redux'
export const CATEGORY_UDACITY = 'udacity'

export const SORT_BY_SCORE = 'voteScore'
export const SORT_BY_MOST_RECENT = 'timestamp'

class App extends Component {

  state = {
    categorySelected: CATEGORY_ALL,
    sortProp: SORT_BY_MOST_RECENT,
  }


  openCategory = (categorySelected) => {this.setState(() => ({ categorySelected }))}
  sortPostBy = (sortProp) => { this.setState(() => ({ sortProp }))}


  render() {
    const { selectedPostID } = this.props
    const { categorySelected, sortProp} = this.state

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


                    {/* ***** Category Filter ***** */}


                    <div className="col-xs-4 text-center">
                      <div className="row">
                        <div className="col-xs-6 text-right">
                          <p>Category</p>
                        </div>

                        <div className="col-xs-6 text-left">
                          <div className="btn-group-vertical" role="group">
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.openCategory(CATEGORY_ALL)}>
                                All
                            </button>
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.openCategory(CATEGORY_REACT)}>
                                React
                            </button>
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.openCategory(CATEGORY_REDUX)}>
                                Redux
                            </button>
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.openCategory(CATEGORY_UDACITY)}>
                                Udacity
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* ***** Sort Method ***** */}


                    <div className="col-xs-4">
                      <div className="row">

                        <div className="col-xs-6 text-right">
                          <p>Sort By</p>
                        </div>

                        <div className="col-xs-6 text-left">
                          <div className="btn-group-vertical" role="group">
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.sortPostBy(SORT_BY_SCORE)}>
                                Highest Score
                            </button>
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.sortPostBy(SORT_BY_MOST_RECENT)}>
                                Most Recent
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>


                    {/* ***** Add Post Button ***** */}


                    <div className="col-xs-4 text-right">
                      <div className="row"><div className="col-xs-12">
                      <Link to="/edit-post">
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


        <Route path={"/post-" + selectedPostID} render={() => (
          <div>
          <h1>post</h1>
          <Post id={selectedPostID}/>
          </div>
        )}/>


        <Route path="/edit-post" render={() => (<h1>edit</h1>)}/>

      </div>

    )
  }
}

function mapStateToProps ({ allPost, selectedPostID}) {
  return {
    allPost: Object.values(allPost),
    selectedPostID
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: (data) => dispatch(addPost(data)),
  }
}

// Using withRouter to fix/improve compatibility between react-router-dom and
// react-redux. Suggestion found at the link below
// https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
