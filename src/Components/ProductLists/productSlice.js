import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../Data/Url";
import axios from "axios";

export const getProductSilder = createAsyncThunk(
  "product/getProductSilder",
  async () => {
    const res = await axios(baseUrl + "products?limit=6");
    return res.data;
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const res = await axios(baseUrl + "products");
    return res.data;
  }
);

export const getProductOnCategories = createAsyncThunk(
  "product/getProductOnCategories",
  async (categories) => {
    const res = await axios(baseUrl + "products/" + categories);
    return res.data;
  }
);

export const createOrder = createAsyncThunk(
  "product/createOrder",
  async (data) => {
    const { token, ...orderData } = data;
    try {
      const headers = {
        token,
      };
      const res = await axios.post(`${baseUrl}orders/create`, orderData, {
        headers,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

export const getOrderUser = createAsyncThunk(
  "product/getOrderUser",
  async (data) => {
    try {
      const headers = {
        token: data.token,
      };
      const res = await axios.get(`${baseUrl}orders/orderUser/${data.userId}`, {
        headers,
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "cart/updateOrder",
  async (cart) => {
    const { token, ...data } = cart;
    const headers = {
      token,
    };
    try {
      const res = await axios.post(`${baseUrl}cart/update`, data, { headers });
      console.log(res.data);
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: {
      slide: [],
      products: [],
    },
    loading: "",
    error: "",
    search: "",
    paginationData: {
      productPerPage: 8,
      active: 1,
      currentPage: 1,
    },
    orders: [],
    createdOrder: [],
  },
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    getPagination: (state, action) => {
      state.paginationData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductSilder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductSilder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getProductSilder.fulfilled, (state, action) => {
        state.items.slide = action.payload;
        state.loading = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.items.products = action.payload;
        state.loading = false;
      })
      .addCase(getProductOnCategories.fulfilled, (state, action) => {
        state.items.products = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createdOrder = action.payload;
      })
      .addCase(getOrderUser.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

const { reducer, actions } = productSlice;
export const { searchProduct, getPagination } = actions;
export default reducer;
