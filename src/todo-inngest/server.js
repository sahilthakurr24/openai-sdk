import "dotenv/config";
import express from "express";
import { createTodo, deleteTodo, todos } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/functions.js";

let app = express();

//basic middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("TODOS:", todos);

//inngest integration with auto-detection
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated, onTodoDeleted],
  }),
);

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  const todo = createTodo(title);

  if (!todo) {
    return res.status(500).json({
      error: "Unable to create todo",
    });
  }

  await inngest.send({
    name: "todo/created",
    data: { todo },
  });

  return res.status(201).json({
    message: "Todo created successfully",
    todo,
  });
});


app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({
        error: "Id is missing",
      });
    }
  
    const todo = deleteTodo(Number(id));
  
    if (!todo) {
      return res.status(404).json({
        error: `Todo with id ${id} not found`,
      });
    }
  
    // Trigger event
    await inngest.send({
      name: "todo/deleted",
      data: {
        todo,
      },
    });
  
    return res.status(200).json({
      message: "Todo deleted successfully",
      deletedTodo: todo,
    });
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
