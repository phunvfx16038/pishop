import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders = createAsyncThunk("orders/getOrders", async (token) => {
  try {
    const headers = {
      token: token,
    };
    const res = await axios.get("https://pishop.onrender.com/orders", {
      headers,
    });
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const getOrder = createAsyncThunk("orders/getOrder", async (data) => {
  const { token, orderId } = data;
  console.log(data);
  try {
    const headers = {
      token: token,
    };
    const res = await axios.get(
      `https://pishop.onrender.com/orders/${orderId}`,
      {
        headers,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    getOrders: {
      isLoading: null,
      isError: null,
      orders: [],
    },
    getOrder: {
      isLoading: null,
      isError: null,
      order: [],
    },
  },
  reducers: {
    searchOrder: (state, action) => {
      const searchArr = state.getOrders.orders.filter((order) => {
        return order.user.name
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      state.getOrders.orders = searchArr;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.getOrders.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrders.isLoading = false;
        state.getOrders.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.getOrders.isLoading = false;
        state.getOrders.isError = action.payload;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.getOrder.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.getOrder.isLoading = false;
        state.getOrder.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.getOrder.isLoading = false;
        state.getOrder.isError = action.payload;
      });
  },
});

const { reducer } = orderSlice;
export const { searchOrder } = orderSlice.actions;
export default reducer;
