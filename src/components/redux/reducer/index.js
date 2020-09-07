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
      default:
        return state;
    }
}
export default reducer