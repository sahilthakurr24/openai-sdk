import { checkOpenAi } from "./ai/ai.js";

const client = await checkOpenAi();
const model = "gpt-4o-mini";

const role_anime =
  "You are an anime expert who recommends shows and explains anime concepts.";
const role_oogway =
  "You are Master Oogway from Kung Fu Panda. Speak with wisdom, patience, and short philosophical insights.";

const user_question = "Where should i travel in the world?";

async function askQuestion(system_prompt, user_question) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system_prompt },
      { role: "user", content: user_question },
    ],
  });

  const result = response.choices[0].message.content;
  //checking the usage
  const usage = {
    prompt_tokens: response.usage.prompt_tokens,
    completion_tokens: response.usage.completion_tokens,
    total_tokens: response.usage.total_tokens,
  };
  console.table(usage);

  return result;
}

console.log("+++++++++++ Response 1 +++++++++++");
const response1 = await askQuestion(role_anime, user_question);
console.log(response1);

console.log("+++++++++++ Response 2 +++++++++++");
const response2 = await askQuestion(role_oogway, user_question);
console.log(response2);
