import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Data/Url";

export const postRegisterUser = createAsyncThunk(
  "auth/postRegisterUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}auth/register`, user);
      return res.data;
    } catch (err) {
      console.log(err.response.data.message);
      if (!err.response) {
        throw err.response.data.message;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const headers = {
      token: data.token,
    };
    const updateData = data.formData;

    const res = await axios.post(
      `${baseUrl}users/update/${data.id}`,
      updateData,
      {
        headers,
      }
    );
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}auth/login`, user);
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
      const res = await axios.post(`${baseUrl}auth/reset`, email);
      return res.data;
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
      const res = await axios.post(`${baseUrl}auth/new-password`, data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePawssword",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...updateInfor } = data;
      const headers = {
        token,
      };
      const res = await axios.post(
        `${baseUrl}auth/updatePasswordbyUser`,
        updateInfor,
        { headers }
      );
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isLoading: "",
      isError: "",
      user: {},
      isLogged: false,
    },
    register: {
      isLoading: "",
      isError: "",
      user: {},
    },
    update: {
      isLoading: "",
      isError: "",
      user: {},
    },
    resetPw: {
      user: {},
      error: "",
      isLoading: "",
    },
    updatePw: {
      user: {},
      error: "",
      isLoading: "",
    },
  },
  reducers: {
    logoutUser: (state, action) => {
      state.login.user = action.payload;
      state.login.isError = "";
      state.login.isLogged = false;
      state.register.user = action.payload;
      state.register.isError = "";
      state.update.user = action.payload;
      state.update.isError = "";
      state.resetPw.user = action.payload;
      state.resetPw.error = "";
    },
    updateMainAccount: (state, action) => {
      state.login.user = action.payload;
    },
    clearUpdated: (state, action) => {
      state.update.user = action.payload;
      state.updatePw.user = action.payload;
      state.resetPw.user = action.payload;
      state.resetPw.error = "";
      state.resetPw.isLoading = false;
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
        state.login.isLogged = true;
        state.register.isError = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.isError = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.update.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.update.isLoading = false;
        state.update.user = action.payload;
        state.update.isError = "";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.isError = action.payload;
      })
      .addCase(updateResetPassword.pending, (state, action) => {
        state.resetPw.isLoading = true;
      })
      .addCase(updateResetPassword.fulfilled, (state, action) => {
        state.resetPw.isLoading = false;
        state.resetPw.user = action.payload;
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.updatePw.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.updatePw.error = "";
        state.updatePw.isLoading = false;
        state.updatePw.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.updatePw.error = action.payload;
        state.updatePw.isLoading = false;
      });
  },
});

const { reducer } = userSlice;
export const { logoutUser, updateMainAccount, clearUpdated } =
  userSlice.actions;
export default reducer;
