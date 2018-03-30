import express from "express";
import Master from "../models/Master";
import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.use(authenticate);

router.get("/", (req, res) => {
	Master.find()
	.then((masters) => {
		return res.status(200).json({masters})})
	.catch((err) => res.status(400).json({errors: err.errors}))
});

export default router;