// import Constants from "expo-constants";

// const apiKey =
//   (Constants.expoConfig as any)?.extra?.EXPO_PUBLIC_OPENROUTER_API_KEY ||
//   (Constants.manifest2 as any)?.extra?.EXPO_PUBLIC_OPENROUTER_API_KEY ||
//   (Constants.manifest as any)?.extra?.EXPO_PUBLIC_OPENROUTER_API_KEY;

// if (!apiKey) {
//   console.warn("OpenRouter API key is missing!");
// }

// interface StreamResponse {
//   id: string;
//   object: string;
//   created: number;
//   model: string;
//   choices: Array<{
//     index: number;
//     delta: {
//       content?: string;
//     };
//     finish_reason: string | null;
//   }>;
// }

// export async function streamChat(
//   prompt: string,
//   onMessage: (chunk: string) => void
// ): Promise<() => void> {
//   let abortController: AbortController | null = null;

//   try {
//     abortController = new AbortController();

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "https://atpia-app.com",
//         "X-Title": "ATPia-Chatbot",
//       },
//       body: JSON.stringify({
//         model: "mistralai/mistral-7b-instruct",
//         messages: [{ role: "user", content: prompt }],
//         stream: true,
//         max_tokens: 1000,
//         temperature: 0.7,
//       }),
//       signal: abortController.signal,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     if (!response.body) {
//       throw new Error("Response body is null");
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();

//     try {
//       while (true) {
//         const { done, value } = await reader.read();
        
//         if (done) {
//           break;
//         }

//         const chunk = decoder.decode(value, { stream: true });
//         const lines = chunk.split('\n');

//         for (const line of lines) {
//           if (line.startsWith('data: ')) {
//             const data = line.slice(6);
            
//             if (data === '[DONE]') {
//               return () => {
//                 if (abortController) {
//                   abortController.abort();
//                 }
//               };
//             }

//             try {
//               const parsed: StreamResponse = JSON.parse(data);
//               const content = parsed.choices[0]?.delta?.content;
              
//               if (content) {
//                 onMessage(content);
//               }
//             } catch (e) {
//               console.error("Failed to parse stream data:", e);
//             }
//           }
//         }
//       }
//     } finally {
//       reader.releaseLock();
//     }

//     return () => {
//       if (abortController) {
//         abortController.abort();
//       }
//     };
//   } catch (error) {
//     if (abortController) {
//       abortController.abort();
//     }
//     throw error;
//   }
// }
