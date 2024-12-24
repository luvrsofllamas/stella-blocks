import { useState } from "react";
import { Button, View, ViewStyle, TouchableOpacity, Text } from "react-native";
import { Map } from "@/components/Map";
import { Sprites } from "@/components/Sprites";
import { levels } from "@/lib/levels";
import { getInitialPositions, updateSpritePositions } from "@/lib/movement";
import { Controls } from "@/components/Controls";
import { AntDesign } from "@expo/vector-icons";

export default function Index() {
  const [level, setLevel] = useState(0);
  const map = levels[level];
  const [sprites, setSprites] = useState(getInitialPositions(map));

  const onPressDirection = (delta: { x: number; y: number }) => {
    updateSpritePositions(sprites, delta, map);
    setSprites([...sprites]);
  };

  const onPressReset = () => {
    setSprites(getInitialPositions(map));
  };

  const onPressNextLevel = () => {
    if (level === levels.length - 1) {
      return;
    }
    setLevel(level + 1);
    setSprites(getInitialPositions(levels[level + 1]));
  };

  const onPressPreviousLevel = () => {
    if (level === 0) {
      return;
    }
    setLevel(level - 1);
    setSprites(getInitialPositions(levels[level - 1]));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
          alignItems: "center",
        }}
      >
        <Button title="Reset" onPress={onPressReset} />
        <View style={{ flexDirection: "row", columnGap:10 }}>
          <TouchableOpacity onPress={onPressPreviousLevel}>
            <AntDesign name={"caretleft"} size={20} color="black" />
          </TouchableOpacity>
          <Text>Level {level + 1}</Text>
          <TouchableOpacity onPress={onPressNextLevel}>
            <AntDesign name={"caretright"} size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={$sectionContainer}>
        <View>
          <Map map={map} size={30} />
          <Sprites sprites={sprites} size={30} />
        </View>
      </View>
      <Controls onPressDirection={onPressDirection} />
    </View>
  );
}

const $sectionContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5FCFF",
};
