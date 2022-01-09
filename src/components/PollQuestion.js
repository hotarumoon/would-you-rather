import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleSubmitAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class PollQuestion extends Component {
    state = {
        answer:'', 
        toHome: false,
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
        this.setState({toHome: true})
  }
  
  handleChange = (e) =>{
      console.log("handle radio change", e)
      this.setState({answer: e.target.value})

  }
 
  render() {
    const { question } = this.props
    console.log("this.props",this.props)
    if (question === null) {
      return <p>This Question doesn't existd</p>
    }

    const {toHome} = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }

    const { author, optionOne,optionTwo, id } = question
    const avatarURL = this.props.users[author].avatarURL
    console.log(avatarURL)
    return (
    
      <Link to={`/question/${id}`} className='tweet'>
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
            <input type="radio" value={"optionOne"} name="radio" checked onChange={this.handleChange}/>
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

export default withRouter(connect(mapStateToProps)(PollQuestion))