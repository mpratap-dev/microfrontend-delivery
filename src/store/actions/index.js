import * as actionTypes from "../../constant/actionTypes";

export function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    action: token,
  };
}
export function setRoleId(value) {
  return {
    type: actionTypes.SET_ROLE_ID,
    action: value,
  };
}
export function setRideMode(value) {
  return {
    type: actionTypes.SET_RIDE_MODE,
    action: value,
  };
}

export function setRegions(value) {
  return {
    type: actionTypes.SET_REGIONS,
    action: value,
  };
}

export function setRoleList(value) {
  return {
    type: actionTypes.SET_ROLE_LIST,
    action: value,
  };
}
export function setSelectedDropdown(value) {
  return {
    type: actionTypes.SET_SELECTED_DROPDOWN,
    action: value,
  };
}

export function setUserType(value) {
  return {
    type: actionTypes.SET_USER_TYPE,
    action: value,
  };
}

export function setPermissions(value) {
  return {
    type: actionTypes.SET_PERMISSIONS,
    action: value,
  };
}

export function setRegionBoundary(value) {
  return {
    type: actionTypes.SET_REGION_BOUNDARY,
    action: value,
  };
}

export function setRegionCenter(value) {
  return {
    type: actionTypes.SET_REGION_CENTER,
    action: value,
  };
}
export function updateImageViewer(value) {
  return {
    type: actionTypes.UPDATE_IMAGE_VIEWER,
    action: value,
  };
}

export const showGlobalMessage = ({ text, type }) => ({
  type: actionTypes.SHOW_MESSAGE,
  payload: { text, type },
});

export const hideGlobalMessage = () => ({
  type: actionTypes.HIDE_MESSAGE,
});
