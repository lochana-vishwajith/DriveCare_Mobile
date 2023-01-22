const initialState = {
  authToken: null,
  registerDetails: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authToken: action.payload,
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
