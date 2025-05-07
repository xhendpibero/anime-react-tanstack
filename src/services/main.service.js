/* eslint-disable no-undef */
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getListAnime = async (page = 0, query = "") => {
  try {
    const response = await API.get("/anime", {
      params: {
        q: query,
        page: page,
        limit: 24,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching anime list:", error);
    throw error;
  }
};

export const getAnimeDetail = async (id = "") => {
  try {
    const response = await API.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching anime detail for ID ${id}:`, error);
    throw error;
  }
};

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 429) {
      console.warn("Rate limit exceeded. Please try again later.");
    }
    return Promise.reject(error);
  }
);
