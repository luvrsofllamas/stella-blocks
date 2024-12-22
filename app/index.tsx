import { useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { Map } from "@/components/Map";
import { Sprites } from "@/components/Sprites";
import { levels } from "@/lib/levels";
import { getInitialPositions, updateSpritePositions } from "@/lib/movement";
import { Controls } from "@/components/Controls";

export default function Index() {
  const map = levels[0];
  const [sprites, setSprites] = useState(getInitialPositions(map));

  const onPressDirection = (delta : { x: number, y: number }) => {
    updateSpritePositions(sprites, delta, map);
    setSprites([...sprites]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={$sectionContainer}>
        <View>
          <Map map={map} size={20} />
          <Sprites sprites={sprites} size={20} />
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
