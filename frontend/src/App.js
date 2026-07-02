import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

    const [todos, setTodos] = useState([]);

    const [title, setTitle] = useState("");

    const API = "http://localhost:5000/api/todos";

    const fetchTodos = async () => {

        const res = await axios.get(API);

        setTodos(res.data);
    };

    useEffect(() => {

        fetchTodos();

    }, []);

    const addTodo = async () => {

        if (!title) return;

        await axios.post(API, {

            title

        });

        setTitle("");

        fetchTodos();
    };

    const deleteTodo = async (id) => {

        await axios.delete(`${API}/${id}`);

        fetchTodos();
    };

    const toggleTodo = async (id) => {

        await axios.put(`${API}/${id}`);

        fetchTodos();
    };

    return (

        <div className="container">

            <h1>Docker Todo App</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Todo"
            />

            <button onClick={addTodo}>

                Add

            </button>

            <hr />

            {

                todos.map(todo => (

                    <div
                        key={todo._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "15px"
                        }}
                    >

                        <span
                            onClick={() => toggleTodo(todo._id)}
                            style={{
                                cursor: "pointer",
                                textDecoration: todo.completed ? "line-through" : "none"
                            }}
                        >

                            {todo.title}

                        </span>

                        <button
                            onClick={() => deleteTodo(todo._id)}
                        >

                            Delete

                        </button>

                    </div>

                ))

            }

        </div>

    );
}

export default App;