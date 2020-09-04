export const BALANCE_LOADED = 'BALANCE_LOADED'
export const BALANCE_REQUESTED = 'BALANCE_REQUESTED'
export const BALANCE_ERROR = 'BALANCE_ERROR'

const balanceLoaded = (balance) => {
    return {
      type: BALANCE_LOADED,
      payload: balance
    }
  };
  
  const balanceRequested = () => {
    return {
      type: BALANCE_REQUESTED
    }
  };
  
  const balanceError = () => {
    return {
      type: BALANCE_ERROR
    }
  };
  
  
  export {
    balanceLoaded,
    balanceRequested,
    balanceError,
  }