/**
 * GameCanvas Component
 * Main game area with falling objects and collision detection
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import FallingObject from './FallingObject';
import type { FallingObject as FallingObjectType } from '@/types/game.types';
import { GameEngine } from '@/lib/gameEngine';
import { ObjectGenerator } from '@/lib/objectGenerator';
import { handleClick } from '@/lib/collisionDetection';
import { calculatePoints } from '@/lib/scoreCalculator';
import { useGameStore } from '@/store/gameStore';

interface GameCanvasProps {
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onTimerUpdate: (timer: number) => void;
  onGameEnd: () => void;
  isPlaying: boolean;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  onScoreUpdate,
  onLivesUpdate,
  onTimerUpdate,
  onGameEnd,
  isPlaying,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const objectGeneratorRef = useRef<ObjectGenerator | null>(null);

  const [objects, setObjects] = useState<FallingObjectType[]>([]);
  const [containerHeight, setContainerHeight] = useState(600);
  const [containerWidth, setContainerWidth] = useState(800);

  const gameStatus = useGameStore((state) => state.gameStatus);
  const score = useGameStore((state) => state.score);
  const lives = useGameStore((state) => state.lives);
  const updateScore = useGameStore((state) => state.updateScore);

  // Initialize game engine
  useEffect(() => {
    if (!gameEngineRef.current) {
      objectGeneratorRef.current = new ObjectGenerator();

      gameEngineRef.current = new GameEngine(
        {
          onScoreUpdate: (newScore: number) => {
            updateScore(newScore);
            onScoreUpdate(newScore);
          },
          onLivesUpdate: (newLives: number) => {
            onLivesUpdate(newLives);
          },
          onTimerUpdate: (timer: number) => {
            onTimerUpdate(timer);
          },
          onStatusChange: (_status: any) => {
            // Status changes handled by Zustand store
          },
          onObjectsUpdate: (newObjects: FallingObjectType[]) => {
            setObjects(newObjects);
          },
          onGameEnd: (_finalScore: number) => {
            onGameEnd();
          },
        },
        () => {
          return objectGeneratorRef.current?.generate() || null;
        },
        1000
      );
    }

    return () => {
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
      }
    };
  }, [onScoreUpdate, onLivesUpdate, onTimerUpdate, onGameEnd, updateScore, containerWidth]);

  // Handle container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setContainerHeight(canvasRef.current.clientHeight);
        setContainerWidth(canvasRef.current.clientWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Start/stop game based on playing state
  useEffect(() => {
    if (isPlaying && gameEngineRef.current) {
      if (gameStatus === 'idle') {
        gameEngineRef.current.start();
      } else if (gameStatus === 'paused') {
        gameEngineRef.current.resume();
      }
    } else if (!isPlaying && gameEngineRef.current) {
      if (gameStatus === 'playing') {
        gameEngineRef.current.pause();
      }
    }
  }, [isPlaying, gameStatus]);

  // Handle object click
  const handleObjectClick = useCallback(
    (objectId: string) => {
      if (!gameEngineRef.current || gameStatus !== 'playing') return;

      const clickedObject = objects.find((obj) => obj.id === objectId);
      if (!clickedObject) return;

      // Calculate points and check if bomb
      const result = calculatePoints(clickedObject.type as any, 0); // Combo handled by game engine

      if (result.isBomb) {
        // Lose a life
        if (gameEngineRef.current) {
          const currentLives = lives - 1;
          onLivesUpdate(currentLives);
          if (currentLives <= 0) {
            onGameEnd();
          }
        }
      } else {
        // Add points
        const newScore = score + result.finalPoints;
        updateScore(newScore);
        onScoreUpdate(newScore);
      }

      // Remove object from display
      setObjects((prev) => prev.filter((obj) => obj.id !== objectId));
    },
    [objects, gameStatus]
  );

  // Handle canvas click for collision detection
  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (gameStatus !== 'playing') return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      // Find clicked object using collision detection
      const result = handleClick(
        'touches' in event ? event.nativeEvent : event.nativeEvent,
        objects
      );

      if (result.hit && result.objectId) {
        handleObjectClick(result.objectId);
      }
    },
    [objects, gameStatus, handleObjectClick]
  );

  // Clean up objects that fall off screen
  useEffect(() => {
    const interval = setInterval(() => {
      setObjects((prev) =>
        prev.filter((obj) => obj.position.y < containerHeight + 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [containerHeight]);

  return (
    <div
      ref={canvasRef}
      className="game-canvas relative w-full bg-gradient-to-b from-sky-100 to-green-100 overflow-hidden"
      style={{
        height: 'calc(100vh - 180px)',
        minHeight: '400px',
        touchAction: 'none',
        cursor: gameStatus === 'playing' ? 'pointer' : 'default',
      }}
      onClick={handleCanvasClick}
      onTouchStart={handleCanvasClick}
      role="application"
      aria-label="Game canvas - click or tap falling fruits"
    >
      {/* Falling Objects */}
      {objects.map((object) => (
        <FallingObject
          key={object.id}
          object={object}
          onClick={handleObjectClick}
          containerHeight={containerHeight}
        />
      ))}

      {/* Empty State or Paused Overlay */}
      {gameStatus === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">🎮</p>
            <p className="text-xl text-gray-700 font-semibold">Ready to play?</p>
            <p className="text-gray-600 mt-2">Click Start Game to begin!</p>
          </div>
        </div>
      )}

      {gameStatus === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg p-8 text-center shadow-xl">
            <p className="text-3xl mb-2">⏸️</p>
            <p className="text-2xl text-gray-900 font-bold">Paused</p>
            <p className="text-gray-600 mt-2">Click Resume to continue</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;
