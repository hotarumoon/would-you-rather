import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChange1 = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }
  handleChange2 = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText , id))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if(this.props.authedUser === null ||this.props.authedUser === "loggedOut" ){
      return <Redirect to='/logOut' />
    }
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      this.props.authedUser === "loggedOut" ?  null : (
      <div>
        <h3 className='center'>Create New Question</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <p style={{ paddingBottom: '10px'}}>Complete the question, Would you rather...</p>
          <textarea style={{height: '60px'}}
            placeholder="Enter option one text here"
            value={optionOneText}
            onChange={this.handleChange1}
            className='textarea'
            maxLength={280}
          />
          <p style={{"textAlign": "center", paddingBottom: '10px', paddingTop: '10px'}}>OR</p>
           <textarea style={{height: '60px'}}
            placeholder="Enter option two text here"
            value={optionTwoText}
            onChange={this.handleChange2}
            className='textarea'
            maxLength={280}
          />
          
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === '' || optionOneText === optionTwoText}>
              Submit
          </button>
        </form>
      </div>
      )
    )
  }
}


function mapStateToProps ({authedUser}) {
  return {
    authedUser,
  
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
