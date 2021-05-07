import express from "express";

const app = express();
app.use(express.json());
const port = 9000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

let todos = [
  { id: 1, text: "this is first todo" },
  { id: 2, text: "this is second todo" },
  { id: 3, text: "this is third todo" },
];

// get todos by id

app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((value) => value.id.toString() === id);
  if (!todo) {
    res.status(404).json({ message: "not found" });
  }

  res.json(todo);
});

//get all todos

app.get("/todos", (req, res) => {
  res.json(todos);
});

// add new todos

app.post("/todo", (req, res) => {
  const { text } = req.body;

  todos.push({ id: todos.length + 1, text });

  res.json({ message: "todo added" });
});

// update todos

app.patch("/todo/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find((value) => value.id.toString() === id);
  if (!todo) {
    res.status(404).json({ message: "not found" });
  }

  todo.text = text;

  res.json(todos);
});

// delete todos
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((value) => value.id.toString() === id);
  if (todoIndex === -1) {
    res.status(404).json({ message: "not found" });
  }

  todos.splice(todoIndex, 1);

  res.json({ message: "todo deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
