import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  getAllUsers,
  createNewUserService,
  editUserService,
  deleteUserService,
} from "../../services/userService";
import axios from "axios";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.data.err === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      fetchGenderFail();
      console.log("fetchGenderStart error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.data.err === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      fetchRoleFail();
      console.log("fetch Role Start error", e);
    }
  };
};
export const fetchRoleSuccess = (Data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: Data,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.data.err === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      fetchPositionFail();
      console.log("fetch Position Start error", e);
    }
  };
};
export const fetchPositionSuccess = (Data) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: Data,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.data.err === 0) {
        let reserve = await res.data.user.reverse();
        dispatch(fetchAllUsersSuccess(reserve));
      } else {
        dispatch(fetchAllUsersFail());
      }
    } catch (e) {
      fetchAllUsersFail();
      console.log("fetch Position Start error", e);
    }
  };
};
export const fetchAllUsersSuccess = (users) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: users,
});
export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAIL,
});
export const fetchUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers(userId);
      if (res && res.data.err === 0) {
        dispatch(fetchUsersSuccess());
      } else {
        dispatch(fetchUsersFail());
      }
    } catch (e) {
      fetchUsersFail();
      console.log("fetch Position Start error", e);
    }
  };
};
export const fetchUsersSuccess = (users) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  users: users,
});
export const fetchUsersFail = () => ({
  type: actionTypes.FETCH_USERS_FAIL,
});
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.data.err === 0) {
        toast.success("Create a new user succeed!");
        dispatch(createNewUserSuccess());
        dispatch(fetchAllUsers());
        emitter.emit("EVENT_CLEAR_MODAL_INPUT");
      } else {
        dispatch(createNewUserFail());
      }
    } catch (e) {
      dispatch(createNewUserFail());
      console.log("create user error", e);
    }
  };
};
export const createNewUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createNewUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const editUser = (putData) => {
  return async (dispatch, getState) => {
    try {
      let response = await editUserService(putData);
      if (response && response.data.err == 0) {
        toast.success(" Edit user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsers());
      } else {
        dispatch(editUserFail());
      }
    } catch (e) {
      dispatch(editUserFail());
      console.log("edit user error", e);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const editUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteUserService(userId);
      if (response && response.data.err == 0) {
        toast.success("Delete user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsers());
      } else {
        dispatch(deleteUserFail());
      }
    } catch (e) {
      console.log(e);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});
