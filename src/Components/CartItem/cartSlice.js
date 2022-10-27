import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../Data/Url";
import axios from "axios";
export const createCart = createAsyncThunk("cart/createCart", async (cart) => {
  const { token, ...data } = cart;
  const headers = {
    token,
  };
  try {
    const res = await axios.post(`${baseUrl}cart/create`, data, { headers });

    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const getCart = createAsyncThunk("cart/getCart", async (data) => {
  const headers = {
    token: data.token,
  };
  try {
    const res = await axios.get(`${baseUrl}cart/${data.userId}`, { headers });
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const updateCart = createAsyncThunk("cart/updateCart", async (cart) => {
  const { token, ...data } = cart;
  const headers = {
    token,
  };
  try {
    const res = await axios.post(`${baseUrl}cart/update`, data, { headers });
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    fullCart: [],
  },
  reducers: {
    addCart: (state, action) => {
      const newProd = action.payload;
      const existProduct = state.cart.findIndex((product) => {
        return product._id === newProd._id;
      });
      if (existProduct === -1) {
        state.cart = [...state.cart, newProd];
      } else {
        state.cart[existProduct].quantity =
          state.cart[existProduct].quantity + 1;
      }
    },
    resetCart: (state, action) => {
      state.fullCart = action.payload;
      state.cart = action.payload;
    },
    removeItem: (state, action) => {
      const remainItem = state.cart.filter((item) => {
        return item._id !== action.payload;
      });
      state.cart = remainItem;
    },
    increaseQuantity: (state, action) => {
      const increaseData = action.payload;
      const existProductIndex = state.cart.findIndex((item) => {
        return item._id === increaseData.id;
      });
      state.cart[existProductIndex].quantity = increaseData.quantity + 1;
    },
    decreaseQuantity: (state, action) => {
      const decreaseData = action.payload;
      const existProductIndex = state.cart.findIndex((item) => {
        return item._id === decreaseData.id;
      });
      state.cart[existProductIndex].quantity = decreaseData.quantity - 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action) => {
        state.cart = action.payload.cartItems;
        state.fullCart = action.payload;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        if (JSON.stringify(action.payload) !== "[]") {
          state.cart = action.payload[0].cartItems;
          state.fullCart = action.payload[0];
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.fullCart = action.payload;
      });
  },
});

const { reducer, actions } = cartSlice;
export const {
  addCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} = actions;
export default reducer;
