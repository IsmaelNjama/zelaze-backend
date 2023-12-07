const usersServices = require ('../services/users.services');
// const { validatePassword, hashPassword } = require('../utils/bycrypt');
// const { ERR, ERR_LOGIN_NOT_AUTH, ERR_LOGIN_NOT_FOUND, ERR_REGISTER_ALREADY_EXIST } = require('../utils/errors');
// const jwtoken = require('../utils/jwtoken');

module.exports = {
    registerUser: async (req, res, next) => {
        try {
            const newId = await usersServices.addUser(req.body);
            res.send(newId)
        } catch (error) {
    console.log(error)        
        }
    },

    //     try {
    //         const { password, email } = req.body;

    //         const user = await usersServices.getUserByEmail(email);
           

    //         if (user) {
    //             return next(ERR_REGISTER_ALREADY_EXIST);
    //         }

    //         const hash = await hashPassword(password);
    //         console.log('hash: ', hash);
    //         const newId = await usersServices.addUser(req.body, hash);
    //         console.log('newId : ', newId);

    //         res.send({ id: newId });

    //     } catch (error) {
    //         next(ERR);
    //     }
    // }, 

    loginUser: async (req, res, next) => {
    
        try {
        
            const { email, password } = req.body;

            const user = await usersServices.getUserByEmail(email);
            console.log('user find in the db', user);
            if (!user) {
                return next(ERR_LOGIN_NOT_FOUND);
            }

            // const isValid = await validatePassword(password, user.password);

            // if (!isValid) {
            //     return next(ERR_LOGIN_NOT_AUTH);
            // }

            await usersServices.clearUser(user);

        //     const payload = {
        //         userId: user._id
        //     };
              
        //    const accessToken = jwtoken.sign(payload);
        //    console.log(accessToken);

            res.send(user);
        } catch (error) {
            next(ERR);
        }
    }
}