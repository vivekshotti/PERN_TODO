const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db"); // This will help in performing queries on the postgres DB

//middleware
app.use(cors());
app.use(express.json()); // This right here is allowing us to give access to request.body() coming from the frontend. 

app.listen(5000, () => {
    console.log("PERN Server Successfully running on PORT 5000")
})

// ROUTES : //

// CREATE A TODO //
app.post("/todos", async(req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

// GET ALL TODOS //

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// GET A TODO //
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

// UPDATE A TODO //
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatetodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated successfully!")

    } catch (err) {
        console.error(err.message);
    }
})

// DELETE A TODO //
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message);
    }
})