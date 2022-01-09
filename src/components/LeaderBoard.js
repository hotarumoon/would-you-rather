import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
 
class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Would You Rather App</h3>
        <ul className='dashboard-list'>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id} showVotes={true}/>
              
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => (questions[b].optionOne.votes.length + questions[b].optionTwo.votes.length) - (questions[a].optionOne.votes.length + questions[a].optionTwo.votes.length))
  }
}

export default connect(mapStateToProps)(LeaderBoard)