import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSubmitAnswer } from '../actions/questions'
import NotFound from './NotFound'
import PollResults from './PollResults'

class PollQuestion extends Component {
  state = {
    answer:'', 
    toPollResults: false,
  }
 
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, question, authedUser } = this.props

    dispatch(handleSubmitAnswer({
    qid: question.id,
    authedUser,
    answer: this.state.answer === '' ? "optionOne" : this.state.answer,
    }))
    this.setState({toPollResults: true})
  }
  
  handleChange = (e) =>{
    console.log("handle radio change", e)
    this.setState({answer: e.target.value})
  }
 
  render() {
    const { question } = this.props
    console.log("this.props",this.props)
    if (question === null || question === undefined) {
      return <NotFound/>
    }

    const {toPollResults} = this.state
    if (toPollResults === true) {
      return <PollResults id={this.props.question.id} />
    }

    const { author, optionOne,optionTwo } = question
    const avatarURL = this.props.users[author].avatarURL
    console.log(avatarURL)

    return (
      <div className='tweet'>
        <img
          src={ avatarURL}
          alt={`Avatar of ${author}`}
          classauthor='avatar'
          style={{height: '50px', width: '50px', paddingRight: '20 px', paddingLeft: '20px', paddingTop: '20px'}}
        />
        <div classauthor='tweet-info'>
          <div style={{paddingRight: '20 px', paddingLeft: '30px'}}>
            <p><b> {author} asks:</b></p>
           
            <p>Would you rather: </p>
            <label className="miro-radiobutton">
            <input type="radio" value={"optionOne"} name="radio" onChange={this.handleChange}/>
            <span>{optionOne.text}</span>
            </label>
            <br></br>
            <label className="miro-radiobutton">
            <input type="radio" value={"optionTwo"} name="radio" onChange={this.handleChange}/>
            <span>{optionTwo.text}</span>
            </label>
            <br></br>
           
            <button  className='btn' onClick={this.handleSubmit} >SUBMIT</button>
          </div>
        </div>
      </div>
    
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

export default withRouter(connect(mapStateToProps)(PollQuestion))