import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("userLogin", async (formData) => {
  try {
    const { data } = await axios.post("/api/auth/sign-in", formData);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const googleLogin = createAsyncThunk("googleLogin", async (authData) => {
  try {
    const { data } = await axios.post("/api/auth/google-sign-in", authData);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const userLogOut = createAsyncThunk("userLogout", async () => {
  try {
    const { data } = await axios.get("/api/auth/sign-out");

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const updateUser = createAsyncThunk("updateUser", async (formData) => {
  try {
    const { data } = await axios.patch(
      `/api/user/update-user/${formData.id}`,
      formData.formData
    );
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    const { data } = await axios.delete(`/api/user/delete-user/${id}`);

    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});
