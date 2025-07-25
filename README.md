# 📁 React & Node.js Practice Project - Meetings App

Hey there! 👋
This is a **practice project**, not a test submission. I built it to demonstrate my ability to create **clean**, **scalable**, and **maintainable** full-stack applications using React, Node.js, and JWT-based authentication.

It’s designed to showcase real-world coding patterns, folder structure, and token-based auth — while also keeping things simple and readable.

---

## ✅ Features Covered

* **Authentication (Sign In)**
  Using hardcoded credentials for demo:

  ```
  Email: admin@gmail.com
  Password: admin123
  ```

* **Meetings CRUD (Create, Read, Update, Delete)**
  RESTful API routes and clean React views to handle:

  * Add new meeting
  * View all meetings
  * Search by title
  * Sort by latest / oldest
  * Pagination (5 per page)
  * Delete meetings with confirmation

* **Token Handling**

  * Access token issued on login (15 min expiry)
  * Refresh token generated alongside, stored in a local JSON file
  * Refresh token endpoint to issue new access tokens
  * Blacklist system to remove used refresh tokens (for security)

---

## 📂 Project Structure

Cleanly separated frontend & backend logic for clarity:

```
/client
  └── /component
  └── /views
  └── /api
  └── /assets
  └── /routes

/server
  └── /controllers             
  └── /middleware
  └── /services
  └── /data (stores refresh tokens and meetings in JSON)
  └── index.js
```

**/client/component/** → React components (Navbar, MeetingCard, etc.)
**/client/views/** → React pages (SignInView, AllMeetingsView, etc.)
**/client/api/** → All client-side API service calls
**/server/routes/** → All Express route handlers
**/server/controllers/** → Logic for each API endpoint
**/server/middleware/** → Auth checkers (access & refresh)
**/server/data/** → JSON file storing refresh tokens

---

## 🔄 Workflow Summary

* User logs in using provided credentials
* Access token + refresh token generated
* Access token expires every 15 mins, client sends refresh token to get a new one
* Meetings list fetched via API, displayed in client with:

  * Search filter (case insensitive)
  * Sort dropdown (Latest/Oldest)
  * Pagination (5 per page, hides pagination if under 5)
  * Delete confirmation popup
* Refresh token blacklist implemented for security cleanup

---

## 🔗 Setup Instructions

1. Clone the repo
2. Install dependencies for both `/server` and `/client`
3. Create a `.env` in `/server` with:

```
SECRET_KEY=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
```

4. Run both servers:

```
cd server && npm run dev
cd client && npm start
```

5. Log in with the test credentials and you're good to go!

---

## 🔍 Final Thoughts

App is built cleanly following React & Node.js best practices.
Code is structured for maintainability and clarity, with small UX touches like time-ago timestamps, token auto-refreshing, and pagination controls to improve usability.

It’s a **practice project** to demonstrate technical skills — not tied to any company or test.

---

**Built by:** Abdullah Hussain
