/**
 * Collision Detection
 * Detects clicks/touches on falling objects using bounding box collision
 */

import type { FallingObject } from '@/types/game.types';

export interface CollisionResult {
  hit: boolean;
  object?: FallingObject;
  objectId?: string;
}

/**
 * Default object dimensions (can be customized per fruit type)
 */
const DEFAULT_OBJECT_SIZE = {
  width: 60,
  height: 60,
};

/**
 * Get object size based on type
 */
function getObjectSize(type: string): { width: number; height: number } {
  const sizes: Record<string, { width: number; height: number }> = {
    apple: { width: 50, height: 50 },
    banana: { width: 45, height: 60 },
    orange: { width: 55, height: 55 },
    grape: { width: 45, height: 45 },
    watermelon: { width: 70, height: 70 },
    bomb: { width: 50, height: 50 },
  };

  return sizes[type] || DEFAULT_OBJECT_SIZE;
}

/**
 * Check if point is inside bounding box
 */
function isPointInBox(
  pointX: number,
  pointY: number,
  boxX: number,
  boxY: number,
  boxWidth: number,
  boxHeight: number
): boolean {
  return (
    pointX >= boxX &&
    pointX <= boxX + boxWidth &&
    pointY >= boxY &&
    pointY <= boxY + boxHeight
  );
}

/**
 * Detect collision between click/touch point and falling object
 */
export function detectCollision(
  clickX: number,
  clickY: number,
  object: FallingObject
): boolean {
  const size = getObjectSize(object.type);
  const objectX = object.position.x - size.width / 2;
  const objectY = object.position.y - size.height / 2;

  return isPointInBox(
    clickX,
    clickY,
    objectX,
    objectY,
    size.width,
    size.height
  );
}

/**
 * Find clicked object from array of falling objects
 */
export function findClickedObject(
  clickX: number,
  clickY: number,
  objects: FallingObject[]
): CollisionResult {
  // Iterate in reverse to check topmost objects first
  for (let i = objects.length - 1; i >= 0; i--) {
    const object = objects[i];
    if (detectCollision(clickX, clickY, object)) {
      return {
        hit: true,
        object,
        objectId: object.id,
      };
    }
  }

  return { hit: false };
}

/**
 * Handle click event and detect collision
 */
export function handleClick(
  event: MouseEvent | TouchEvent,
  objects: FallingObject[]
): CollisionResult {
  let clickX: number;
  let clickY: number;

  if ('touches' in event && event.touches.length > 0) {
    // Touch event
    clickX = event.touches[0].clientX;
    clickY = event.touches[0].clientY;
  } else if ('clientX' in event) {
    // Mouse event
    clickX = event.clientX;
    clickY = event.clientY;
  } else {
    return { hit: false };
  }

  return findClickedObject(clickX, clickY, objects);
}

/**
 * Get bounding box for rendering debug visuals
 */
export function getObjectBounds(object: FallingObject): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const size = getObjectSize(object.type);
  return {
    x: object.position.x - size.width / 2,
    y: object.position.y - size.height / 2,
    width: size.width,
    height: size.height,
  };
}

/**
 * Check if two objects are colliding (for future power-ups, etc.)
 */
export function checkObjectCollision(
  obj1: FallingObject,
  obj2: FallingObject
): boolean {
  const bounds1 = getObjectBounds(obj1);
  const bounds2 = getObjectBounds(obj2);

  return !(
    bounds1.x + bounds1.width < bounds2.x ||
    bounds1.x > bounds2.x + bounds2.width ||
    bounds1.y + bounds1.height < bounds2.y ||
    bounds1.y > bounds2.y + bounds2.height
  );
}
