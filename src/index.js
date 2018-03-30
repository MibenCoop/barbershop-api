import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bluebird from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";
import tickets from "./routes/tickets";
import masters from "./routes/masters";

import Master from "./models/Master";

const app = express();
app.use(bodyParser.json());

// mongoose require promise, because default library is deprecated
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/sportbet');

// Mock data
Master.find()
    .then(mastersData => {
        if( mastersData.length === 0) {
            const PETR = new Master({fullName: "Петя Васин", phone: "89004440404"});
            const IVAN = new Master({fullName: "Иван Федоров", phone: "89005550505"});
            const ARSEN = new Master({fullName: "Арсен Араман", phone: "89007770707"});
            PETR.save();
            IVAN.save();
            ARSEN.save();
        }
    })



app.use("/api/auth", auth);
app.use("/api/masters", masters);
app.use("/api/users", users);
app.use("/api/tickets", tickets);

app.listen(8080, () => console.log("Running on localhost:8080"));