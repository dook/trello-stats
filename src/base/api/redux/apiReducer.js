import { REQUEST, SUCCESS, FAILURE, CLEAR } from 'base/redux/consts';

/**
 * Method creates reducer for an API request.
 * @param {string} type - The type of the action.
 * @param {function} [reduceSuccess] - The callback function to customize state after success.
 */
export const apiReducer = (type, reduceSuccess) => {
  const initialState = {
    data: null,
    error: null,
    isFetching: false
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case type + REQUEST:
        return {
          ...state,
          isFetching: true
        };
      case type + SUCCESS: {
        let nextState = {
          ...state,
          error: initialState.error,
          isFetching: initialState.isFetching
        };
        if (reduceSuccess) {
          return reduceSuccess(nextState, action);
        }
        return {
          ...nextState,
          data: action.data
        };
      }
      case type + FAILURE:
        return {
          ...state,
          error: action.error,
          isFetching: initialState.isFetching
        };
      case type + CLEAR:
        return initialState;
      default:
        return state;
    }
  };
};
