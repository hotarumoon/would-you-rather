export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}
export function addUserQuestion (user, qid) {
  return {
    type: ADD_QUESTION,
    user,
    qid,
  }
}

export function submitUserAnswer (user, qid, answer) {
  return {
    type: SUBMIT_ANSWER,
    user,
    qid,
    answer
  }
}