import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import LogOut from './LogOut'
import Login from './Login'
import NotFound from './NotFound'

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
              ? <Route path='*' component={Login}/>
              :  <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/questions/:id' component={QuestionPage} />
                    <Route exact path='/add' component={NewQuestion} />
                    <Route exact path='/leaderboard' component={LeaderBoard} />
                    <Route exact path='/logOut' component={LogOut} />
                    <Route component = {NotFound}/>
                  </Switch>}
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