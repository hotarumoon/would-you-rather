import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Question extends Component {
  state={
    goToPollResult: false,
  }

  handleViewPoll = (e) => {
    e.preventDefault()
    console.log("Handle View Poll")
    this.setState({goToPollResult: true})
    
  }
  
  render() {
    const { question } = this.props
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const {goToPollResult} = this.state
    if (goToPollResult === true) {
      return <Redirect to={`/questions/${question.id}`}  />
    }
  
    const { author, optionOne,optionTwo, id } = question
    const avatarURL = this.props.users[author].avatarURL
    
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
            {this.props.showVotes? <div style={{  "border-left":" 2px solid #D3D3D3", "height": "150px", "float":"right", "display":"flex", "alignContent":"stretch"}}>  Score: {optionOne.votes.length +optionTwo.votes.length }</div> : null}
          
            <p>Would you rather: </p>
            <p>{optionOne.text} {this.props.showVotes && optionOne.votes.length}</p> 
            <p>OR</p> 
             <p>{optionTwo.text} {this.props.showVotes && optionTwo.votes.length}</p>
             <Link to={`/questions/${id}`}>
              <button  className='btn' onClick={this.handleViewPoll} >View poll</button>
            </Link>
          </div>
        </div>
      </div>
    
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