import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleSubmitAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import ProgressBar from './ProgressBar'

class PollResults extends Component {
    state = {
        answer:'', 
    }
 
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("Handle handleSubmit")
        const { dispatch, question, authedUser } = this.props

        dispatch(handleSubmitAnswer({
        qid: question.id,
        authedUser,
        answer: this.state.answer === '' ? "optionOne": this.state.answer,
        }))

        return <Redirect to={`/question/${question.id}`}  />
  }
  
  handleChange = (e) =>{
      console.log("handle radio change", e)
      this.setState({answer: e.target.value})

  }
 
  render() {
    const { question } = this.props
    console.log("POLL RESULTS")
    console.log("this.props",this.props)
    if (question === null) {
      return <p>This Question doesn't existd</p>
    }

    const { author, optionOne,optionTwo, id } = question
    const avatarURL = this.props.users[author].avatarURL
    console.log(avatarURL)

    const progressOne = optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length) * 100
    const progressTwo = optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length) * 100
    const progressBarData = [
      { bgcolor: "#6a1b9a", completed: Number.isNaN(progressOne) ? 0 :  progressOne},
      { bgcolor: "#00695c", completed:  Number.isNaN(progressTwo) ? 0 : progressTwo},
    ];

    return (
  
      <Link to={`/pollResult/${id}`} className='tweet'>
        <img
          src={ avatarURL}
          alt={`Avatar of ${author}`}
          classauthor='avatar'
          style={{height: '50px', width: '50px', paddingRight: '20 px', paddingLeft: '20px', paddingTop: '20px'}}
        />
        <div >
          <div >
            <p><b> Asked by {author} </b></p>
           
            <p>Results: </p>
            <div style={ {"border": "1px solid #dad7d7", "width":"500px", "marginBottom":"20px"}} >
               <span style={{"marginBottom": "20px"}}>{optionOne.text}</span>
               <ProgressBar key={0} bgcolor={progressBarData[0].bgcolor} completed={progressBarData[0].completed} />
               <span>{optionOne.votes.length} out of {(optionOne.votes.length + optionTwo.votes.length)} votes </span>
            </div>
            <div style={ {"border": "1px solid #dad7d7", "width":"500px"}} >
               <span style={{"marginBottom": "20px"}}>{optionTwo.text}</span>
               <ProgressBar key={1} bgcolor={progressBarData[1].bgcolor} completed={progressBarData[1].completed} />
               <span>{optionTwo.votes.length} out of {(optionOne.votes.length + optionTwo.votes.length)} votes </span>
            </div>
  
          </div>
        </div>
      </Link>
    
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  return {
    authedUser,
    users,
    question: question,
  }
}

export default withRouter(connect(mapStateToProps)(PollResults))