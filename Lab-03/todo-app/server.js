const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let todos = [];

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add new todo
app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };
  todos.unshift(todo);
  res.json(todo);
});

// Toggle todo completion
app.patch("/todos/:id/toggle", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.completed = !todo.completed;
  res.json(todo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
