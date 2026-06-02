import "dotenv/config";
import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onOrderPlaced, sumarizeThenTranslate } from "./inngest/functions.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onOrderPlaced, sumarizeThenTranslate],
  }),
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
