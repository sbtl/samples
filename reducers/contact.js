import * as type from '../actions/actionTypes';
import Immutable from 'immutable';

let defaultState = Immutable.fromJS({
  isSuccess: false,
  data: {},
  error: null
});

export default function contactReducer(state = defaultState, action) {
  switch (action.type) {
    case type.SUBMIT_CONTACT_FORM:
      return state.mergeDeep({
        isSuccess: true,
        data: action.response,
        error: null
      });

    case type.SUBMIT_CONTACT_FORM_FAILED:
      return state.mergeDeep({
        isSuccess: false,
        data: {},
        error: 'testing error contact form'
      });

    default:
      return state;
  }
}
