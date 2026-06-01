import { checkOpenAi } from "./ai/ai.js";

const client = await checkOpenAi();
const model = "gpt-4o-mini";

const response = await client.chat.completions.create({
  model,
  messages: [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "hey! whats up!" },
  ],
});

console.log(response.choices[0].message.content);
