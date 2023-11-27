import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllListings = createAsyncThunk(
  "getAllListings",
  async (search) => {
    try {
      if (search) {
        const { data } = await axios.get(`/api/listing/listings${search}`);

        return data;
      } else {
        const { data } = await axios.get("/api/listing/listings");

        return data;
      }
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const createListing = createAsyncThunk(
  "createListing",
  async (formData) => {
    try {
      const { data } = await axios.post(
        "/api/listing/create-listing",
        formData
      );

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const getMyListings = createAsyncThunk("myListings", async () => {
  try {
    const { data } = await axios.get("/api/listing/get-mylistings");

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const deleteListing = createAsyncThunk("deleteListing", async (id) => {
  try {
    const { data } = await axios.delete(`/api/listing/delete-listing/${id}`);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const editListing = createAsyncThunk(
  "editLising",
  async ({ id, formData }) => {
    try {
      const { data } = await axios.post(
        `/api/listing/edit-listing/${id}`,
        formData
      );

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
