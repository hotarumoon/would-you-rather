import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleSubmitAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import ProgressBar from './ProgressBar'

class PollResults extends Component {
    state = {
        answer: '', 
        showYourVote1: false,
        showYourVote2: false,
    }
 
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("Handle handleSubmit")
        const { dispatch, question, authedUser } = this.props

        dispatch(handleSubmitAnswer({
        qid: question.id,
        authedUser,
        answer: this.state.answer === '' ? "optionOne": this.state.answer,
        users: this.state.users
        }))

        return <Redirect to={`/questions/${question.id}`}  />
  }
  
  handleChange = (e) =>{
      console.log("handle radio change", e)
      this.setState({answer: e.target.value})

  }

  render() {
    var showYourVote1 = false;
    var showYourVote2 = false;
    console.log("this.state", this.state)
    const { question } = this.props
    console.log("this.props",this.props)
    if (question === null) {
      return <p>This Question doesn't existd</p>
    }

    const { author, optionOne,optionTwo, id } = question
    const avatarURL = this.props.users[author].avatarURL

   
    const progressOne = Math.floor(optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length) * 100);
    const progressTwo = Math.floor(optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length) * 100);
    const progressBarData = [
      { bgcolor: "#6a1b9a", completed: Number.isNaN(progressOne) ? 0 :  progressOne},
      { bgcolor: "#00695c", completed:  Number.isNaN(progressTwo) ? 0 : progressTwo},
    ];
    if(this.props.question.optionOne.votes.find(a => a === this.props.authedUser)){
      showYourVote1=true
      showYourVote2= false
    } else{
      showYourVote1=false
      showYourVote2=true
    }
   
    return (
  
      <Link to={`/pollResult/${id}`} className='tweet'>
        <img
          src={ avatarURL}
          alt={`Avatar of ${author}`}
          classauthor='avatar'
          style={{height: '50px', width: '50px', paddingRight: '20 px', paddingLeft: '20px', paddingTop: '30px'}}
        />
        <div >
          <div style={{"marginLeft": "10px"}}>
            <p><b> Asked by {author} </b></p>
           
            <p>Results: </p>
            <div style={showYourVote1? {"border": "3px solid green", "marginBottom": "20px"} : null}>
            <span style={{"display": showYourVote1? "block": "none", "color": "green", "marginBottom": "10px","marginTop": "10px"}}>You have voted first option</span>
            <div style={ {"border": "1px solid #dad7d7", "width":"500px", "marginBottom":"20px"}} >
               <span style={{"marginBottom": "20px"}}>{optionOne.text}</span>
               <ProgressBar key={0} bgcolor={progressBarData[0].bgcolor} completed={progressBarData[0].completed} />
               <span>{optionOne.votes.length} out of {(optionOne.votes.length + optionTwo.votes.length)} votes </span>
            </div>
            </div>
            <div style={showYourVote2? {"border": "3px solid green", "marginTop": "20px"} : null}>
            <span style={{"display": showYourVote2? "block": "none", "color": "green", "marginBottom": "10px","marginTop": "10px"}}>You have voted second option</span>
            <div style={ {"border": "1px solid #dad7d7", "width":"500px"}} >
               
               <span style={{"marginBottom": "20px"}}>{optionTwo.text}</span>
               <ProgressBar key={1} bgcolor={progressBarData[1].bgcolor} completed={progressBarData[1].completed} />
               <span>{optionTwo.votes.length} out of {(optionOne.votes.length + optionTwo.votes.length)} votes </span>
            </div>
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