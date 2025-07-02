# 📁 React & Node.js Skill Test — Meetings App

Hey there! 👋
This is my completed submission for the React & Node.js coding test.
I took the basic CRUD + auth spec you gave — and made sure to structure it cleanly, follow good practices, and keep the code readable, scalable, and easy to maintain.

---

## ✅ Features Covered

* **Authentication (Sign In)**
  Using hardcoded credentials as instructed:

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

* **/client/component/** → React components (Navbar, MeetingCard, etc.)
* **/client/views/** → React pages (SignInView, AllMeetingsView, etc.)
* **/client/api/** → All client-side API service calls
* **/server/routes/** → All Express route handlers
* **/server/controllers/** → Logic for each API endpoint
* **/server/middleware/** → Auth checkers (access & refresh)
* **/server/data/** → JSON file storing refresh tokens

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
cd client && npm run start
```

5. Log in with the test credentials and you're good to go!

---

## 🔍 Final Thoughts

App is built cleanly following React & Node.js best practices.
Code is structured for maintainability and clarity, with small UX touches like time-ago timestamps, token auto-refreshing, and pagination controls to improve usability.

Appreciate the chance to work on this — it was fun putting it together 💪

---

**Built by:** Abdullah Hussain
