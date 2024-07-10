import React from "react";
import { Rect, Group } from "@shopify/react-native-skia";

interface MapProps {
  blockCoords: { x: number; y: number }[];
  blockSize: number;
}

export const Blocks: React.FC<MapProps> = ({ blockCoords, blockSize }) => {
  const renderMapWalls = (): JSX.Element[] => {
    const blocks: JSX.Element[] = [];

    blockCoords.forEach((coordinate, index) => {
      blocks.push(
        <Group key={`${index}-block`}>
          <Rect
            key={`${index}-blockouter`}
            x={coordinate.x * blockSize + 2}
            y={coordinate.y * blockSize + 2}
            width={blockSize - 4}
            height={blockSize - 4}
            color="blue"
          />
          <Rect
            key={`${index}-blockinner`}
            x={coordinate.x * blockSize + blockSize / 2 - blockSize / 4}
            y={coordinate.y * blockSize + blockSize / 2 - blockSize / 4}
            width={blockSize / 2}
            height={blockSize / 2}
            color="lightblue"
          />
        </Group>
      );
    });
    return blocks;
  };

  return <>{renderMapWalls()}</>;
};
