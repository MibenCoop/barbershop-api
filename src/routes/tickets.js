import express from "express";
import Ticket from "../models/Ticket";
import authenticate from "../middlewares/authenticate.js"

const router = express.Router();

// console.log('auth');
router.use(authenticate);

router.post("/", (req, res) => {
	console.log('!!!!!!!!!!!!!!!!1req.data', req.body.data);
	const {date, time } = req.body.data;
	const ticket = new Ticket( { userId: req.currentUser._id } );
	ticket.date = date;
	ticket.time = time;
	ticket
		.save()
		.then( ticket => {
			console.log('ticket', ticket);
			res.json( { ticket } ) ;

		})
		.catch(err => res.status(400).json({ errors: err.errors}))
});

export default router;