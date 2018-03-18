import express from "express";
import Ticket from "../models/Ticket";
import authenticate from "../middlewares/authenticate.js"
import mongoose from "mongoose";
const router = express.Router();

// console.log('auth');
router.use(authenticate);

router.post("/", (req, res) => {
	const {date, time } = req.body.data;
	const ticket = new Ticket( { userId: req.currentUser._id } );
	ticket.date = date;
	ticket.time = time;
	ticket
		.save()
		.then( ticket => res.json({ ticket }))
		.catch(err => res.status(400).json({ errors: err.errors}))
});


router.post("/delete", (req, res) => {
	console.log('delete');
	console.log('id', req.body.id)
	const _id = mongoose.Types.ObjectId(req.body.id);
	Ticket.remove({ _id: _id})
	.then(() => res.status(200).json({id: _id}))
	.catch((err) => res.status(400).json({errors: err.errors}))
});

router.get("/", (req, res) => {
	const userIds = mongoose.Types.ObjectId(req.currentUser._id);
	Ticket.find({ userId: userIds})
	.then((tickets) => res.status(200).json({tickets: tickets}))
	.catch((err) => res.status(400).json({errors: err.errors}))
});

export default router;