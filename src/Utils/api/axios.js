import axios from "axios";
const BASE_URL = "http://localhost:3003";

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

// export const axiosPrivateBody = async (method, path, data) => {
// export const axiosPrivateBody = async (method, path, body) => { //BIG MISTAKE, "data" must be a named property CALLED DATA otherwise DATA (AKA Body in Fetch API) is NOT send to the API! ACtually API `/auth/login` iSNT even HIT!
export const axiosPrivateBody = async (method, path, data) => {
  try {
    const response = await axios({
      method,
      // url: `http://localhost:3003${path}`,
      url: `${BASE_URL}${path}`,
      // data,
      // body,  //BIG MISTAKE, "data" must be a named property CALLED DATA otherwise DATA (AKA Body in Fetch API) is NOT send to the API! ACtually API `/auth/login` iSNT even HIT!
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
