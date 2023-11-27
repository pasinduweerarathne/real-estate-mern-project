import axios from "axios";

export const userSignup = async (formData) => {
  try {
    const { data } = await axios.post("/api/auth/sign-up", formData);
    return data;
  } catch (error) {
    throw error;
  }
};
