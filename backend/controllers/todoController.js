const Todo = require("../models/Todo");

// Get all todos
const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

// Create todo
const createTodo = async (req, res) => {

    const todo = await Todo.create({
        title: req.body.title
    });

    res.status(201).json(todo);
};

// Delete todo
const deleteTodo = async (req, res) => {

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
        message: "Todo Deleted"
    });
};

// Update Todo
const updateTodo = async (req, res) => {

    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
};

module.exports = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo
};