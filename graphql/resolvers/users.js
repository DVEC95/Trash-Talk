const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
	Mutation: {
		async register(
			_, 
			{ 
				registerInput: { username, email, password, confirmPassword } 
			}, 
			context, 
			info
			) {
			// TODO: Validate user data
			// TODO: Make sure user doesn't already exist
			// hash password and create auth token
			password = await bcrypt.hash(password, 12);
			
			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			});

			const result = await newUser.save();

			const token = jwt.sign(
				{
					id: result.id,
					email: result.email,
					username: result.username
				}, 
				KEY, 
				{ expiresIn: '1h' }
			)

			return {
				...result._doc,
				id: result._id,
				token
			};
		}
	}
}