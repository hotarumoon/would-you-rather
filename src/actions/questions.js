import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
      optionOneText,
      optionTwoText ,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
      .catch((e) => { console.error("Error on handleAddQuestion, ", e)})
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function submitAnswer (qid,authedUser,answer,users ) {
  return {
    type: SUBMIT_ANSWER,
    qid,
    authedUser,
    answer,
    users,
  }
}



export function handleSubmitAnswer (info) {
  return (dispatch, getState) => {
    const { authedUser, users } = getState()
    const { qid, answer} = info
    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser: authedUser,
      qid,
      answer,
    })
      .then(() => dispatch(submitAnswer( qid,authedUser,answer,users)))
      .then(() => dispatch(hideLoading()))
      .catch((e) => { console.error("Error on handleSubmitAnswer, ", e)})
  }

}
