import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  Bot,
  MessageCircle,
  ScanBarcode,
  Activity,
  TrendingUp,
  Repeat,
  ClipboardList,
  BarChart2,
  Utensils,
  Calculator,
  BookOpen,
  ShoppingCart,
  Users,
  MessageSquare,
  Star,
  MessageCircleMore,
  Menu,
} from 'lucide-react-native';

interface MenuDropdownProps {
  isVisible: boolean;
  onClose: () => void;
}

const CARD_BG = '#fff';
const SHADOW = Platform.OS === 'ios' ? {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 16,
} : {
  elevation: 12,
};

const categories = [
  {
    key: 'ai',
    label: 'AI',
    icon: <Bot size={25} color="#6366f1" />,
    items: [
      { key: 'chatbot', label: 'AI Chatbot', icon: <MessageCircle size={22} color="#6366f1" /> },
      { key: 'foodscanner', label: 'Food Scanner', icon: <ScanBarcode size={22} color="#6366f1" /> },
    ],
  },
  {
    key: 'tracking',
    label: 'Tracking',
    icon: <Activity size={25} color="#06b6d4" />,
    items: [
      { key: 'progress', label: 'Progress', icon: <TrendingUp size={22} color="#06b6d4" /> },
      { key: 'habits', label: 'Habits', icon: <Repeat size={22} color="#06b6d4" /> },
      { key: 'form', label: 'Form', icon: <ClipboardList size={22} color="#06b6d4" /> },
      { key: 'analytics', label: 'Analytics', icon: <BarChart2 size={22} color="#06b6d4" /> },
    ],
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    icon: <Utensils size={25} color="#f59e42" />,
    items: [
      { key: 'calculator', label: 'Calculator', icon: <Calculator size={22} color="#f59e42" /> },
      { key: 'mealplans', label: 'Meal Plans', icon: <BookOpen size={22} color="#f59e42" /> },
      { key: 'recipes', label: 'Recipes', icon: <BookOpen size={22} color="#f59e42" /> },
      { key: 'grocerylist', label: 'Grocery List', icon: <ShoppingCart size={22} color="#f59e42" /> },
    ],
  },
  {
    key: 'social',
    label: 'Social',
    icon: <Users size={25} color="#10b981" />,
    items: [
      { key: 'forum', label: 'Forum', icon: <MessageSquare size={22} color="#10b981" /> },
      { key: 'blog', label: 'Blog', icon: <MessageCircleMore size={22} color="#10b981" /> },
      { key: 'testimonials', label: 'Testimonials', icon: <Star size={22} color="#10b981" /> },
      { key: 'chat', label: 'Chat', icon: <MessageCircle size={22} color="#10b981" /> },
    ],
  },
];

const MenuDropdown: React.FC<MenuDropdownProps> = ({ isVisible, onClose }) => {
  const [animation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(0.95));

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          tension: 120,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 0.95,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.18)' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.dropdown,
            SHADOW,
            {
              opacity: animation,
              transform: [
                { scale: scaleAnimation },
                { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] }) },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Explore</Text>
          </View>
          {categories.map((cat, idx) => (
            <View key={cat.key} style={styles.categorySection}>
              <View style={styles.categoryRow}>
                <View style={[styles.categoryIconCircle, { backgroundColor: getCategoryBg(cat.key) }]}>{cat.icon}</View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </View>
              <View style={styles.subItemsList}>
                {cat.items.map((item) => (
                  <TouchableOpacity key={item.key} style={styles.subItem} activeOpacity={0.7}>
                    <View style={styles.subItemIconCircle}>{item.icon}</View>
                    <Text style={styles.subItemLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {idx !== categories.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Tap outside to close</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

function getCategoryBg(key: string) {
  switch (key) {
    case 'ai': return '#e0e7ff';
    case 'tracking': return '#cffafe';
    case 'nutrition': return '#fef3c7';
    case 'social': return '#d1fae5';
    default: return '#f3f4f6';
  }
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 135,
    left: 8,
    minWidth: 250,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderTopLeftRadius: 0,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 1,
    paddingHorizontal: 12,
    backgroundColor: "#f1f5f9",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 2,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    letterSpacing: 0.2,
  },
  categorySection: {
    backgroundColor: CARD_BG,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  categoryIconCircle: {
    width: 25,
    height: 25,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  categoryLabel: {
    fontSize: 16,
    color: "#334155",
    fontWeight: "700",
  },
  subItemsList: {
    marginLeft: 60,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderRadius: 10,
    marginBottom: 2,
  },
  subItemIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  subItemLabel: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginHorizontal: 24,
    marginVertical: 4,
  },
  footer: {
    backgroundColor: "#f9fafb",
    paddingVertical: 1,
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 18,
  },
  footerText: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default MenuDropdown; 