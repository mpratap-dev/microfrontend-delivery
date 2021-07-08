import * as actionTypes from "../../constant/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  roleId: localStorage.getItem("roleId"),
  userType: "",
  permissions: localStorage.getItem("permissions")
    ? JSON.parse(localStorage.getItem("permissions"))
    : "",
  globalMessage: {
    text: "",
    visible: false,
    type: "",
  },
};
function reducers(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.action,
      };
    case "SET_ROLE_ID":
      return {
        ...state,
        roleId: action.action,
      };
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.action,
      };
    case "SET_PERMISSIONS":
      return {
        ...state,
        permissions: action.action,
      };
    case actionTypes.SHOW_MESSAGE:
      return {
        ...state,
        globalMessage: {
          ...action.payload,
          visible: true,
        },
      };
    case actionTypes.HIDE_MESSAGE:
      return {
        ...state,
        globalMessage: {
          ...state.globalMessage,
          visible: false,
        },
      };
    default:
      return state;
  }
}

export default reducers;
