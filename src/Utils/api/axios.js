import axios from "axios";
// const BASE_URL = "http://localhost:3003";
// const BASE_URL = "https://password-manager.fly.dev";
const BASE_URL = "https://alek-password-manager.netlify.app";

export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  header: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const axiosCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivateBody = async (method, path, data) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
      data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
