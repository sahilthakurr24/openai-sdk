import { checkOpenAi } from "./ai/ai.js";
import { calculator, calculateTool } from "./tools/index.js";

const client = await checkOpenAi();
const model = "gpt-4o-mini";

const tools = [calculateTool];
const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "what is the multiplication of 4 and 4 " },
];

const response1 = await client.chat.completions.create({
  model,
  tool_choice: "auto",
  tools,
  messages,
});

const assistantResponse = response1.choices[0].message;

console.log(assistantResponse);
console.log(assistantResponse.tool_calls);

messages.push(assistantResponse);
//extracting the args from tool_calls object
if (assistantResponse.tool_calls) {
  const tool_call = assistantResponse.tool_calls[0];
  const args = JSON.parse(tool_call.function.arguments);
  const toolResponse = await calculator(args.op, args.a, args.b);
  console.log("+++++++ tool response +++++++");

  messages.push({
    role: "tool",
    tool_call_id: tool_call.id,
    name: tool_call.name,
    content: String(toolResponse),
  });
}
//one more request to the agent to get the final output
const secondResponse = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto",
  tools,
});

console.log("Second resposne -> ", secondResponse.choices[0].message.content);
