import { checkOpenAi } from "./ai/ai.js";

const client = await checkOpenAi();
const model = "gpt-4o-mini";

const system_prompt = "You are a helpful assistant";

//an array to store the converstion context
let conversation_memory = [];

async function askQuestion(system_prompt, user_question, history = []) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system_prompt },
      ...history,
      { role: "user", content: user_question },
    ],
  });
  history.push({ role: "user", content: user_question });
  history.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });
  return response.choices[0].message.content;
}

const response1 = await askQuestion(
  system_prompt,
  "My name is Sahil tell me one line joke",
  conversation_memory,
);
console.log("Response1->", response1);
const response2 = await askQuestion(
  system_prompt,
  "What is my name?",
  conversation_memory,
);
console.log("Response2->", response2);
