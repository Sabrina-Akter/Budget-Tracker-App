var express = require("express");
const db = require("../database");
var router = express.Router();

router.get("/", async function (req, res) {
    // fetch data from postgres
    const result = await db.query("SELECT * FROM entries;");

    // send the data as response
    res.send(result.rows);
});

router.post("/", async function (req, res) {
    // read data from client
    const { category, title, value, type } = req.body;

    // save data to database
    const result = await db.query(
        `INSERT INTO entries (category, title, value, type) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [category, title, value, type]
    );

    // send the new entry as response
    res.send("post");
    console.log(result);
});

// GET all income entries
router.get("/income", async function (req, res) {
    try {
      const result = await db.query("SELECT * FROM entries WHERE type = 'income';");
      res.send(result.rows);
    } catch (error) {
      console.error("Error fetching income entries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.patch("/:id", async function (req, res) {
    res.send({});
});

// GET all income entries
router.get("/expense", async function (req, res) {
    try {
      const result = await db.query("SELECT * FROM entries WHERE type = 'expense';");
      res.send(result.rows);
    } catch (error) {
      console.error("Error fetching income entries:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.patch("/:id", async function (req, res) {
    res.send({});
});

router.delete("/:id", async function (req, res) {
  const entryId = req.params.id;

  try {
    // Delete entry from the database
    await db.query("DELETE FROM entries WHERE id = $1", [entryId]);

    res.status(204).send(); // No content, successful deletion
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /:id - get single entry
// PATCH /:id - update single entry
// DELTE /:id - delete single entry

module.exports = router;
