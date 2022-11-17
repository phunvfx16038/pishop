import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:8080";
export const postRegisterUser = createAsyncThunk(
  "auth/postRegisterUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, user);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, user);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/reset`, email);
      console.log(res.data);
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const updateResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/new-password`, data);
      console.log(res.data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (data, { rejectWithValue }) => {
    const { token, ...dataBody } = data;
    const headers = {
      token,
    };
    try {
      const res = await axios.post(`${baseUrl}/auth/updatePassword`, dataBody, {
        headers,
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isLoading: "",
      isError: "",
      user: {},
    },
    register: {
      isLoading: "",
      isError: "",
      user: {},
    },
    resetPw: {
      user: {},
      error: "",
      isLoading: "",
    },
    updateUserPw: {
      user: {},
      isLoading: "",
      isError: "",
    },
  },
  reducers: {
    logoutUser: (state, action) => {
      state.login.user = action.payload;
      state.login.isError = "";
      state.register.user = action.payload;
      state.register.isError = "";
      state.resetPw.user = action.payload;
      state.resetPw.error = "";
    },
    updateMainAccount: (state, action) => {
      state.login.user = action.payload;
    },
    resetData: (state, action) => {
      state.register.user = action.payload;
      state.register.isLoading = "";
      state.register.isError = "";
    },
    clearUpdated: (state, action) => {
      state.updateUserPw.user = action.payload;
      state.resetPw.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRegisterUser.pending, (state, action) => {
        state.register.isLoading = true;
      })
      .addCase(postRegisterUser.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.user = action.payload;
        state.register.isError = "";
      })
      .addCase(postRegisterUser.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.isError = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.login.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.user = action.payload;
        state.login.isError = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.isError = action.payload;
      })
      .addCase(updateResetPassword.pending, (state, action) => {
        state.resetPw.isLoading = true;
      })
      .addCase(updateResetPassword.fulfilled, (state, action) => {
        state.resetPw.isLoading = false;
        state.resetPw.user = action.payload;
      })
      .addCase(updateUserPassword.pending, (state, action) => {
        state.updateUserPw.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.updateUserPw.isLoading = false;
        state.updateUserPw.user = action.payload;
        state.updateUserPw.isError = "";
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.updateUserPw.isLoading = false;
        state.updateUserPw.isError = action.payload;
      });
  },
});

const { reducer } = authSlice;
export const { logoutUser, updateMainAccount, clearUpdated, resetData } =
  authSlice.actions;
export default reducer;
