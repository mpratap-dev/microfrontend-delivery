import axios from "axios";

const getHeader = (authKey = "Authorization") => ({
  [authKey]: localStorage.getItem("token"),
});

const ajax = {
  get: (url, params) => axios.get(url, { params, headers: getHeader() }).then((response) => response.data), 
  post: (url, data) => axios.post(url, data, {headers: getHeader()}).then((response) => response.data),
  put: (url, data) => axios.put(url, data, {headers: getHeader()}).then((response) => response.data),
};

export default ajax;
