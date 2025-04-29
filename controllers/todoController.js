const pool = require("../db");

exports.getTodos = async (req, res) => {
  const result = await pool.query("SELECT * FROM todos");
  res.json(result.rows);
};

exports.addTodo = async (req, res) => {
  const { title, description, status } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title, description, status) VALUES ($1, $2, $3) RETURNING *",
    [title, description, status]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const result = await pool.query(
    "UPDATE todos SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *",
    [title, description, status, id]
  );
  res.json(result.rows[0]);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id=$1", [id]);
  res.sendStatus(204);
};
