import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";
import authenticate from "../middlewares/authenticate";

const router = express.Router();


router.post( "/", ( req, res ) => {
	const { email, username, password } = req.body.user;                               
	User.findOne({email}).then(user => {
		if ( user === null ){
			const userCredentials = new User( { email } );
			userCredentials.setUsername( username );
			userCredentials.setPassword( password );
			userCredentials
				.save()
				.then( userRecord => res.json( { user: userRecord.toAuthJSON() } ) )
				.catch(err => res.status(400).json({ errors: parseErrors(err.errors)}))
		} else {
			const error = 'Эта почта уже зарегистрирована';
			throw error;
		}
	}).catch(err => res.status(400).json({ errors: {global: err}}));
	} 
);

router.use(authenticate);


router.get( "/", (req, res) => {
	const _id = mongoose.Types.ObjectId(req.currentUser._id);
	User.find({_id})
		.then((user) => res.status(200).json({user}))
		.catch((err) => res.status(400).json({errors: err.errors}))
})

router.post( "/changePassword", ( req, res ) => {
	const { oldPassword, newPassword, newPasswordConfirm } = req.body.passwords;  
	const _id = mongoose.Types.ObjectId(req.currentUser._id);                     
	User.findOne({_id}).then(user => {
		if ((user && user.isValidPassword(oldPassword)) && (newPassword === newPasswordConfirm)) {
			user.setPassword(newPassword);
			user.save()
				.then(userCredentials => res.status(200).json({user: userCredentials}))
		} else {
			res.status(400).json({ errors: { global: "Неправильный старый пароль" } });
		}
	}).catch(err => res.status(400).json({ errors: {global: err}})); 

	}
);
export default router;