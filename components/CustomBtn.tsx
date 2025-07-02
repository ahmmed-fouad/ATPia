import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: CustomBtnProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]";
        case "ghost":
            return "bg-transparent";
        default:
            return "bg-blue-500";
    }
}

const getTextVariantStyle = (variant: CustomBtnProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-white";
    }
}

export const CustomBtn = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: CustomBtnProps) => (
  <TouchableOpacity onPress={onPress} 
  className={`flex flex-row items-center justify-center w-full h-12 rounded-full shadow-md shadow-neutral-400/70
   ${getBgVariantStyle(bgVariant)} ${className}`} {...props}>
    {IconLeft && <IconLeft />}
    <Text className={`font-bold text-lg ${getTextVariantStyle(textVariant)}`}>{title}</Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomBtn;
