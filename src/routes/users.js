import express from "express";
import User from "../models/User";
// import parseErrors from "../utils/parseErrors";

const router = express.Router();


// TODO Добавить обработку ошибок
router.post( "/", ( req, res ) => {
	console.log( 'users' );
	const { email, password } = req.body.user;
	const user = new User( { email } );
	user.setPassword( password );
	user
		.save()
		.then( userRecord => res.json( { user: userRecord.toAuthJSON() } ) )
} );

export default router;