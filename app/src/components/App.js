import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { addPost } from '../actions'

import Categories from './categories';
import Post from './post';

class App extends Component {
  state = {
    createPostModalOpen: false
  }

  render() {
    const { allPost } = this.props
    return (
      <div className="App container">
        <div className="row">
          <div className="col-xs-12">
            <header className="App-header">
              <h1 className="App-title">Readable</h1>
            </header>
          </div>
        </div>

        { /* <Categories posts={allPost} /> */ }

        <Post post={allPost[0]} />

      </div>
    );

  }
}

function mapStateToProps ({ allPost }) {
  return {
    allPost: Object.values(allPost)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
