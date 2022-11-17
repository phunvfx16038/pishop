import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://pishop.onrender.com";
// "http://localhost:8080";
export const getProducts = createAsyncThunk("user/getProducts", async () => {
  try {
    const res = await axios.get(`${baseUrl}/products`);
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
});

export const updateProduct = createAsyncThunk(
  "user/updateProduct",
  async (data) => {
    try {
      const headers = {
        token: data.token,
      };
      const updateData = data.formData;
      const res = await axios.post(
        `${baseUrl}/products/update/${data.id}`,
        updateData,
        { headers }
      );
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

export const createProduct = createAsyncThunk(
  "user/createProduct",
  async (data) => {
    try {
      const headers = {
        token: data.token,
      };
      const createData = data.formData;
      const res = await axios.post(`${baseUrl}/products/create`, createData, {
        headers,
      });
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "user/deleteProduct",
  async (data) => {
    try {
      const headers = {
        token: data.token,
      };
      const res = await axios.post(
        `${baseUrl}/products/delete/${data.id}`,
        null,
        { headers }
      );
      return res.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "user/deleteProducts",
  async (data) => {
    try {
      const { token, ...dataBody } = data;
      const headers = {
        token,
      };
      const res = await axios.post(`${baseUrl}/products/deleteMany`, dataBody, {
        headers,
      });
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
    getProducts: {
      isLoading: null,
      isError: null,
      products: [],
    },
    update: {
      isLoading: null,
      isError: null,
      product: {},
    },
    create: {
      isLoading: null,
      isError: null,
      product: {},
    },
    paginationData: {
      productPerPage: 10,
      active: 1,
      currentPage: 1,
    },
  },
  reducers: {
    deleteProductAction: (state, action) => {
      const productsRemain = state.getProducts.products.filter((product) => {
        return product._id !== action.payload.id;
      });
      state.getProducts.products = productsRemain;
    },
    deleteManyProducts: (state, action) => {
      const filterArr = state.getProducts.products.filter((product) => {
        return !action.payload.includes(product._id);
      });
      state.getProducts.products = filterArr;
    },
    createNewProduct: (state, action) => {
      state.getProducts.products = [
        ...state.getProducts.products,
        action.payload,
      ];
    },
    resetData: (state, action) => {
      state.update.product = action.payload;
      state.update.isError = "";
      state.update.isLoading = "";
      state.update.create = action.payload;
      state.update.isError = "";
      state.update.isLoading = "";
    },
    searchProduct: (state, action) => {
      if (action.payload !== "") {
        const searchArr = state.getProducts.products.filter((product) => {
          return product.title
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        });
        state.getProducts.products = searchArr;
      }
    },
    getProductPagination: (state, action) => {
      state.paginationData = action.payload;
    },
    sortUp: (state, action) => {
      const type = action.payload;
      if (type === "title") {
        const sortUpArr = state.getProducts.products.sort((a, b) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
        state.getProducts.products = sortUpArr;
      }
      if (type === "price") {
        const sortUpPrice = state.getProducts.products.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        state.getProducts.products = sortUpPrice;
      }
    },
    sortDown: (state, action) => {
      const type = action.payload;
      if (type === "title") {
        const sortDownArr = state.getProducts.products.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        state.getProducts.products = sortDownArr;
      }
      if (type === "price") {
        const sortDownPrice = state.getProducts.products.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        state.getProducts.products = sortDownPrice;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.getProducts.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProducts.isLoading = false;
        state.getProducts.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.getProducts.isLoading = false;
        state.getProducts.isError = action.payload;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.update.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.update.isLoading = false;
        state.update.product = action.payload;
        state.update.isError = "";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.update.isLoading = false;
        state.update.isError = action.payload;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.create.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.create.isLoading = true;
        state.create.product = action.payload;
        state.create.isError = "";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.create.isLoading = false;
        state.create.isError = action.payload;
      });
  },
});

const { reducer } = productSlice;
export const {
  deleteProductAction,
  createNewProduct,
  searchProduct,
  deleteManyProducts,
  sortUp,
  sortDown,
  resetData,
  getProductPagination,
} = productSlice.actions;
export default reducer;
