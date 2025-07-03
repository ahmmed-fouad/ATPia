import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bot, Send, Sparkles, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { streamChat } from "../services/streamApi";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [aiResponse, setAiResponse] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    // Removed keyboardHeight state and listeners

    useEffect(() => {
        const loadPrefill = async () => {
            try {
                const prefill = await AsyncStorage.getItem("chatbot_prefill");
                if (prefill) {
                    setInput(prefill);
                    await AsyncStorage.removeItem("chatbot_prefill");
                }
            } catch (error) {
                console.error("Error loading prefill:", error);
            }
        };
        loadPrefill();
    }, []);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage: Message = {
            id: Date.now().toString(),
            text: input.trim(),
            isUser: true,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsFetching(true);
        setAiResponse("");
        setHasError(false);
        
        let responseText = "";
        
        try {
            await streamChat(userMessage.text, async (chunk: string) => {
                await delay(50); // Faster response
                responseText += chunk;
                setAiResponse(responseText);
            });
        } catch (error) {
            console.error("Error in chat:", error);
            setHasError(true);
            setAiResponse("Sorry, I encountered an error. Please try again.");
        } finally {
            setIsFetching(false);
        }
    };

    const renderMessage = (message: Message) => (
        <View key={message.id} className={`flex-row mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <View className={`flex-row w-full ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <View className={`w-8 h-8 rounded-full items-center justify-center mx-2 ${
                    message.isUser 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                }`}>
                    {message.isUser ? (
                        <User size={20} color="black" />
                    ) : (
                        <Bot size={20} color="black" />
                    )}
                </View>
                
                {/* Message Bubble */}
                <View className={`px-4 py-3 rounded-2xl ${
                    message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gray-100 border border-gray-200'
                }`}>
                    <Text className={`text-base leading-6 ${
                        message.isUser ? 'text-black' : 'text-gray-800'
                    }`}>
                        {message.text}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
      <View className="flex-1 bg-green-100 p-4">
        {/* Header */}
        <View className="px-6 py-4 pt-12">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-green-500 items-center justify-center mr-3 rounded-full">
              <Sparkles size={20} color="white" />
            </View>
            <View className="flex-1 w-full flex-row justify-between items-center">
              <Text className=" text-md font-bold">
                ATPia AI Assistant , Powered by advanced AI
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Always show welcome area */}
          <View className="flex-1 items-center justify-center py-20">
            <View className=" rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mb-4">
              <Bot size={38} color="green" />
            </View>
            <Text className="text-2xl font-bold text-red-800 mb-2">
              Welcome to ATPia AI
            </Text>
            <Text className="text-gray-600 text-center text-base max-w-xs">
              I'm here to help you with your health and nutrition journey. Ask
              me anything!
            </Text>
          </View>

          {/* Show user messages */}
          {messages.map(renderMessage)}

          {/* Show AI response in dedicated area */}
          {aiResponse && (
            <View className="flex-row mb-4 justify-center items-start h-full">
              <View className="flex-row max-w-[80%]  justify-start p-4 w-full">
                <View className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mx-2">
                  <Bot size={25} color="green" />
                </View>
                <View
                  className={`px-4 py-3 rounded-2xl ${
                    hasError ? "bg-red-100" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-base leading-6 ${
                      hasError ? "text-red-800" : "text-gray-800"
                    }`}
                  >
                    {aiResponse}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {isFetching && (
            <View className="flex-row mb-4 justify-start">
              <View className="flex-row max-w-[80%]">
                <View className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mx-2">
                  <Bot size={16} color="gray" />
                </View>
                <View className="px-4 py-3 rounded-2xl bg-gray-100 border border-gray-200">
                  <View className="flex-row space-x-1">
                    <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    <View
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <View
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 160}
        >
          <View className="bg-white border-t border-gray-200 px-0 py-4">
            <View className="flex-row items-end">
              <View className="flex-1 bg-gray-50 rounded-2xl">
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Type your message..."
                  className="text-base text-gray-800 w-full p-4 bg-gray-300"
                  style={{
                    textAlignVertical: "top",
                    minHeight: 120,
                    // width: "100%",
                  }}
                  onSubmitEditing={handleSend}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  disabled={isFetching || !input.trim()}
                  className="absolute left-2 bottom-2 w-12 h-12 rounded-full items-center justify-center bg-red-500"
                  style={{ position: "absolute", right: 8, bottom: 8 }}
                >
                  <Send size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
}

export default Chatbot;
