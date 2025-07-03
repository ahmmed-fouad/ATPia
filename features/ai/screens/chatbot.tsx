import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bot, Send, Sparkles, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

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

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener?.remove();
            keyboardDidHideListener?.remove();
        };
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
        
        let aiResponse = "";
        
        try {
            await streamChat(userMessage.text, async (chunk: string) => {
                await delay(50); // Faster response
                aiResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && !lastMessage.isUser) {
                        lastMessage.text = aiResponse;
                    } else {
                        newMessages.push({
                            id: (Date.now() + 1).toString(),
                            text: aiResponse,
                            isUser: false,
                            timestamp: new Date()
                        });
                    }
                    return [...newMessages];
                });
            });
        } catch (error) {
            console.error("Error in chat:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I encountered an error. Please try again.",
                isUser: false,
                timestamp: new Date()
            }]);
        } finally {
            setIsFetching(false);
        }
    };

    const renderMessage = (message: Message) => (
        <View key={message.id} className={`flex-row mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <View className={`flex-row max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <View className={`w-8 h-8 rounded-full items-center justify-center mx-2 ${
                    message.isUser 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                }`}>
                    {message.isUser ? (
                        <User size={16} color="white" />
                    ) : (
                        <Bot size={16} color="white" />
                    )}
                </View>
                
                {/* Message Bubble */}
                <View className={`px-4 py-3 rounded-2xl ${
                    message.isUser 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : 'bg-gray-100 border border-gray-200'
                }`}>
                    <Text className={`text-base leading-6 ${
                        message.isUser ? 'text-white' : 'text-gray-800'
                    }`}>
                        {message.text}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 pt-12">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
              <Sparkles size={20} color="white" />
            </View>
            <View>
              <Text className="text-white text-xl font-bold">
                ATPia AI Assistant
              </Text>
              <Text className="text-emerald-100 text-sm">
                Powered by advanced AI
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {messages.length === 0 ? (
            <View className="flex-1 items-center justify-center py-20">
              <View className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mb-4">
                <Bot size={32} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to ATPia AI
              </Text>
              <Text className="text-gray-600 text-center text-base max-w-xs">
                I'm here to help you with your health and nutrition journey. Ask
                me anything!
              </Text>
            </View>
          ) : (
            messages.map(renderMessage)
          )}

          {isFetching && (
            <View className="flex-row mb-4 justify-start">
              <View className="flex-row max-w-[80%]">
                <View className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 items-center justify-center mx-2">
                  <Bot size={16} color="white" />
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
            <View
                className="absolute bg-white border-t border-gray-200 px-4 py-4"
                style={{
                    bottom: keyboardHeight > 0 ? keyboardHeight : 0,
                }}
            >
                <View className="flex-row items-end space-x-3 relative">
                    <View className="flex-1 bg-gray-50 rounded-2xl">
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Type your message..."
                            className="text-base text-gray-800 w-full p-4"
                            style={{
                                textAlignVertical: "top",
                                minHeight: 100,
                                maxHeight: 120,
                            }}
                            onSubmitEditing={handleSend}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleSend}
                        disabled={isFetching || !input.trim()}
                        className={`w-12 h-12 rounded-full items-center justify-center ${
                            isFetching || !input.trim()
                                ? "bg-gray-300"
                                : "bg-gradient-to-r from-emerald-500 to-emerald-600"
                        }`}
                    >
                        <Send size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
      </View>
    );
}

export default Chatbot;
