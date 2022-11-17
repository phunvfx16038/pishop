import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://pishop.onrender.com";
// "http://localhost:8080";
export const getUsers = createAsyncThunk("user/getUsers", async (token) => {
  try {
    const headers = {
      token: token,
    };
    const res = await axios.get(`${baseUrl}/users/`, {
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
      `${baseUrl}/users/update/${data.id}`,
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

    const res = await axios.post(`${baseUrl}/users/delete/${data.id}`, null, {
      headers,
    });

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
      const res = await axios.post(`${baseUrl}/users/deleteMany`, dataBody, {
        headers,
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err.response.data.error;
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
        `${baseUrl}/auth/updatePasswordbyUser`,
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
    paginationData: {
      productPerPage: 10,
      active: 1,
      currentPage: 1,
    },
  },
  reducers: {
    deleteUserAction: (state, action) => {
      const userIndex = state.listUser.users.findIndex(
        (user) => user._id === action.payload.id
      );
      const userDelete = state.listUser.users[userIndex];
      if (userDelete.isAdmin === false) {
        const usersRemain = state.listUser.users.filter((user) => {
          return user._id !== userDelete._id;
        });
        state.listUser.users = usersRemain;
      } else {
        state.delete.complete = false;
      }
    },
    deleteManyUsers: (state, action) => {
      const listUserSelected = state.listUser.users.filter((user) => {
        return action.payload.includes(user._id);
      });
      const nonAdmin = listUserSelected.filter((user) => {
        return user.isAdmin === false;
      });
      if (nonAdmin.length === 0) {
        state.delete.complete = false;
      } else {
        const listUserDelete = nonAdmin.map((user) => user._id.toString());
        const filterArr = state.listUser.users.filter((user) => {
          return !listUserDelete.includes(user._id);
        });
        state.listUser.users = filterArr;
      }
    },
    resetUpdatedData: (state, action) => {
      state.update.user = action.payload;
      state.update.isLoading = "";
      state.update.isError = "";
      state.delete.complete = "";
    },
    searchUser: (state, action) => {
      const searchArr = state.listUser.users.filter((user) => {
        return user.userName
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      state.listUser.users = searchArr;
    },
    getUserPagination: (state, action) => {
      state.paginationData = action.payload;
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
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.update.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.update.isError = "";
        state.update.isLoading = false;
        state.update.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.update.isError = action.payload;
        state.update.isLoading = false;
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
  resetUpdatedData,
  getUserPagination,
} = userSlice.actions;
export default reducer;
