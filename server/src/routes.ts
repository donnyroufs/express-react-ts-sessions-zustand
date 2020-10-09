import express from 'express';
import Auth from './Auth';

const router = express.Router();

router.post("/login", (req, res) => {
  // Get user from fake database & if exists, check if password match
  const { isValid, user } = Auth.authenticateUser(req.body);

  // If all went well, store in session
  if (isValid) {
    req.session.user = user;
    return res.status(200).json({
      username: user.username,
      exp: req.session.cookie.expires,
    });
  }

  return res.status(404).json({ msg: "User or password is not valid" });
});

// Allow the client to grab user data if they have a valid session cookie
router.get("/status", Auth.isAuthenticated);

// Can only visit when valid session cookie
router.get("/protected", Auth.isAuthorized, (req, res) => {
  res.json(`username: ${req.session.user.username}`);
});

// Destroy session
router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.status(200).json({});
  });
});

export default router;