import express from "express";
import mongoose from "mongoose";
import Ticket from "../models/Ticket";
import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
	const {date, time, master } = req.body.data;
	const ticketCredentials = new Ticket( { 
		userId: req.currentUser._id,
		master,
		time,
		date
	 } );
	Ticket.find({date, time})
		.then((tickets) => {
			if ( tickets.length === 0) {
				ticketCredentials
					.save()
					.then( ticket => res.json({ ticket }))
					.catch(err => res.status(400).json({ errors: err.errors}))
			} else {
				const error = 'К сожалению, это время уже занято.'
				throw error;
			}
		})
		.catch(err => res.status(400).json({ errors: {global: err}}));
});

router.post("/delete", (req, res) => {
	const _id = mongoose.Types.ObjectId(req.body.id);
	Ticket.remove({ _id })
	.then(() => res.status(200).json({id: _id}))
	.catch((err) => res.status(400).json({errors: err.errors}))
});

router.get("/", (req, res) => {
	const userIds = mongoose.Types.ObjectId(req.currentUser._id);
	Ticket.find({ userId: userIds})
	.then((tickets) => res.status(200).json({tickets}))
	.catch((err) => res.status(400).json({errors: err.errors}))
});

export default router;