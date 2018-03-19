import express from "express";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

const router = express.Router();


router.post( "/", ( req, res ) => {
	const { email, username, password } = req.body.user;                               
	// TODO Maybe beatify this function
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
			const error = 'This email is already registered';
			throw error;
		}
	}).catch(err => res.status(400).json({ errors: {global: err}}));
	} 
);

export default router;