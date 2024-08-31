import axios from "../services/axios";

const setUserToken = (tempAccessToken) => {
  return new Promise((resolve) => {
    if (tempAccessToken) {
      localStorage.setItem("tempAccessToken", tempAccessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${tempAccessToken}`;
    } else {
      localStorage.removeItem("tempAccessToken");
      delete axios.defaults.headers.common.Authorization;
    }
    resolve();
  });
};

export default setUserToken;
