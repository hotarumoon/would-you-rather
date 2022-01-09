import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LogOut extends Component {
  state = {
    selectedUser: '',
    toHome: false,
  }

  handleChange = (e) => {
    console.log("handleChange")
    this.setState({selectedUser: e.target.value, toHome: true})
  }

  handleSignIn = (e) => {
    e.preventDefault()
    console.log("handleSignIn")
    const { dispatch } = this.props
    console.log("this.state.selectedUser",this.state.selectedUser)
    dispatch(setAuthedUser(this.state.selectedUser))
    this.setState({toHome: true})
  }  
  
  componentDidMount(){
    let usersArr = Object.entries(this.props.users);
    this.setState({selectedUser: usersArr[0][1].id})
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

    console.log("usersArr", usersArr)
    return (
      <Link to={'logoOut'} className='tweet'>
      <div className='tweet-info' style={{"width":'300px', "alignContent":"center"}}>
        <p>Welcome to the Would You Rather App</p>
        <br/>
        <p>Press Sign in to continue after selecting the user</p>
        
      <select
          onChange={this.handleChange}
          >
          {options.map(({ value, label }, index) => <option value={value} key={value}>{label}</option>)}
      </select>
      <button className='btn' onClick={this.handleSignIn} >Sign In</button>
      </div>
      </Link>
    )
  }
}


function mapStateToProps ({authedUser, users}) {
  return {
    authedUser,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(LogOut))