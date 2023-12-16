const entriesService = require("../services/entries.services");
// const { hashPassword } = require('../utils/bycrypt');

const { ERR, REGISTER_ALREADY_EXIST } = require("../utils/errors");

module.exports = {
  search: async (req, res, next) => {
    try {
      const { q, sort, direction, limit, skip } = req.query;

      const entries = await entriesService.getEntriesByQuery(
        q,
        sort,
        direction,
        limit,
        skip
      );
      res.send(entries);
    } catch (error) {
      console.log(error);
      next(ERR);
    }
  },

  addEntry: async (req, res, next) => {
    try {
      console.log("add entry contr", req.body);

      const newId = await entriesService.addEntry(req.body);

      res.send({ id: newId });
    } catch (error) {
      console.log(error);
      next(ERR);
    }
  },

  getEntries: async (req, res, next) => {
    try {
      const data = await entriesService.getAllEntries();
      res.send(data);
    } catch (error) {
      next(ERR);
    }
  },

  getEntryById: async (req, res, next) => {
    try {
      const { entryId } = req.params;
      console.log(entryId);
      const entry = await entriesService.getEntryById(entryId);
      res.send(entry);
    } catch (error) {
      console.log(error), next(ERR);
    }
  },
  updateEntry: async (req, res, next) => {
    try {
      const { entryId } = req.params;
      // if (req.user.id !== userId && !req.user.permission.editor) {
      //     return next(ERR_NOT_ALLOWED);
      // }
      await entriesService.updateEntry(entryId, req.body);
      res.send("updated");
    } catch (error) {
      console.log(error);
      next(ERR);
    }
  },
  deleteEntry: async (req, res, next) => {
    try {
      const { entryId } = req.params;
      await entriesService.deleteEntry(entryId);
      res.send("deleted");
    } catch (error) {
      next(ERR);
    }
  },
};
