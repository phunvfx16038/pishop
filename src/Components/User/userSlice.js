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
      if (!err.response) {
        throw err.response.data.error;
      }
      return rejectWithValue(err.response.data.error);
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

const userSlice = createSlice({
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
    update: {
      isLoading: "",
      isError: "",
      user: {},
    },
  },
  reducers: {
    logoutUser: (state, action) => {
      state.login.user = action.payload;
    },
    updateMainAccount: (state, action) => {
      state.login.user = action.payload;
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
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.isError = action.payload;
      });
  },
});

const { reducer } = userSlice;
export const { logoutUser, updateMainAccount } = userSlice.actions;
export default reducer;
