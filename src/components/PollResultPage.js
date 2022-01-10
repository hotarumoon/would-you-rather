import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollResults from './PollResults'

class PollResultPage extends Component {
  render() {
    console.log("Poll ResultsPage")
    const { id } = this.props
    return (
      <div>
        <PollResults id={id} />
        
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

export default connect(mapStateToProps)(PollResultPage)