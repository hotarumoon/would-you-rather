import { RECEIVE_QUESTIONS, SUBMIT_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case SUBMIT_ANSWER :
      const { qid, answer, authedUser } = action;
      return {
				...state,
            [qid]: {
                ...state[qid],
                [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                }
            }
			}
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default :
      return state
  }
}