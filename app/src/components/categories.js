import React, { Component } from 'react';
import PostSnippet from './post-snippet';
//import Modal from 'react-modal'

export const CATEGORY_ALL = 'CATEGORY_ALL'
export const CATEGORY_REACT = 'react'
export const CATEGORY_REDUX = 'redux'
export const CATEGORY_UDACITY = 'udacity'

export const SORT_BY_SCORE = 'voteScore'
export const SORT_BY_MOST_RECENT = 'timestamp'

class Categories extends Component {

  state = {
    categorySelected: CATEGORY_ALL,
    sortProp: SORT_BY_SCORE
  }

  openCategory = (category) => {
    this.setState(() => ({
      categorySelected: category
    }))
  }

  sortPostBy = (prop) => {
    this.setState(() => ({
      sortProp: prop
    }))
  }

  render() {
    const { posts } = this.props
    const { categorySelected, sortProp} = this.state

    return (
      <div className="category">
        <div className="row"><div className="col-xs-12">
          <h2 className="title">Categories</h2>
        </div></div>

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
                              Score
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
                      <button className="btn btn-default" type="button">Add Post</button>
                    </div></div>
                  </div>

                </div>

            </div></div>


            {/* ***** Post Snippet Section ***** */}


            <div className="row"><div className="col-xs-12">
              <div className="post-snippets">
                { posts.filter(post =>
                    post.category === categorySelected
                    || categorySelected === CATEGORY_ALL)
                  .sort((a,b) => {
                    if (a[sortProp] < b[sortProp]) return -1
                    else if (a[sortProp] > b[sortProp]) return 1
                    else return 0
                  })
                  .reverse()
                  .map((post) => (
                    <PostSnippet post={post} key={post.id}/>
                  ))}
              </div>
            </div></div>

          </div>
        </div></div>
      </div>
    );
  }
}

export default Categories;
