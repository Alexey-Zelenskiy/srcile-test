import {BALANCE_LOADED, BALANCE_REQUESTED, BALANCE_ERROR} from '../action';

const initialState = {
    balance : 0,
    loading: true,
    error: false
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
    case BALANCE_LOADED:
        return {
          ...state,
          balance: payload,
        };
      case BALANCE_REQUESTED:
        return {
          ...state,
          loading: false
        };
      case BALANCE_ERROR:
        return {
          ...state,
          loading: true,
          error: true
        };
      default:
        return state;
    }
}
export default reducer