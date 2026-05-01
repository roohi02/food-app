import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "your-api-key-here",
  dangerouslyAllowBrowser: true, // required for React Native (dev only)
});

export const askFoodAI = async (message: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI chef. Suggest recipes, calories, ingredients, and cooking tips.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.log("OpenAI error:", error);
    return "Sorry, I couldn't process that request.";
  }
};