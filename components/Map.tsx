import React from "react";
import { Rect } from "@shopify/react-native-skia";
import { getMapWallCoordinates } from "@/util/map";

interface MapProps {
  map: string[];
  blockSize: number;
}

export const Map: React.FC<MapProps> = ({ map, blockSize }) => {
  const renderMapWalls = (): JSX.Element[] => {
    const coordinates = getMapWallCoordinates(map);

    const walls: JSX.Element[] = [];

    coordinates.forEach((coordinate, index) => {
      switch (coordinate.type) {
        case "wall":
          walls.push(
            <Rect
              key={`${index}-wall`}
              x={coordinate.x * blockSize}
              y={coordinate.y * blockSize}
              width={blockSize}
              height={blockSize}
              color="black"
            />
          );
          break;
        case "placeholder":
          walls.push(
            <Rect
              key={`${index}-placeholder`}
              x={coordinate.x * blockSize + blockSize / 2 - blockSize / 8}
              y={coordinate.y * blockSize + blockSize / 2 - blockSize / 8}
              width={blockSize / 8}
              height={blockSize / 8}
              color="green"
            />
          );
      }
    });
    return walls;
  };

  return <>{renderMapWalls()}</>;
};
