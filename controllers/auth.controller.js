const usersServices = require ('../services/users.services');
const { validatePassword, hashPassword } = require('../utils/bycrypt.js');
const { ERR, ERR_LOGIN_NOT_AUTH, ERR_LOGIN_NOT_FOUND, ERR_REGISTER_ALREADY_EXIST } = require('../utils/errors');
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
            const body = {...req.body, password : hash};
            console.log("body", body);
            const newId = await usersServices.addUser(body);
            console.log('newId : ', newId);

            res.send({ id: newId });

        } catch (error) {
            console.log('here is your error', error)
            next(ERR);
        }
    }, 

    loginUser: async (req, res, next) => {
    
        try {
        
            const { email, password } = req.body;

            const user = await usersServices.getUserByEmail(email);
            console.log('user find in the db', user);
            if (!user) {
                return next(ERR_LOGIN_NOT_FOUND);
            }

            const isValid = await validatePassword(password, user.password);

            if (!isValid) {
                return next(ERR_LOGIN_NOT_AUTH);
            }

            await usersServices.clearUser(user);

            const payload = {
                userId: user.id
            };
   
           const accessToken = jwtoken.sign(payload);
       
            res.send(accessToken.accessToken);
        } catch (error) {
            next(ERR);
        }
    }
}