export const INITIAL_STATE = {};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return {
        ...state,
        ...(action.payload || {}),
      };
  }
};

export default AuthReducer;
