const usersServices = require('../services/users.services');
const { validatePassword, hashPassword } = require('../utils/bycrypt.js');
const {
	ERR,
	ERR_LOGIN_NOT_AUTH,
	ERR_LOGIN_NOT_FOUND,
	ERR_REGISTER_ALREADY_EXIST,
} = require('../utils/errors');
const jwtoken = require('../utils/jwt.js');

module.exports = {
	registerUser: async (req, res, next) => {
		try {
			const { password, email } = req.body;
			const user = await usersServices.getUserByEmail(email);

			if (user) {
				return next(ERR_REGISTER_ALREADY_EXIST);
			}

			const hash = await hashPassword(password);
			const body = { ...req.body, password: hash };
			const newId = await usersServices.addUser(body);

			res.send({ id: newId });
		} catch (error) {
			next(ERR);
		}
	},

	loginUser: async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const user = await usersServices.getUserByEmail(email);
			if (!user) {
				return next(ERR_LOGIN_NOT_FOUND);
			}

			const isValid = await validatePassword(password, user.password);

			if (!isValid) {
				return next(ERR_LOGIN_NOT_AUTH);
			}

			usersServices.clearUser(user);

			const payload = {
				userId: user.id,
			};

			const accessToken = jwtoken.sign(payload);
			res.send(accessToken.accessToken);
		} catch (error) {
			next(ERR);
		}
	},

	getCurrentUser: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			if (!authorization) {
				return res.status(200).send(null);
			}
			const decodedToken = jwtoken.verify(JSON.parse(authorization));
			console.log(decodedToken);
			if (!decodedToken) {
				return res.status(200).send(null);
			}
			const { userId } = decodedToken;
			const currentUser = await usersServices.getUserById(userId);
			res.status(200).send(currentUser);
			console.log(currentUser);
		} catch (error) {
			next(error);
		}
	},
};
