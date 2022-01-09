import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollQuestion from './PollQuestion'

class QuestionPage extends Component {
  render() {
    const { id } = this.props
    return (
      <div>
        <PollQuestion id={id} />
        
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id,
    
  }
}

export default connect(mapStateToProps)(QuestionPage)