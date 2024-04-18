import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", //can be CONTACT, STARRED, SHARED
  },
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  users: [],
  friends: [],
  friendRequests: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
    updateUsers(state, action){
      state.users = action.payload.users;
    },
    updateFriends(state, action){
      state.users = action.payload.friends;
    },
    updateFriendRequests(state, action){
      state.users = action.payload.request;
    }
  },
});

export default slice.reducer;

export function toggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function updateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function showSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackbar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000);
  };
}

export const closeSnackbar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackbar());
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-users", {
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      }
    }).then((response) => {
      console.log(response);
      slice.actions.updateUsers({users: response.data.data});
    }).catch((error) => {
      console.log(error);
    })
  }
}
export const fetchFriends = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friends", {
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      }
    }).then((response) => {
      console.log(response);
      slice.actions.updateFriends({friends: response.data.data});
    }).catch((error) => {
      console.log(error);
    })
  }
}
export const fetchFriendRequests = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friend-requests", {
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      }
    }).then((response) => {
      console.log(response);
      slice.actions.updateFriendRequests({request: response.data.data});
    }).catch((error) => {
      console.log(error);
    })
  }
}