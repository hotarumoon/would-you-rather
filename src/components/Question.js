import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Question extends Component {

  handleViewPoll = (e) => {
    e.preventDefault()
    console.log("Handle View Poll")
    const { question } = this.props

    return <Redirect to={`/pollResult/${question.id}`}  />
  }
  
  render() {
    const { question } = this.props
    console.log("this.props",this.props)
    if (question === null) {
      return <p>This Question doesn't existd</p>
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
            {this.props.showVotes? <div style={{  "border-left":" 2px solid #D3D3D3", "height": "150px", "float":"right", "display":"flex", "alignContent":"stretch"}}>  Score: {optionOne.votes.length +optionTwo.votes.length }</div> : null}
          
            <p>Would you rather: </p>
            <p>{optionOne.text} {this.props.showVotes && optionOne.votes.length}</p> 
            <p>OR</p> 
             <p>{optionTwo.text} {this.props.showVotes && optionTwo.votes.length}</p>
          
            <button  className='btn' onClick={this.handleViewPoll} >View poll</button>
          </div>
        </div>
      </Link>
    
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id,  showVotes }) {
  const question = questions[id]
  return {
    authedUser,
    users,
    question: question,
    showVotes: showVotes,
     
  }
}

export default withRouter(connect(mapStateToProps)(Question))