# Password Manager V2 using PERN Stack

##### -> Here is my <a href="https://github.com/Aleksandar15/password-manager-server">server</a>-side code

#### Visit my live website here: https://alek-password-manager.netlify.app

##### Test login user:

- E-mail: test@test.com
- Password: test


#### About my Full-Stack Password Manager app:

I created this project with one of the main goal being that to challenge my web security skills. In the process I learned that while you can't control which links the frontend user clicks or which apps they may install (_that could be malicious_), we as developers should focus to minimize those risks by maximizing security steps required to access sensitive data. All that **must** be achieved by finding a sweet spot between trying to not annoy our users and securing their data.

#### Special features I implemented:

##### On the frontend

- With React I avoided any unnecessary re-renders & used strategic re-renders to my advantage for features like `multi-device` for example: _user A_ logged on '_device A_' modifies its "password vault", then the same _user A_ but logged on '_device B_' - when they try any CRUD operations on their (unrefreshed) "password vault" page - they will get the latest changes (made on _device A_) **without any refresh** on their _device B_. While also my goal was to use as minimum libraries as possible and to keep following the DRY principle by building reusable components myself & creating custom hooks.

##### On the backend

- I implemented "_refresh tokens_" which are long-lived alongside "_access tokens_" which are short-lived JSON web tokens. However I gave the clients an option to stay signed-in until they manually log out in cases where they fully trust their device & network. The user requires a valid _refresh token_ in order to request a new _access token_ - on success they get both new _accessToken_ & _refreshToken_ - while on invalid or expired _refresh token_ the said token is removed from the database and the user is alerted accordingly and redirected to the login page on the frontend.
- Anti-hacks security: in case where the user's _refreshToken_ is not inside the database -> it means the _refreshToken_ was used by someone else (I suspect it's a hacker) and I alert the user about the potential threat.
  - Note: these features are commonly called "*refresh token rotation*" and "*refresh token reuse detection"*.
  - However, in my *multi-device* logic the result of "*missing refreshToken*" could simply mean that a trusted family user - logged on another device - have just used the option "*logout all devices*" so I had to modify the alert to remind my users of such case scenario where they have to communicate it out with them and be assured whether they were hacked or not. (*Read more info below*)

##### The challenge

- "_Multi-device_" feature allows the _user A_ logged on _device A_ to "_log out all devices_" which means: empties out the array of _refreshToken_'s in the database; which will technically log-out the *user A* from both the *device A* and also logout the same _user A_ but logged on _device B_ & my "safety alert-message" about _anti-hacks_ will get triggered, therefore, the message itself had to be modified to include more empathy about such a case scenario where some of their family members may have clicked the "_logout all devices_" button on another device as an example. 
  - It was kind of like a Catch-22 where I couldn't have a separate message - for both #1 the attempt of the hacker to be re-using the same *refreshToken* that the legit-user already have used & #2 a trusted user has used "*logout all devices" feature -> which in both cases leads to removal of the *refreshToken* from database - and the solution was a _guided-empathetic-message_ to make sure that such a user has asked for more info from his trusted user's actions first, so that I'm not misleading my users with the alert.

##### My PERN Stack technologies:

###### Postgres DB + ExpressJS + ReactJS + NodeJS + JWT + Redux

## Run my frontend project

- Clone this project.
- Navigate (cd) into your project directory.
- Run `npm install` in your command line.
- Run `npm start` in your command line.
- Visit http://localhost:3000 in your browser!
- _Optional_: you may want to connect it with my <a href="https://github.com/Aleksandar15/password-manager-server">backend</a> project.

# NOTES

**1.** In order for authentication cookies to work, the current <a href="https://github.com/Aleksandar15/password-manager-server">server</a> setup has `secure: true` property in its cookie creation so you might need to start local development with `HTTPS` _protocol_ by modifying parts of package.json:

#### For Windows OS:

`"scripts": {"start": "set HTTPS=true&&react-scripts start"}` or just start the app with `set HTTPS=true&&npm start` command.

#### For MacOS:

`"scripts": {"start": "HTTPS=true react-scripts start"` or just start the app with `HTTPS=true npm start` command.

**2.** Make sure to modify `BASE_URL` to your server's localhost URL by heading to `axios.js` file directory: `src/Utils/api/axios.js` & also omit the `/api` path as its only suitable for production build with my current Netlify proxy setup.

### HOW TO's

###### How to clone the project?

##### Clone with HTTPS URL: `git clone https://github.com/Aleksandar15/Password-Manager-frontend.git`

##### Clone with SSH URL: `git clone git@github.com:Aleksandar15/Password-Manager-frontend.git`

###### How to connect to the server?

##### Clone the server code from <a href="https://github.com/Aleksandar15/password-manager-server">here</a> & follow the instructions there.

---

**More info**:

1. <a href="https://github.com/Aleksandar15/Password-Manager-frontend/blob/main/src/components/PersistLogin/PersistLogin.js">`PersistLogin`</a> on frontend could be named "`PersistLoading`" because throughout development I modified it to persist "`Loading`" page always and to never give an '_empty skeleton-page_' of a protected route (see ex. #1.1). I compared my app to instagram for inspiration and achieved exactly what I imagined. All the while auth-checks are handled in each component and they all have "`Loading`" as default state which is pretty cool.

#1.1 Example: to never give away an '_empty skeleton-page_' of a protected route (ex. `/manager`) to _unauthorized user_ - and the other way - to never visually show unauthenticated route like `/login` to _authorized user_ and instead after "Loading" -> redirect them back to _authorized route_ `/manager`.

2. <a href="https://github.com/Aleksandar15/password-manager-server/blob/main/controllers/refreshTokenController.js">`refreshTokenController`</a> on the server is rotating each valid non-expired `refreshToken` with a new one and I am passing the remaining '_expiryTime_' from the old one which was now "_invalidated_" - meaning it was removed from database & replaced with `newRefreshToken`. That's a perfect security feature I implemented on my app.
3. <a href="https://github.com/Aleksandar15/Password-Manager-frontend/blob/main/src/Utils/api/axios.js">`Axios`</a> frontend utils created using `axios.create` method by default parses my JSON data behind the scenes hence why I don't use `JSON.parse` on my backend. If I were to send a JSON I'd need the <a href="https://axios-http.com/docs/req_config">`transformRequest`</a> function.
