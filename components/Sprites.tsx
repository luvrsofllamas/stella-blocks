import React, { useState } from "react";
import { Sprite } from "@/lib/movement";

interface SpritesProps {
  sprites: Sprite[];
  size: number;
}

import { View } from "react-native";

export const Sprites: React.FC<SpritesProps> = ({ sprites, size }) => {
  return (
    <View
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {sprites.map((sprite) => {
        return (
          <View
            key={`sprite-${sprite.position.x}-${sprite.position.y}`}
            style={{
              width: size,
              height: size,
              backgroundColor: "transparent",
              left: sprite.position.x * size,
              top: sprite.position.y * size,
              position: "absolute",
            }}
          >
            {sprite.type === "player" ? (
              <Player size={size} />
            ) : (
              <Box size={size} />
            )}
          </View>
        );
      })}
    </View>
  );
};

function Box({ size }: { size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "gray",
      }}
    />
  );
}

function Player({ size }: { size: number }) {
  return (
    <>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "orange",
        }}
      />
      <View
        style={{
          width: size / 4,
          height: size / 4,
          borderRadius: size / 8,
          backgroundColor: "black",
          position: "absolute",
          top: size / 4,
          left: size / 6,
        }}
      />
      <View
        style={{
          width: size / 4,
          height: size / 4,
          borderRadius: size / 8,
          backgroundColor: "black",
          position: "absolute",
          top: size / 4,
          right: size / 6,
        }}
      />
    </>
  );
}
