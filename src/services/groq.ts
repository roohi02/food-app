export const askGroqAI = async (prompt: string) => {
 const API_KEY = process.env.EXPO_PUBLIC_GROQ_KEY;

  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful food chef. Give recipes with calories and ingredients.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("🔥 GROQ RESPONSE:", data);

    return data?.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.log("❌ GROQ ERROR:", error);
    return "";
  }
};