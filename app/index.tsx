import { Canvas, Rect } from "@shopify/react-native-skia";
import { useState } from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { Map } from "@/components/Map";

const map = [
  "XXXXXXXXXX",
  "X     X  X",
  "XX OOO   X",
  "X  ...   X",
  "X   XX   X",
  "X   X  X X",
  "X   X  X X",
  "X   X    X",
  "X       XX",
  "XXXXXXXXXX",
]

function wouldCollideWithWall(x, y, map) {
  return map[y][x] === "X";
}

function constrainValue(value) {
  return Math.max(Math.min(value, 9), 0);
}

const Button = ({ onPress, title, orientation }) => (
  <View
    style={{
      width: orientation === "vertical" ? 75 : 100,
      height: orientation === "vertical" ? 100 : 75,
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
    }}
    onTouchEnd={onPress}
  >
    <Text style={{ color: "white" }}>{title}</Text>
  </View>
);

export default function Index() {
  const windowDimensions = useWindowDimensions();

  const gameField = {
    width: windowDimensions.width - 20,
    height: windowDimensions.width - 20,
    blockSize: (windowDimensions.width - 20) / 10,
  };

  const [player, setPlayer] = useState({
    x: 0,
    y: 0,
    size: gameField.blockSize,
  });

  function updatePlayerPosition(dx, dy) {
    const x = player.x + dx;
    const y = player.y + dy;
    if (wouldCollideWithWall(x, y, map)) {
      return;
    }

    setPlayer({ ...player, x: constrainValue(x), y: constrainValue(y) });
  }

  const buttons = {
    up: () => updatePlayerPosition(0, -1),
    down: () => updatePlayerPosition(0, 1),
    left: () => updatePlayerPosition(-1, 0),
    right: () => updatePlayerPosition(1, 0),
  };

  return (
    <View style={{ flex: 1, backgroundColor: "gray", paddingTop: 80 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
        <Canvas style={{ backgroundColor: 'white', height: gameField.height, width: gameField.width }}>
          <Map map={map} blockSize={gameField.blockSize} />
          <Rect
            height={player.size}
            width={player.size}
            x={player.x * player.size}
            y={player.y * player.size}
            color="red"
          />
        </Canvas>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button onPress={buttons.up} title="Up" orientation="vertical" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={buttons.left}
            title="Left"
            orientation="horizontal"
          />
          <View style={{ width: 75 }}></View>
          <Button
            onPress={buttons.right}
            title="Right"
            orientation="horizontal"
          />
        </View>
        <Button onPress={buttons.down} title="Down" orientation="vertical" />
      </View>
    </View>
  );
}
