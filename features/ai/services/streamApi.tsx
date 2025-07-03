// For React Native, you'll need to set up environment variables differently
// You can use react-native-dotenv or expo-constants
const API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY || 'your-api-key-here';

export async function streamChat(
  prompt: string,
  onMessage: (chunk: string) => void
) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://your-app.com", // Update this to your app's URL
          "X-Title": "ATPia-Chatbot",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk
        .split("\n")
        .filter((line) => line.trim().startsWith("data:"));

      for (const line of lines) {
        const json = line.replace("data: ", "").trim();
        if (json === "[DONE]") break;

        try {
          const parsed = JSON.parse(json);
          const token = parsed?.choices?.[0]?.delta?.content;
          if (token) {
            onMessage(token);
          }
        } catch (e) {
          console.error("Failed to parse chunk:", json);
        }
      }
    }
  } catch (error) {
    console.error("Stream chat error:", error);
    throw error;
  }
}
