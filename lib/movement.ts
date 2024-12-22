export interface Position {
  x: number;
  y: number;
}

export interface Sprite {
  type: "player" | "box";
  position: Position;
}

export type Map = string[];

export function getInitialPositions(map: Map): Sprite[] {
  let player: Position | null = null;
  const boxes: Position[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "P") {
        player = { x, y };
      } else if (map[y][x] === "O") {
        boxes.push({ x, y });
      }
    }
  }

  const sprites: Sprite[] = [];
  if (player) {
    sprites.push({ type: "player", position: player });
  }
  boxes.forEach((position) => {
    sprites.push({ type: "box", position });
  });

  return sprites;
}

export function getPlayerInitialPosition(map: Map): Position | null {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y].split("")[x] === "P") {
        return { x, y };
      }
    }
  }
  return null;
}

export function getBoxInitialPositions(map: Map): Position[] {
  const positions: { x: number; y: number }[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y].split("")[x] === "O") {
        positions.push({ x, y });
      }
    }
  }
  return positions;
}

function wouldCollideWithWall(position: Position, map: Map) {
  return map[position.y][position.x] === "X";
}

function wouldCollideWithBlock(player: Position, blocks: Sprite[]) {
  return blocks.filter(
    (block) => block.position.x === player.x && block.position.y === player.y
  );
}

export function updateSpritePositions(
  sprites: Sprite[],
  playerDelta: Position,
  map: Map
) {
  const playerSprite = sprites.find((sprite) => sprite.type === "player");
  const blockSprites = sprites.filter((sprite) => sprite.type === "box");

  if (!playerSprite) return;

  const newPlayerPosition = {
    x: playerSprite.position.x + playerDelta.x,
    y: playerSprite.position.y + playerDelta.y,
  };
  if (wouldCollideWithWall(newPlayerPosition, map)) {
    return;
  }

  const collidedBlocks = wouldCollideWithBlock(newPlayerPosition, blockSprites);

  if (collidedBlocks.length) {
    const collidedBlock = collidedBlocks[0];
    // check if block would collide with wall in new position
    const potentialBlockPosition = {
      x: collidedBlock.position.x + playerDelta.x,
      y: collidedBlock.position.y + playerDelta.y,
    };
    if (wouldCollideWithWall(potentialBlockPosition, map)) {
      // if so, nobody can move
      return;
    }
    // check if block would collide with another block in new position
    if (wouldCollideWithBlock(potentialBlockPosition, blockSprites.filter((block) => block !== collidedBlock)).length) {
      // if so, nobody can move
      return;
    }
    // if not, block can move in same direction
    collidedBlock.position = potentialBlockPosition;
  }

  playerSprite.position = newPlayerPosition;
}
