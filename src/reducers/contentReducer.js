const INITIAL_STATE = {
  content: [],
};

export const contentReducer = (state = INITIAL_STATE, action) => {
  console.log("data dari action: ", action);
  switch (action.type) {
    case "GET_CONTENT":
      return { ...state, content: action.payload };
    // case "LOGOUT":
    //   return INITIAL_STATE;
    default:
      return state;
  }
};
