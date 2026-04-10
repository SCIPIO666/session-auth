This is a smart move. When you're in the "high-intensity" phase of learning, documenting the "why" and the "where" is the only way to make sure the knowledge sticks.

Here is a comprehensive `README.md` structure for your authentication system.

---

# 🛡️ Express & Passport Auth System: The Blueprint

This repository implements a full **MERN-logic** authentication flow (Node/Express/Postgres) using **Passport.js** for session management and **Bcrypt** for security.

## 📂 Project Structure
```text
├── app.js                # Entry point: Middlewares & Server config
├── config/
│   └── passport.js       # The "Brain": Strategy & Session Logic
├── controllers/
│   └── authController.js # The "Handler": Request/Response logic
├── models/
│   └── authModel.js      # The "Librarian": Raw Database queries
├── routes/
│   └── authRouter.js     # The "Traffic Controller": Route definitions
├── services/
│   └── authService.js    # The "Worker": Business logic (Hashing)
└── middleware/
    └── authMiddleware.js # The "Bouncer": Protecting routes
```

---

## 🚀 Step 1: The Entry Point (`app.js`)
**Goal:** Initialize the "Storage Locker" (Session) and the "Bouncer" (Passport).
> **CRITICAL:** The order of `app.use` matters. Session must come before Passport!

```javascript
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // Run the config logic

// 1. Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 Day
}));

// 2. Passport setup
app.use(passport.initialize());
app.use(passport.session()); 
```

---

## 🧠 Step 2: The Logic Brain (`config/passport.js`)
**Goal:** Define how to verify a user and how to store them in a cookie.

```javascript
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const authModel = require('../models/authModel');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await authModel.findUserByUsername(username);
    if (!user) return done(null, false, { message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Wrong password" });

    return done(null, user); // Success!
  } catch (err) { return done(err); }
}));

// STORE ID in cookie
passport.serializeUser((user, done) => done(null, user.id));

// READ ID from cookie & fetch full user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await authModel.findUserById(id);
    done(null, user);
  } catch (err) { done(err); }
});
```

---

## 🛠️ Step 3: Layered Implementation

### 1. Model (`authModel.js`)
Raw SQL queries. Return `null` if user isn't found to avoid "truthy" string bugs.
```javascript
const findUserByUsername = async (username) => {
  const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0] || null; 
};
```

### 2. Service (`authService.js`)
Used for **Sign-Up** only. Handles hashing.
```javascript
const signup = async (username, password) => {
  const hash = await bcrypt.hash(password, 10);
  return await authModel.createUser(username, hash);
};
```

### 3. Controller (`authController.js`)
```javascript
exports.signUp = async (req, res) => { /* call service */ };
exports.logIn = (req, res) => res.json({ user: req.user });
exports.logOut = (req, res) => {
  req.logout((err) => res.redirect('/'));
};
```

---

## 🚦 Step 4: The Routes (`authRouter.js`)
Connects the logic to the endpoints.

```javascript
router.post('/signup', authController.signUp);

// Trigger the Strategy here:
router.post('/login', passport.authenticate('local'), authController.logIn);

router.get('/logout', authController.logOut);
```

---

## 🔒 Step 5: The Bouncer (`authMiddleware.js`)
Protecting private data.

```javascript
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};
```

---

## 📝 Troubleshooting Checklist
* [ ] **Module Error?** Run `npm install express-session passport passport-local bcrypt`.
* [ ] **500 Session Error?** Check if `app.use(session(...))` is above `app.use(passport.session())`.
* [ ] **User Not Found?** Ensure `authModel` returns `null` instead of a string like `"not found"`.
* [ ] **Bcrypt Error?** Ensure you are comparing `password` (plain) with `user.password` (hash), not the other way around.

---

### The "Cracked" Mental Model:
1.  **Signup:** Manual (Service -> Model -> DB).
2.  **Login:** Automatic (Passport Strategy -> `serializeUser` -> Session Cookie).
3.  **Persistence:** On every request, `deserializeUser` converts the cookie ID back into `req.user`.
