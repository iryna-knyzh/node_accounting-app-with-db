'use strict';

const { Expense } = require('../models/Expense.model');

function createExpensesService() {
  async function getAll({ userId, from, to, categories } = {}) {
    let result = await Expense.findAll();

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      result = result.filter((e) => cats.includes(e.category));
    }

    return result;
  }

  function getById(id) {
    return Expense.findByPk(id);
  }

  function create(data) {
    return Expense.create(data);
  }

  function deleteById(id) {
    return Expense.destroy({ where: { id } });
  }

  async function update(id, data) {
    await Expense.update({ ...data }, { where: { id } });

    return Expense.findByPk(id);
  }

  return {
    getAll,
    getById,
    create,
    deleteById,
    update,
  };
}

module.exports = {
  createExpensesService,
};
