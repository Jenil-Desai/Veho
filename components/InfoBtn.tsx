import { useState } from "react";
import {
  Popover,
  PopoverArrow,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "./ui/popover";
import { Text, TouchableOpacity, View } from "react-native";

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
  triggerComponent: JSX.Element;
}

export default function InfoBtn({
  text,
  placment,
  triggerComponent,
}: InfoBtnProps) {
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
            {triggerComponent}
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
