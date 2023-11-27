import axios from "axios";
import { notify } from "../../common";

export const fetchOfferListings = async () => {
  try {
    const { data } = await axios.get(
      "/api/listing/listings?offer=true&limit=4"
    );

    return data;
  } catch (error) {
    notify("error", error.message);
  }
};

export const fetchRentListings = async () => {
  try {
    const { data } = await axios.get("/api/listing/listings?type=rent&limit=4");
    return data;
  } catch (error) {
    notify("error", error.message);
  }
};

export const fetchSaleListings = async () => {
  try {
    const { data } = await axios.get("/api/listing/listings?type=sale&limit=4");
    return data;
  } catch (error) {
    notify("error", error.message);
  }
};
