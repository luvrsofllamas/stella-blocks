import React from "react";
import { Pressable, View } from "react-native";

type TouchableBlockProps = {
  size: number;
  onPressCell?: (x: number, y: number) => void;
  x: number;
  y: number;
};

const Block: React.FC<TouchableBlockProps> = ({ size, onPressCell, x, y }) => {
  let innerComponent = undefined;

  const myOnPressCell = () => {
    if (onPressCell) {
      onPressCell(x, y);
    }
  };

  return (
    <Pressable onPress={myOnPressCell}>
      <View
        style={[
          $block,
          {
            backgroundColor: "transparent",
            width: size,
            height: size,
          },
        ]}
      >
        {innerComponent}
      </View>
    </Pressable>
  );
};

type TouchableOverlayProps = {
  map: string[];
  size?: number;
  onPressCell?: (x: number, y: number) => void;
};

export const TouchableOverlay: React.FC<TouchableOverlayProps> = ({
  map,
  size = 8,
  onPressCell,
}) => {
  return (
    <View style={$container}>
      {map.map((row, rowIndex) => (
        <View key={rowIndex} style={$row}>
          {row.split("").map((cell, cellIndex) => (
            <Block
              key={cellIndex}
              size={size}
              onPressCell={onPressCell}
              y={rowIndex}
              x={cellIndex}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

// Styles as individual variables
const $container = {
  flexDirection: "column",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

const $row = {
  flexDirection: "row",
} as const;

const $block = {
  width: 8,
  height: 8,
  borderWidth: 1,
  borderColor: "transparent",
} as const;

