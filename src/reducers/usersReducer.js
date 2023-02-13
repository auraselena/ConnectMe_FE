const INITIAL_STATE = {
  id: 0,
  username: "",
  email: "",
  password: "",
  fullname: "",
  bio: "",
  pfp: "",
  status: "",
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  console.log("data dari action: ", action);
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
