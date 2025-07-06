import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatService } from '../../services/chatService';
import { ChatHistoryItem as ChatHistoryItemType } from '../../types/chat';

interface ChatHistoryItemProps {
  item: ChatHistoryItemType;
  isSelected: boolean;
  onPress: (chatId: string) => void;
  onLongPress?: (chatId: string) => void;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({
  item,
  isSelected,
  onPress,
  onLongPress,
}) => {
  const handlePress = () => onPress(item.id);
  const handleLongPress = () => onLongPress?.(item.id);

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name="chatbubble-outline" 
          size={20} 
          color={isSelected ? "#FFFFFF" : "#6B7280"} 
        />
      </View>
      
      <View style={styles.content}>
        <Text 
          style={[styles.title, isSelected && styles.selectedTitle]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text 
          style={[styles.timestamp, isSelected && styles.selectedTimestamp]}
        >
          {ChatService.formatTimestamp(item.timestamp)}
        </Text>
      </View>
      
      {item.messageCount > 0 && (
        <View style={[styles.messageCount, isSelected && styles.selectedMessageCount]}>
          <Text style={[styles.messageCountText, isSelected && styles.selectedMessageCountText]}>
            {item.messageCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  selectedContainer: {
    backgroundColor: '#3B82F6',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  selectedTitle: {
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  selectedTimestamp: {
    color: '#E0E7FF',
  },
  messageCount: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  selectedMessageCount: {
    backgroundColor: '#FFFFFF',
  },
  messageCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedMessageCountText: {
    color: '#3B82F6',
  },
}); 