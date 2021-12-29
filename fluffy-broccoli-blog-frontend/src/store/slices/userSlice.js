import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuth: false,
  isLoading: true,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.token = null;
    },
    startCheck(state) {
      // state.isLoading = true;
    },
    checkSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;
    },
    checkFail(state) {
      state.isLoading = false;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});
// :, actionrafalse
export const {
  setUser,
  login,
  logout,
  startCheck,
  checkSuccess,
  checkFail,
  setIsLoading,
} = userSlice.actions;
export default userSlice.reducer;
