import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  oneusers: [],
  isloadingGender: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isloadingGender = true;
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isloadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isloadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.positions = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_USERS_FAIL:
      state.users = [];
      return {
        ...state,
      };
    // case actionTypes.FETCH_USERS_SUCCESS:
    //   state.oneusers = action.users;
    //   return {
    //     ...state,
    //   };
    // case actionTypes.FETCH_USERS_FAIL:
    //   state.oneusers = [];
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};

export default adminReducer;
