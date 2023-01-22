export const Login = (username, password) => {
  const token = username + password;
  return {
    type: "LOGIN",
    payload: token,
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const StoreRegisterDetails = (value) => {
  return (dispatch) => {
    console.log("value", value);
    dispatch({
      type: "STOREREGISTERDETAILS",
      payload: value,
    });
  };
};
