import jwt from "jsonwebtoken";
import User from "../models/User";
import JWT_SECRET from '../constants.js'
export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
    	console.log("beforeBLBALBLA");
      if (err) {
      	console.log("errBLBALBLA");
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
      	console.log("BLBALBLA");
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};