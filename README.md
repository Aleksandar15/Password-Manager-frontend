# Password Manager V2 using PERN Stack

#### About my Full-Stack Password Manager app:

I created this project with one of the main goal being that to challenge my web security skills. In the process I learned that while you can't control which links the frontend user clicks or which apps they may install (_that could be malicious_), we as developers should focus to minimize those risks by maximizing security steps required to access sensitive data. All that **must** be achieved by finding a sweet spot between trying to not annoy our users and securing their data.

#### Visit my live website here: https://alek-password-manager.netlify.app

##### Test login user:

- E-mail: test@test.com
- Password: test

##### My PERN Stack technologies:

###### Postgres DB + ExpressJS + ReactJS + NodeJS

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
