export const isUserAuthorized = async () => {
  const response = await fetch("http://localhost:3003/auth/is-verify", {
    // const response = await fetch(
    //   "https://password-manager.fly.dev/auth/is-verify",
    //   {
    method: "GET",
    mode: "cors",
    headers: {
      token: localStorage.token,
    },
  });
  const data = await response.json();
  return data;
};
