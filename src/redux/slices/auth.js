import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

//Reducer
export default slice.reducer;

// Log in

export function LoginUser(formValues) {
  // formValues => {email, password}
  return async (dispatch, getState) => {
    //for it to be a thunk action, we need to return another function
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) { 
        dispatch(slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
        }))
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
