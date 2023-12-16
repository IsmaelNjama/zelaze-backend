const usersService = require("../services/users.services");
// const { hashPassword } = require('../utils/bycrypt');

const { ERR, REGISTER_ALREADY_EXIST } = require("../utils/errors");

module.exports = {
  search: async (req, res, next) => {
    try {
      const { q, sort, direction, limit, skip } = req.query;

      const users = await usersService.getUsersByQuery(
        q,
        sort,
        direction,
        limit,
        skip
      );

      res.send(users);
    } catch (error) {
      next(ERR);
    }
  },

  addUser: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      const existed = await usersService.getUserByEmail(email);

      if (existed) {
        return next(REGISTER_ALREADY_EXIST);
      }

      // const hash = await hashPassword(password);

      const newId = await usersService.addUser(req.body);

      res.send({ id: newId });
    } catch (error) {
      next(ERR);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const data = await usersService.getAllUsers();
      res.send(data);
    } catch (error) {
      next(ERR);
    }
  },

  getMe: (req, res, next) => {
    try {
      const user = req.user;

      usersService.clearUser(user);

      res.send(user);
    } catch (error) {
      return next(ERR);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await usersService.getUserById(userId);
      res.send(user);
    } catch (error) {
      next(ERR);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      // if (req.user.id !== userId && !req.user.permission.editor) {
      //     return next(ERR_NOT_ALLOWED);
      // }
      await usersService.updateUser(userId, req.body);
      res.send("updated");
    } catch (error) {
      next(ERR);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      await usersService.deleteUser(userId);
      res.send("deleted");
    } catch (error) {
      next(ERR);
    }
  },
};
