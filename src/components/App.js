import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import TweetPage from './QuestionPage'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import LogOut from './LogOut'
import PollQuestion from './PollQuestion'
import PollResults from './PollResults'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' component={TweetPage} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/leaderBoard' component={LeaderBoard} />
                  <Route path='/logOut' component={LogOut} />
                  <Route path='/pollResults/:id' component={PollResults} />
                  <Route path='/pollQuestion/:id' component={PollQuestion} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)