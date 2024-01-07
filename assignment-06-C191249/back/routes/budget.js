// var express = require("express");
// var router = express.Router();

// /* GET Available Budget. */
// router.get("/", function (req, res, next) {
//     const availableBudget = 20500.0;
//     res.send(JSON.stringify(availableBudget));
// });

// /* GET Income. */
// router.get("/income", function (req, res, next) {
//     const income = 30500.0;
//     res.send(JSON.stringify(income));
// });

// /* GET Expense. */
// router.get("/expense", function (req, res, next) {
//     const expense = 10000.0;
//     res.send(JSON.stringify(expense));
// });

// module.exports = router;

const express = require("express");
const db = require("../database");
const router = express.Router();

/* GET Available Budget. */
router.get("/", async function (req, res, next) {
  try {
    // Fetch available budget from the database
    //income
    const result_income = await db.query("SELECT SUM(value) as total FROM entries WHERE type = 'income'");
    const income = parseFloat(result_income.rows[0].total || 0);
    //expense
    const result_expense = await db.query("SELECT SUM(value) as total FROM entries WHERE type = 'expense'");
    const expense = parseFloat(result_expense.rows[0].total || 0);
    //budget
    const availableBudget = parseFloat(income - expense || 0);
    res.json({ availableBudget });
  } catch (error) {
    console.error("Error fetching available budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* GET Income. */
router.get("/income", async function (req, res, next) {
  try {
    // Fetch total income from the database
    const result = await db.query("SELECT SUM(value) as total FROM entries WHERE type = 'income'");
    const income = parseFloat(result.rows[0].total || 0);
    res.json({ income });
  } catch (error) {
    console.error("Error fetching income:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* GET Expense. */
router.get("/expense", async function (req, res, next) {
  try {
    // Fetch total expense from the database
    const result = await db.query("SELECT SUM(value) as total FROM entries WHERE type = 'expense'");
    const expense = parseFloat(result.rows[0].total || 0);
    res.json({ expense });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
