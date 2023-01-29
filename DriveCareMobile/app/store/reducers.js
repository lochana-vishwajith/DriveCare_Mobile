const initialState = {
  authToken: null,
  registerDetails: {},
  userDetails: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authToken: action.payload.token,
        userDetails: action.payload.userDetails,
      };
    case "LOGOUT":
      return {
        authToken: null,
      };
    case "STOREREGISTERDETAILS":
      return {
        ...state, //copy previous state
        registerDetails: action.payload,
      };

    default:
      return state;
  }
};
