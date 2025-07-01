declare interface CustomBtnProps extends TouchableOpacityProps {
    onPress: () => void;
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
    textVariant?: "primary" | "secondary" | "danger" | "success" | "default";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
    [key: string]: any;
}