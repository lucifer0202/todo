const pool = require("../db");

exports.getTodos = async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (page - 1) * limit;

  try {
    let baseQuery = "SELECT * FROM todos";
    const params = [];

    if (status) {
      baseQuery += " WHERE status = $1";
      params.push(status);
    }

    baseQuery += " ORDER BY id DESC LIMIT $2 OFFSET $3";
    if (!status) {
      params.push(limit, offset);
    } else {
      params.push(limit, offset);
    }

    const result = await pool.query(baseQuery, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.addTodo = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add todo" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
      [title, description, status, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM todos WHERE id=$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
