import express from "express";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

const router = express.Router();


router.post( "/", ( req, res ) => {
	const { email, username, password } = req.body.user;                               
	//Check on same email in database
	User.findOne({email: email}).then(user => {
		if ( user === null ){
			const user = new User( { email } );
			user.setUsername( username );
			user.setPassword( password );
			user
				.save()
				.then( userRecord => res.json( { user: userRecord.toAuthJSON() } ) )
				.catch(err => res.status(400).json({ errors: parseErrors(err.errors)}))
		} else {
			throw 'This email is already registered';
		}
	}).catch(err => res.status(400).json({ errors: {global: err}}));
	} 
);

export default router;