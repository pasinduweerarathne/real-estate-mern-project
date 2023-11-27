import { createSlice } from "@reduxjs/toolkit";
import {
  createListing,
  deleteListing,
  editListing,
  getAllListings,
  getMyListings,
} from "./listingActions";

const initialState = {
  loading: false,
  newListing: null,
  myListings: [],
  allListings: [],
  error: null,
  isListingUpdated: false,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearNewLising: (state) => {
      state.newListing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.loading = false;
        state.allListings = action.payload;
        state.error = null;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.loading = false;
        state.allListings = [];
        state.error = action.error.message;
      })
      .addCase(createListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.newListing = action.payload;
        state.error = null;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.newListing = null;
        state.error = action.error.message;
      })
      .addCase(getMyListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyListings.fulfilled, (state, action) => {
        state.loading = false;
        state.myListings = action.payload;
        state.isListingUpdated = false;
        state.error = null;
      })
      .addCase(getMyListings.rejected, (state, action) => {
        state.loading = false;
        state.myListings = [];
        state.error = action.error.message;
      })
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        const newListings = state.myListings.filter(
          (listing) => listing._id !== action.payload.id
        );
        state.loading = false;
        state.myListings = newListings;
        state.error = null;
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(editListing.fulfilled, (state, action) => {
        state.loading = false;
        state.myListings = state.myListings.map((listing) =>
          listing._id === action.payload._id
            ? { ...listing, ...action.payload }
            : listing
        );
        state.isListingUpdated = true;
        state.error = null;
      })
      .addCase(editListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearNewLising, clearSuccessMessage } = listingSlice.actions;
export default listingSlice.reducer;
