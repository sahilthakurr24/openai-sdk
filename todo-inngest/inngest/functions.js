import { inngest } from "./client.js";
import { auditLog } from "../store.js";

export const onTodoCreated = inngest.createFunction(
  {
    id: "on-todo-created",
    triggers: [{ event: "todo/created" }],
  },
  async ({ event, step }) => {
    await step.run("audit", async () => {
      auditLog.push({
        action: "created",
        id: event.data.todo.id,
        title: event.data.todo.title,
        timestamp: new Date().toISOString(),
      });

      return { ok: true };
    });
  },
);

export const onTodoDeleted = inngest.createFunction(
  {
    id: "on-todo-deleted",
    retries: 2,
    triggers: [{ event: "todo/deleted" }],
  },
  async ({ event, step, attempt }) => {
    const id = event.data.todo.id;

    await step.run("cleanup", async () => {
      //simultae a failure one the first attempt
      if (attempt === 0) {
        throw new Error(`Failed to clean up after deleting this ${id}`);
      }

      return "cleaned up successfully";
    });

    await step.run("audit", async () => {
      auditLog.push({
        action: "deleted",
        todoId: id,
      });

      return { ok: true };
    });
  },
);
