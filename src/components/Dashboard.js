import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

 
class Dashboard extends Component {
  state = {
    selected: false,
  }

  handleOnClick = (e) => {
    if(e.target.value.selected === false || e.target.value.selected === undefined ){
      this.setState({selected: !this.state.selected});
    }

  }

  render() {
    const notSelectedButton = {
      width:'50%',

    };
    const {questions} = this.props


    return (

      <div>
      <h3 className='center'>Would You Rather App</h3>
      <div style={{"border":" 1px solid #D3D3D3", "borderRadius": '5px'}}>
      <ToggleButtonGroup color="primary" exclusive style={{"width": "100%"}}>
        <ToggleButton 
            selected={!this.state.selected} 
            style={notSelectedButton}
            onClick={this.handleOnClick} 
            value="0">
              Unanswered Questions
        </ToggleButton>
        <ToggleButton  
            onClick={this.handleOnClick} 
            selected={this.state.selected}  
            style={notSelectedButton} 
            value="1">
              Answered Questions
        </ToggleButton>
      </ToggleButtonGroup>
      {(this.state.selected === false ||this.state.selected === '' )? 
        <ul className='dashboard-list'>
          {this.props.questionIds.filter(id => {
            return this.props.questions[id].optionOne.votes.length === 0 && questions[id].optionTwo.votes.length === 0
          })
          .map((id) => (
            <li key={id}>
              <Question id={id} showVotes={false}/>
            </li>
          ))}
        </ul>
        
        : 

        <ul className='dashboard-list'>
          {this.props.questionIds.filter(id => {
            return this.props.questions[id].optionOne.votes.length > 0 || questions[id].optionTwo.votes.length > 0
          }).map((id) => (
            <li key={id}>
              <Question id={id} showVotes={false}/>
            </li>
          ))}
        </ul>
     }


      </div>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions: questions

  }
}

export default connect(mapStateToProps)(Dashboard)