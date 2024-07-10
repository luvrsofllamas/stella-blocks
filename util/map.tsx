

export function getMapWallCoordinates(map: string[]): {x: number, y: number, type: string}[] {
  const coordinates = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      // walls
      if (map[i][j] === "X") {
        coordinates.push({x: j, y: i, type: "wall"});
      }
      // block placeholders
      if (map[i][j] === ".") {
        coordinates.push({x: j, y: i, type: "placeholder"});
      }
      // blocks
      if (map[i][j] === "O") {
        coordinates.push({x: j, y: i, type: "block"});
      }
    }
  }

  return coordinates;
}
