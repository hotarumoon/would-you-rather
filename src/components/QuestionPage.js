import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollQuestion from './PollQuestion'
import NotFound from './NotFound'
import PollResults from './PollResults'

class QuestionPage extends Component {
  render() {
    console.log("QuestionPage")
    const { id, authedUser } = this.props
    const question = this.props.questions[id];
    const answered = !!this.props.users[authedUser].answers[id];
   
      
// this.props.authedUser === "loggedOut" 
    if(!question)
      return <NotFound/>
    else if(answered)
      return  <PollResults id={id} />
    else 
      return <PollQuestion id={id}/>
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id: id,
    authedUser: authedUser,
    questions: questions,
    users: users,
  }
}

export default connect(mapStateToProps)(QuestionPage)