import React from 'react';
import { Rect } from '@shopify/react-native-skia';
import { getMapWallCoordinates } from '@/util/map';


interface MapProps {
  map: string[];
  blockSize: number;
}

interface Coordinate {
  x: number;
  y: number;
  type: string;
}

export const Map: React.FC<MapProps> = ({ map, blockSize }) => {

  const renderMapWalls = (): JSX.Element[] => {
    const coordinates = getMapWallCoordinates(map);

    return coordinates.map((coordinate, index) => {
      switch (coordinate.type) {
        case "block":
          return (
            <>
            <Rect
              key={index}
              x={coordinate.x * blockSize + 2}
              y={coordinate.y * blockSize + 2}
              width={blockSize - 4}
              height={blockSize - 4}
              color="blue"
            />
            <Rect
              key={`${index}-inner`}
              x={coordinate.x * blockSize + blockSize / 2 - blockSize / 4}
              y={coordinate.y * blockSize + blockSize / 2 - blockSize / 4}
              width={blockSize / 2}
              height={blockSize / 2}
              color="lightblue"
            />
            </>
          );
        case "wall":
          return (
            <Rect
              key={index}
              x={coordinate.x * blockSize}
              y={coordinate.y * blockSize}
              width={blockSize}
              height={blockSize}
              color="black"
            />
          );
        case "placeholder":
        default:
          return (
            <Rect
              key={index}
              x={coordinate.x * blockSize + blockSize / 2 - blockSize / 8}
              y={coordinate.y * blockSize + blockSize / 2 - blockSize / 8}
              width={blockSize / 8}
              height={blockSize / 8}
              color="green"
            />
          );
      }
  });
  };

  return (
    <>
      {renderMapWalls()}
    </>
  );
};
