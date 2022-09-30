import axios from "axios";

// const ServerURL = "http://localhost:3003";

// export default axios.create({ ServerURL }); //I think BaseURL property is builtiN AXIOS LOL!

// Since below works (baseURL is builtin property: let me try to break it by passing it myself)
// const baseURL = "http://localhost:3003";
const BASE_URL = "http://localhost:3003";

// export default axios.create({ baseURL }); //yeah its even lower cased letters auto-fill by axios.
export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  header: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
  withCredentials: true,
});

// This way is impossible:
// export const axiosPrivateBody = axios.create({
//   baseURL: BASE_URL,
//   body, //Thats impossible, body must be set by ME so i can ONLY shortcut the axiosPrivate oR ELSE I will have to create a function with such arguments
//   header: {
//     "Content-Type": "application/json;charset=UTF-8",
//     Accept: "application/json",
//   },
//   withCredentials: true,
// });

// export const axiosPrivateBody = (body) => { //thats imsspobie, again i run into the IMPOSSIBILITIES
//   return axios.create({
//     baseURL: BASE_URL,
//     body,
//     header: {
//       "Content-Type": "application/json;charset=UTF-8",
//       Accept: "application/json",
//     },
//     withCredentials: true,
//   });
// };

//
// IF I wanted to make such a function I would have to call Axios with an OBJECT that can have Values of `method, data` received from the Caller of this Util, I just gotta make sure to return that data afterwards either using .then , BUT TRY NOT to confuse the TRY CATCH Async Function that is going to use this utils as the `data` will already be received I cant use `await keyword on received data (by ME) + by link: https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
export const axiosPrivateBody = async (method, path, data) => {
  // 1 more issue: AXIOS will try to HANDLE them ERROR DATA ITSELF: and if I ONLY return the DATA-> I have no Change of Grabbing the Errors inside /Login oR say /EditPassword.js:
  // 1. SOLUTION^:is to return both the try{return data.response.data} && catch(err){return err.response.data}~> WHICH WOULD MEAN 100% Received 1 DATA ONLY=>TO be handled inside /login`s TRY Method: at which Point I wouldnt need the switching of TRY-Catch Method!
  //
  // Dummy test just to see data (I wont use it bcuz i already modified my rest of the code:):
  try {
    const response = await axios({
      method,
      url: `http://localhost:3003${path}`,
      data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    // return err.response;
    return err.response.data;
  }
};
