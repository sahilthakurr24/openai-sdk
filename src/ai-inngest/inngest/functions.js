import { inngest, gpt4omini } from "./client.js";

export const onOrderPlaced = inngest.createFunction(
  {
    id: "on-order-placed",
    retries: 2,
    triggers: [{ event: "order-placed" }],
  },
  async ({ event, step }) => {
    const { orderId, customer } = event.data;

    const greeting = await step.run("greet", async () => {
      return `Hello ${customer}! Thanks for your order ${orderId}`;
    });

    await step.run("greeting-log", async () => {
      console.log(greeting);
    });

    return { ok: true };
  },
);

export const sumarizeThenTranslate = inngest.createFunction(
  {
    id: "sumarize-then-translate",
    triggers: [{ event: "sumarize-then-translate" }],
  },
  async ({ event, step }) => {
    //step 1
    const sum = await step.ai.infer("summarize", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content:
              "Summarize the following text in few lines : " + event.data.text,
          },
        ],
      },
    });

    const summary = sum.output[0].content[0].text;

    // step 2

    const tr = await step.ai.infer("translate", {
      model: gpt4omini,
      body: {
        input: [
          {
            role: "user",
            content: `Translate the following text to Hindi ${summary}`,
          },
        ],
      },
    });

    const translation = tr.output[0].content[0].text;

    return translation;
  },
);
