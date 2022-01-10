import React, { Component } from 'react'
import { connect } from 'react-redux'
 
class LeaderBoard extends Component {
  render() {
    console.log("LEADERBOARD: ", this.props)
    return (
      <div className='center'>
        <h3 className='center'>Would You Rather App</h3>
        <div style={{"alignItems": "center"}}>
        <ul className='dashboard-list'>
          {this.props.userIds.map((user) => (
            <li key={user}>
              <div style={ {"border": "1px solid #dad7d7", "width":"100%", "marginBottom":"20px"}} >
               <img
                  src={ this.props.users[user].avatarURL}
                  alt={`Avatar of ${user}`}
                  classauthor='avatar'
                  style={{height: '50px', width: '50px', paddingRight: '20 px', paddingLeft: '20px', paddingTop: '20px'}}
                />
                <p>{this.props.users[user].name}</p>
                <br></br>
                <p>Answered questions {Object.keys(this.props.users[user].answers).length}</p>
                <p>Created questions {Object.keys(this.props.users[user].questions).length}</p>
                <p >Score {Object.keys(this.props.users[user].answers).length + Object.keys(this.props.users[user].questions).length}</p>
                
               </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
       users,
       userIds: Object.keys(users)
       .sort((a,b) => (Object.keys(users[b].answers).length + Object.keys(users[b].questions).length) -(Object.keys(users[a].answers).length + Object.keys(users[a].questions).length) ),
     
  }
}

export default connect(mapStateToProps)(LeaderBoard)