/**
 * FallingObject Component
 * Renders a single falling fruit or bomb with animation
 */

import React, { memo } from 'react';
import type { FallingObject as FallingObjectType } from '@/types/game.types';
import { FruitType } from '@/types/game.types';

interface FallingObjectProps {
  object: FallingObjectType;
  onClick: (id: string) => void;
  containerHeight: number;
}

// Emoji representations for each fruit type
const FRUIT_EMOJIS: Record<string, string> = {
  [FruitType.APPLE]: '🍎',
  [FruitType.BANANA]: '🍌',
  [FruitType.ORANGE]: '🍊',
  [FruitType.GRAPE]: '🍇',
  [FruitType.WATERMELON]: '🍉',
  [FruitType.BOMB]: '💣',
};

// Size mapping for different fruit types (in pixels)
const FRUIT_SIZES: Record<string, number> = {
  [FruitType.APPLE]: 48,
  [FruitType.BANANA]: 48,
  [FruitType.ORANGE]: 48,
  [FruitType.GRAPE]: 42,
  [FruitType.WATERMELON]: 60,
  [FruitType.BOMB]: 48,
};

const FallingObjectComponent: React.FC<FallingObjectProps> = ({
  object,
  onClick,
  containerHeight,
}) => {
  const emoji = FRUIT_EMOJIS[object.type] || '❓';
  const size = FRUIT_SIZES[object.type] || 48;
  const isBomb = object.type === FruitType.BOMB;

  // Calculate animation duration based on speed and distance
  const fallDuration = containerHeight / (object.speed * 60); // Speed is pixels per frame at 60fps

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(object.id);
  };

  return (
    <div
      className={`falling-object ${isBomb ? 'bomb' : 'fruit'}`}
      onClick={handleClick}
      onTouchStart={handleClick}
      style={{
        position: 'absolute',
        left: `${object.position.x}%`,
        top: `${object.position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size}px`,
        lineHeight: '1',
        cursor: 'pointer',
        userSelect: 'none',
        animation: `fall ${fallDuration}s linear forwards`,
        zIndex: 10,
        transition: 'transform 0.1s ease-out',
      }}
      role="button"
      tabIndex={0}
      aria-label={`${isBomb ? 'Bomb' : object.type} - click to catch`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(object.id);
        }
      }}
    >
      <span
        className="object-emoji"
        style={{
          display: 'block',
          filter: isBomb ? 'none' : 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
        }}
      >
        {emoji}
      </span>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(FallingObjectComponent, (prevProps, nextProps) => {
  return (
    prevProps.object.id === nextProps.object.id &&
    prevProps.object.position.y === nextProps.object.position.y &&
    prevProps.containerHeight === nextProps.containerHeight
  );
});
