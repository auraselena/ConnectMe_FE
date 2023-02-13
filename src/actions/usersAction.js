export const loginAction = (data) => {
    console.log("data dari component: ", data);
    return {
      type: "LOGIN_SUCCESS",
      payload: data,
    };
  };
  
  export const logoutAction = () => {
    localStorage.removeItem("socmed_login");
    return {
      type: "LOGOUT",
    };
  };
  