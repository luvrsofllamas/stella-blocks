import React from "react";
import { Pressable, View } from "react-native";

type BlockProps = {
  type: string;
  size: number;
  onPressCell?: (x: number, y: number) => void;
  x: number;
  y: number;
};

const Block: React.FC<BlockProps> = ({ type, size, onPressCell, x, y }) => {
  let backgroundColor: string;
  let innerComponent = undefined;

  switch (type) {
    case "X":
      backgroundColor = "black";
      break;
    case ".":
      backgroundColor = "white";
      innerComponent = (
        <View
          style={{
            width: size / 2,
            height: size / 2,
            backgroundColor: "blue",
            borderRadius: size / 4,
          }}
        />
      );
      break;
    default:
      backgroundColor = "white";
  }

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
            backgroundColor,
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {innerComponent}
      </View>
    </Pressable>
  );
};

type SokobanMapProps = {
  map: string[];
  size?: number;
  onPressCell?: (x: number, y: number) => void;
};

export const Map: React.FC<SokobanMapProps> = ({
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
              type={cell}
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
} as const;

const $row = {
  flexDirection: "row",
} as const;

const $block = {
  width: 8,
  height: 8,
  borderWidth: 1,
  borderColor: "gray",
} as const;

const $appContainer = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
