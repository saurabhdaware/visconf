# Contribution Guide

## Local Setup
- Fork Repository
- Clone your fork with `git clone https://github.com/{your github username}/visconf`
- `cd visconf`
- `npm install` to install dependencies
- There may be extra steps you need to follow depending on what you want to work on. Checkout [Backend Setup Guide](#backend-setup-guide) for Backend and Database setup.
- `npm start` to run


## Backend Setup Guide
VisConf uses [Zeit Now Serverless Functions](https://zeit.co/docs/v2/serverless-functions/introduction) for Backend APIs and [FaunaDB](https://dashboard.fauna.com/) for Database.

If you don't want to work on backend, open `next.config.js` file in repository and change `devConfig.ENDPOINT` to `https://visconf.now.sh/api`. This will make use of production API and thus you won't have to configure local APIs.


If you want to work on backend, 
- Create Account in https://fauna.com/
- In faunadb, Create two collections, `talks` and `users`
- In repository, rename `.env.sample` to `.env` and set `FAUNADB_SECRET_KEY=<your faunadb secret key>`.
- Run `npm start` to run APIs and Frontend.

---

If there's any extra assistance or help needed, you can reach out to me on my Twitter: https://twitter.com/saurabhcodes or Send an Email on saurabhdaware99@gmail.com

---