import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bluebird from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";
import tickets from "./routes/tickets";

const app = express();
app.use(bodyParser.json());

// mongoose require promise, because default library is deprecated
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/barbershop');

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/tickets", tickets);

app.listen(8080, () => console.log("Running on localhost:8080"));