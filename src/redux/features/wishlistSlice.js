import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API URL
const API_URL = "https://our-bag-server.onrender.com/api/v1/wishlist";

// Async Thunks
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userID) => {
    const response = await axios.get(`${API_URL}/${userID}`);
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userID, productID }, { dispatch }) => {
    if (!userID || !productID) {
      console.error("Missing userID or productID", { userID, productID });
      return;
    }
    try {
      const response = await axios.post(API_URL, { userID, productID });
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchWishlist(userID)); // Re-fetch wishlist after adding
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {
    resetWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "payload in slice line 48");
        state.items = action?.payload?.data;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
