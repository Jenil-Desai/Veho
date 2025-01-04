import { useState } from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "./ui/popover";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InfoBtnProps {
  text: string;
  placment:
    | "top"
    | "top left"
    | "top right"
    | "bottom"
    | "bottom left"
    | "bottom right"
    | "right"
    | "right top"
    | "right bottom"
    | "left"
    | "left top"
    | "left bottom";
}

export default function InfoBtn({ text, placment }: InfoBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      placement={placment}
      size="xs"
      trigger={(triggerProps) => {
        return (
          <TouchableOpacity {...triggerProps}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              style={styles.infoBtn}
            />
          </TouchableOpacity>
        );
      }}
    >
      <PopoverBackdrop />
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text className="text-typography-900">{text}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

const styles = StyleSheet.create({
  infoBtn: {
    fontFamily: "outfit",
  },
});
