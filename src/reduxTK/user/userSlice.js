import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("user/getUsers", async (token) => {
  try {
    const headers = {
      token: token,
    };
    const res = await axios.get("https://pishop.onrender.com/users/", {
      headers,
    });
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const headers = {
      token: data.token,
    };
    const updateData = data.formData;
    const res = await axios.post(
      `https://pishop.onrender.com/users/update/${data.id}`,
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

export const deleteUser = createAsyncThunk("user/deleteUser", async (data) => {
  try {
    const headers = {
      token: data.token,
    };

    const res = await axios.post(
      `https://pishop.onrender.com/users/delete/${data.id}`,
      null,
      { headers }
    );

    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const deleteUsers = createAsyncThunk(
  "user/deleteUsers",
  async (data) => {
    try {
      const { token, ...dataBody } = data;
      const headers = {
        token,
      };
      const res = await axios.post(
        `https://pishop.onrender.com/users/deleteMany`,
        dataBody,
        { headers }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    listUser: {
      users: [],
      isLoading: "",
      isError: "",
    },
    update: {
      user: {},
      isLoading: "",
      isError: "",
    },
    delete: {
      complete: "",
      isError: "",
      isLoading: "",
    },
  },
  reducers: {
    deleteUserAction: (state, action) => {
      const usersRemain = state.listUser.users.filter((user) => {
        return user._id !== action.payload.id;
      });
      state.listUser.users = usersRemain;
    },
    deleteManyUsers: (state, action) => {
      const filterArr = state.listUser.users.filter((user) => {
        return !action.payload.includes(user._id);
      });
      state.listUser.users = filterArr;
    },
    searchUser: (state, action) => {
      const searchArr = state.listUser.users.filter((user) => {
        return user.userName
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      state.listUser.users = searchArr;
    },
    sortUp: (state, action) => {
      const type = action.payload;
      if (type === "userName") {
        const sortUpArr = state.listUser.users.sort((a, b) => {
          if (a.userName < b.userName) {
            return 1;
          }
          if (a.userName > b.userName) {
            return -1;
          }
          return 0;
        });
        state.listUser.users = sortUpArr;
      }
      if (type === "email") {
        const sortUpArr = state.listUser.users.sort((a, b) => {
          if (a.email < b.email) {
            return 1;
          }
          if (a.email > b.email) {
            return -1;
          }
          return 0;
        });
        state.listUser.users = sortUpArr;
      }
    },
    sortDown: (state, action) => {
      const type = action.payload;
      if (type === "userName") {
        const sortDownArr = state.listUser.users.sort((a, b) => {
          if (a.userName < b.userName) {
            return -1;
          }
          if (a.userName > b.userName) {
            return 1;
          }
          return 0;
        });
        state.listUser.users = sortDownArr;
      }
      if (type === "email") {
        const sortDownArr = state.listUser.users.sort((a, b) => {
          if (a.email < b.email) {
            return -1;
          }
          if (a.email > b.email) {
            return 1;
          }
          return 0;
        });
        state.listUser.users = sortDownArr;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.listUser.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.listUser.isLoading = false;
        state.listUser.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.listUser.isLoading = false;
        state.listUser.isError = action.payload;
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
export const {
  deleteUserAction,
  searchUser,
  deleteManyUsers,
  sortUp,
  sortDown,
} = userSlice.actions;
export default reducer;
