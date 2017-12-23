import React, { Component } from 'react'
import MdUpArrow from 'react-icons/lib/md/keyboard-arrow-up'
import MdDownArrow from 'react-icons/lib/md/keyboard-arrow-down'
import { fetchVoteScore } from '../utils/api'

export const UP_VOTE = 'upVote'
export const DOWN_VOTE = 'downVote'

class VoteScore extends Component {

  state = {
    voteScore: null,
  }

  updateVoteScore(vote) {
    fetchVoteScore(this.props.itemType, this.props.id, vote)
    .then(post => this.setState(() => ({
      ...this.state,
      voteScore: post.voteScore
    })))
  }

  render() {

    const voteScore = this.state.voteScore
      ? this.state.voteScore
      : this.props.voteScore

    return (
      <div>
        <button type="button" onClick={() => { this.updateVoteScore(UP_VOTE) }}>
          <MdUpArrow />
        </button>
        <br/>
        <span className="voteScore">{voteScore}</span>
        <br/>
        <button type="button" onClick={() => { this.updateVoteScore(DOWN_VOTE) }}>
          <MdDownArrow />
        </button>
      </div>
    )
  }
}

export default VoteScore
