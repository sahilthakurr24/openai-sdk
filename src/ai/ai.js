import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

export const Api_Checker = () => {
  if (!API_KEY) {
    console.error("API keys are not loaded :-(");
    process.exit(1);
  }
};

export const checkOpenAi = async () => {
  const openai = (await import("openai")).default;
  const client = new openai.OpenAI({
    apiKey: API_KEY,
  });

  if (!client) {
    console.error("No client");
  }
  console.log("OpenAi client intialized successfully");
  return client;
};
