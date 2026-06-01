import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { checkOpenAi } from "./ai/ai.js";

const client = await checkOpenAi();
const model = "gpt-4o-mini";

const rl = readline.createInterface({ input, output });
const systemPrompt = `
You are an expert software engineer, computer science tutor, and space enthusiast.
Explain concepts from first principles. Prioritize intuition before formulas. When teaching programming, focus on why something works, not just how to write it. Use clear examples and point out common pitfalls.
Keep answers concise unless the user asks for a deep explanation.`;

let conversation_memory = [];
while (true) {
  const query = await rl.question("What is your question?\n");

  if (query === "exit") {
    console.log("Exited successfully!");
    break;
  }

  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      ...conversation_memory,
      { role: "user", content: query },
    ],
  });
  let last_chunk = null;
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || "";
    if (delta) {
      process.stdout.write(delta);
      last_chunk += delta;
    }
  }

  conversation_memory.push({ role: "user", content: query });
  conversation_memory.push({ role: "assistant", content: last_chunk });

  process.stdout.write("\n\n");
}

rl.close();
