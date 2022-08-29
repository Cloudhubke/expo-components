export const INITIAL_STATE = {};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE': {
      return {
        ...state,
        ...(action.payload || {}),
      };
    }
    default:
      return {
        ...state,
        ...(action.payload ? action.payload : action || {}),
      };
  }
};

export default AuthReducer;
