import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { View, useWindowDimensions, Text, Alert } from "react-native";
import { Map } from "@/components/Map";
import { getCoordinatesForElementType } from "@/util/map";
import { Blocks } from '@/components/Blocks';

const map1 = [
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

const map = [
  "XXXXXXXXXX",
  "X     X  X",
  "XX  O    X",
  "X  ...   X",
  "X   XXO  X",
  "X   X  X X",
  "X   X  X X",
  "X  OX    X",
  "X       XX",
  "XXXXXXXXXX",
]

const initialBlockCoordinates = getCoordinatesForElementType(map, "O");

function wouldCollideWithWall(x, y, map) {
  return map[y][x] === "X";
}

function wouldCollideWithBlock(x, y, blockCoordinates) {
  return blockCoordinates.filter(({ x: blockX, y: blockY }) => blockX === x && blockY === y);
}

function constrainValue(value) {
  return Math.max(Math.min(value, 9), 0);
}

function wouldCollideWithPlaceholder(x, y, map) {
  return map[y][x] === ".";
}

function doAllBlocksCollideWithPlaceholder(blockCoordinates, map) {
  return blockCoordinates.every(({ x, y }) => wouldCollideWithPlaceholder(x, y, map));
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
    x: 1,
    y: 1,
    size: gameField.blockSize,
  });

  const [blockCoordinates, setBlockCoordinates] = useState(initialBlockCoordinates);

  function updatePlayerPosition(dx, dy) {
    const x = player.x + dx;
    const y = player.y + dy;
    if (wouldCollideWithWall(x, y, map)) {
      return;
    }

    const collidedBlocks = wouldCollideWithBlock(x, y, blockCoordinates);

    if (collidedBlocks.length) {
      const collidedBlock = collidedBlocks[0];
      // check if block would collide with wall in new position
      if (wouldCollideWithWall(x + dx, y + dy, map)) {
        // if so, nobody can move
        return;
      }
      // if not, block can move in same direction
      const newBlockCoordinates = blockCoordinates.map((block) => {
        if (block.x === collidedBlock.x && block.y === collidedBlock.y) {
          return { x: block.x + dx, y: block.y + dy };
        }
        return block;
      });
      setBlockCoordinates(newBlockCoordinates);
    }

    setPlayer({ ...player, x: constrainValue(x), y: constrainValue(y) });
  }

  useEffect(() => {
    if (doAllBlocksCollideWithPlaceholder(blockCoordinates, map)) {
      console.log("You won!");
      Alert.alert("You are a winner!!!")
    }
  }, [blockCoordinates]);

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
          <Blocks blockCoords={blockCoordinates} blockSize={gameField.blockSize} />
          <Group>
          <Circle
            r={player.size / 2}
            cx={player.x * player.size + player.size / 2}
            cy={player.y * player.size + player.size / 2}
            color="yellow"
          />
          <Circle
            key="player-left-eye"
            r={2}
            cx={player.x * player.size + player.size / 2 - player.size / 7}
            cy={player.y * player.size + player.size / 2 - player.size / 8}
            color="red"
          />
          <Circle
            key="player-right-eye"
            r={2}
            cx={player.x * player.size + player.size / 2 + player.size / 7}
            cy={player.y * player.size + player.size / 2 - player.size / 8}
            color="red"
          />
          <Circle
            key="player-mouth"
            r={6}
            cx={player.x * player.size + player.size / 2}
            cy={player.y * player.size + player.size / 2 + player.size / 5}
            color="red"
          />
          </Group>
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
