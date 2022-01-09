import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render() {
    console.log("NAVJS",this.props.authedUser)
    const user = this.props.users[this.props.authedUser]
    const userImg = user? user.avatarURL: null
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderBoard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        <li>
          <NavLink to='/hello' activeClassName='passive'>
            Hello {this.props.authedUser}
          </NavLink>
        </li>
        <li>
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
    users
  }
}

export default withRouter(connect(mapStateToProps)(Nav))