import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render() {
  const user = this.props.users[this.props.authedUser]
  const userImg = user? user.avatarURL: null
  return (
    <nav className='nav'>
      <ul>
        <li style={{"display":  this.props.authedUser === "loggedOut" || this.props.authedUser === null ? "none" : "block" }}>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li style={{"display":  this.props.authedUser === "loggedOut" || this.props.authedUser === null ? "none" : "block" }}>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li style={{"display":  this.props.authedUser === "loggedOut"  || this.props.authedUser === null ? "none" : "block" }}>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        <li style={{"display":  this.props.authedUser === "loggedOut" || this.props.authedUser === null ? "none" : "block" , "pointerEvents": "none", "cursor": "default"}}>
          <NavLink to='/hello' activeClassName='passive'>
            Hello {this.props.authedUser}
          </NavLink>
        </li>
        <li style={{"display": this.props.authedUser === "loggedOut" || this.props.authedUser === null  ? "none": "block"}}>
          <NavLink to='/logOut' activeClassName='active'>
          < img src={userImg} alt="Avatar logo" style={{    
            "width": "33px",
            "height" :"33px",
            "borderTopLeftRadius": "50% 50%",
            "borderTopRightRadius": "50% 50%",
            "borderBottomRightRadius": "50% 50%",
            "borderBottomLeftRadius": "50% 50%",
            "border": "2px solid #CCC",
            "marginBottom": "-10px",
            "position": "relative",
            }}/> Log Out
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
}

function mapStateToProps ({authedUser, users}) {
  return {
    authedUser,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Nav))