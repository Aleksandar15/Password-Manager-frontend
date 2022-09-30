// import fetch from "../Utils/api/fetch"
// import { fetchRefreshToken } from "../Utils/api/fetch"
//
// import { fetch } from "../Utils/api/fetch";
//
// import { fetchData } from "../Utils/api/fetch";
//
// import url from "../Utils/api/fetch"; //works when its `export default URL`->bcuz URL is Object: otherwise NOT it has to be regular EXPORT oF Variable's VALUE
//
// import { url } from "../Utils/api/fetch"; //works
//
// import { fetchData } from "../Utils/api/fetch";

import { useDispatch, useSelector } from "react-redux";
import { refreshAction } from "../redux/actions/refreshTokenActions";

const useRefreshToken = () => {
  // const { accessToken } = useSelector((state) => state.refreshTokenReducer); //it was my mistake: i had 'actionToken instead of accessToken in my REDUCER'.//cannot destructure accessToken as it is undefined (so it doesnt say its NOT defined)
  const data = useSelector((state) => state.refreshTokenReducer);

  // console.log("accessToken INSIDE useRefreshToken: ", accessToken);
  console.log("data INSIDE useRefreshToken: ", data);

  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      // // const response = await fetch("http://localhost:3003/auth/refresh", {
      // //   credentials: 'include'
      // // })
      // //
      // // const refreshToken = fetchRefreshToken()//at this point its a hook ... i wasted my time
      // //
      // // const response = await fetch("/auth/refresh", { credentials: "include" });
      // //
      // // const response = await fetchData("/auth/refresh", {
      // //   credentials: "include",
      // // });
      // //
      // // const response = fetchData("auth/refresh", "GET", headers: {accept: "application/json"})//u see this is error, my API is still not reusable!
      // // const response = fetchData("auth/refresh", "GET", "headers: {accept: "application/json"}") //error
      // //
      // // const response = await fetchData("auth/refresh", "GET");
      // //
      // // SO,
      // // SO,I only need the LINK to be shortened //and that would be FUNNY
      // // const response = await fetch(`${url}/auth/refresh`, {
      // // SO^,I only need the LINK to be shortened //and that would be FUNNY, I much rather have `getData; postData`
      // const response = await fetch(`http://localhost:3003/auth/refresh`, {
      //   credentials: "include",
      // }); //WORKING-original-full-way

      //
      //
      // dispatch(refreshAction()); //IDK IF I NEED THIS
      // const refresh = () => dispatch(refreshAction()); //oh WAIT I GOT CONFUSED: I AM INSIDE refresh FUNCTION!
      dispatch(refreshAction());

      // const response = await fetchData; //`useRefreshToken error: Failed to execute 'json' on 'Response': body stream already read ===IM GOING COOL BACK TO NORMAL!!!!!!

      // console.log("response inside useRefreshToken: ", response);
      // const data = await response.json();
      console.log(
        // "data inside useRefreshToken: ",
        // data,
        // "+ data?.accessToken: ",
        // data?.accessToken
        //
        // "data?.accessToken (shortcut:accessToken) INSIDE useRefreshToken: ",
        // accessToken
        //
        "data INSIDE refresh FUNCTION of useRefreshToken: ",
        data //When error: data is `data: undefined`.->Even when NOT error still same data: bcuz i havent added my reducer to REDUCER combinator: combineReducers iN rootReducer.js
      );

      // return data?.accessToken;
      //
      // return accessToken;
      return data?.accessToken;
    } catch (err) {
      console.log("useRefreshToken error: ", err);
    }
  };

  // return refresh;
  // return dispatch(refreshAction());
  return refresh;
};

export default useRefreshToken;
