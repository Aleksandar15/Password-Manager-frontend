import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
//
// import intecept //nevermind
//
// import { FetchInterceptor } from "fetch-intercept";
// import { FetchInterceptorResponse } from "fetch-intercept"; //idk @26m he uses interceptors.response: https://www.youtube.com/watch?v=nI8PYZNFtac
import useInterceptors from "./useInterceptors";
//

const useFetchPrivate = () => {
  // const useFetchPrivate= async () =>{ //but its a hook can it be async
  const refresh = useRefreshToken();
  //
  // const fetchPrivate = fetch("http://localhost:3003", {
  //   headers: { "Content-Type": "application/json" },
  // });
  //
  const interceptors = useInterceptors();

  useEffect(() => {
    // const responseIntercept = fetchPrivate.interceptors.response //I just noticed my interceptors.response is DOING NOTHING: it says 'modify the code here'~>iF its Shortcutted to ONLY modify it will be fine to use `fetch-interceptors` otherwise would be useless, i wanna fill the response like him here @25.4m: https://www.youtube.com/watch?v=nI8PYZNFtac
    //
    // const responseIntercept = fetchPrivate.interceptors.response //i cant continue my constant `interceptors`: is not being used===still greyed out`!
    //
    // https://blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses/
    // :
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      let [resource, config] = args;
      let response = await originalFetch(resource, config); //I think this could been the actually 'http::localhost...', headers:{}...` ->idk though im confused
      // Im trying to modify by me by include ALL inside this Interceptor (i guess is handmade unlike library fetch-interceptor):
      // Request interceptor starts
      resource = "http://localhost:3003/refresh"; //idk? or do i use my `fetchPrivate constant which is a fetch caller itself?`.
      (config) => {
        if (!config.headers["Authorization"]) {
          // config.headers["Authorization"] = `Bearer ${auth?.accessToken}`; //wait auth doesnt exist for me its his useContext (oR Will be Redux)
          // 1:I have even NO IDEA WHAT AM I DOING: yet i will have to add `/login` to REDUX state and inside of here to useSelector to get that accessToken HuH.
          // 2:I see he is using `const refresh = useRefreshToken()` so I maybe need to use such refresh Inside of here somewhere.
        }
      };
      // Request interceptor ends
      // Response interceptor
      const json = () =>
        response
          .clone()
          .json()
          .then((data) => ({ ...data, title: `Intercepted: ${data.title}` }));
      response.json = json;
      // Handling errors
      if (!response.ok && response.status === 404) {
        // 404 error handling
        return Promise.reject(response);
      }
      return response;
    };
    //
    //
    //
  }, [refresh]);
  return fetchPrivate;
};

export default useFetchPrivate;
