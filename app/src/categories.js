import React, { Component } from 'react';
import PostSnippet from './post-snippet';
import Post from './post';
import Modal from 'react-modal'

export const CATEGORY_ALL = 'CATEGORY_ALL'
export const CATEGORY_REACT = 'react'
export const CATEGORY_REDUX = 'redux'
export const CATEGORY_UDACITY = 'udacity'

export const SORT_BY_SCORE = 'voteScore'
export const SORT_BY_MOST_RECENT = 'timestamp'

class Categories extends Component {

  state = {
    categorySelected: CATEGORY_ALL,
    sortProp: SORT_BY_SCORE,
    postModalOpen: false,
    selectedPost: null,
  }

  openCategory = (categorySelected) => { this.setState(() => ({ categorySelected })) }
  sortPostBy = (sortProp) => { this.setState(() => ({ sortProp })) }

  openPostModal = (selectedPost) => {
    this.setState(() => ({
      postModalOpen: true,
      selectedPost
    }))
  }
  closePostModal = () => { this.setState(() => ({ postModalOpen: false })) }

  render() {
    const { posts } = this.props
    const { categorySelected, sortProp, postModalOpen} = this.state

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
                      <button
                        className="btn btn-default"
                        type="button">
                          Add Post
                      </button>
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
                    <button
                      key={post.id}
                      onClick={() => this.openPostModal(post)}>
                      <PostSnippet post={post} />
                    </button>
                  ))}
              </div>
            </div></div>

          </div>
        </div></div>

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          {postModalOpen && <Post post={this.state.selectedPost} />}
        </Modal>

      </div>
    );
  }
}

export default Categories;
