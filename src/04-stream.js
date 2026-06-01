import { checkOpenAi } from "./ai/ai.js";

const client = await checkOpenAi();
const model = "gpt-4o-mini";

async function stream() {
  return await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "assistant", content: "You are a helpful assistant" },
      { role: "user", content: "Yo! tell me 5 cool facts about space" },
    ],
  });
}
let last_chunk = null;
const responseStream = await stream();
for await (const chunk of responseStream) {
  const delta = chunk.choices[0]?.delta.content;
  if (delta) {
    process.stdout.write(delta);
  }
  last_chunk += delta;
}
