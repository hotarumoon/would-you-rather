import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    selectedUser: '',
    toHome: false,
  }
  

  handleChange = (e) => {
    console.log("handleChange")
    console.log("this.state before", this.state)
    this.setState({selectedUser: e.target.value})
  }

  handleSignIn = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    let usersArr = Object.entries(this.props.users);
    let firstUser = usersArr[0][1].id;
    let user = this.state.selectedUser === null || this.state.selectedUser === undefined || this.state.selectedUser === '' ? firstUser : this.state.selectedUser
    console.log(user)
    dispatch(setAuthedUser(user))
    this.setState({toHome: true})
  }  
  
  
  render() {
    const {toHome} = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    const options = [];
    let usersArr = Object.entries(this.props.users);
   
  
    console.log("usersArr", usersArr)
    for(var i = 0; i < usersArr.length; i++) {
      var obj = {};
      obj['value'] = usersArr[i][1].id;
      obj['label'] = usersArr[i][1].name;
      options.push(obj);
 
    }

    return (
      <div  className='tweet' style={{"margin": "auto",
        "width": "60%",
        "border": "5px solid #dad7d7",
        "padding": "10px"}}>
      <div style={{"width":'300px', "alignContent":"center"}}>
        <p>Welcome to the Would You Rather App</p>
        <br/>
        
        <p>Press Sign in to continue after selecting the user</p>
        
      <select onChange={this.handleChange}>
          {options.map(({ value, label }, index) => <option value={value} key={value}>{label}</option>)}
      </select>
      <button className='btn' onClick={this.handleSignIn} >Sign In</button>
      </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users}) {
  return {
    authedUser,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Login))