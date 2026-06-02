import { openaiResponses, Inngest } from "inngest";

export const inngest = new Inngest({
  id: "inngest-ai",
});

export const gpt4omini = openaiResponses({
    model : 'gpt-4o-mini',
    apiKey : process.env.OPENAI_API_KEY
})