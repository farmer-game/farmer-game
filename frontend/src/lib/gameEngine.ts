/**
 * Game Engine
 * Core game loop and state management for fruit-catching game
 * Targets 60 FPS with requestAnimationFrame
 */

import type { FallingObject, GameStatus } from '@/types/game.types';
import { GAME_CONFIG } from '@/utils/constants';

export interface GameEngineCallbacks {
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onTimerUpdate: (timeLeft: number) => void;
  onStatusChange: (status: GameStatus) => void;
  onObjectsUpdate: (objects: FallingObject[]) => void;
  onGameEnd: (finalScore: number) => void;
}

export class GameEngine {
  private animationFrameId: number | null = null;
  private lastTimestamp: number = 0;
  private elapsedTime: number = 0;
  private lastSpawnTime: number = 0;
  private isPaused: boolean = false;
  private isRunning: boolean = false;

  private score: number = 0;
  private lives: number = GAME_CONFIG.MAX_LIVES;
  private timeLeft: number = GAME_CONFIG.DURATION;
  private objects: FallingObject[] = [];
  private comboCount: number = 0;
  private lastCatchTime: number = 0;

  private callbacks: GameEngineCallbacks;
  private onSpawnObject: () => FallingObject | null;
  private spawnInterval: number;

  constructor(
    callbacks: GameEngineCallbacks,
    onSpawnObject: () => FallingObject | null,
    spawnInterval: number = 1000
  ) {
    this.callbacks = callbacks;
    this.onSpawnObject = onSpawnObject;
    this.spawnInterval = spawnInterval;
  }

  /**
   * Start the game engine
   */
  start(): void {
    if (this.isRunning) return;

    this.reset();
    this.isRunning = true;
    this.isPaused = false;
    this.lastTimestamp = performance.now();
    this.callbacks.onStatusChange('playing');
    this.gameLoop(this.lastTimestamp);
  }

  /**
   * Pause the game
   */
  pause(): void {
    if (!this.isRunning || this.isPaused) return;
    this.isPaused = true;
    this.callbacks.onStatusChange('paused');
  }

  /**
   * Resume the game
   */
  resume(): void {
    if (!this.isRunning || !this.isPaused) return;
    this.isPaused = false;
    this.lastTimestamp = performance.now();
    this.callbacks.onStatusChange('playing');
    this.gameLoop(this.lastTimestamp);
  }

  /**
   * Stop the game
   */
  stop(): void {
    this.isRunning = false;
    this.isPaused = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.callbacks.onStatusChange('ended');
    this.callbacks.onGameEnd(this.score);
  }

  /**
   * Main game loop
   */
  private gameLoop(timestamp: number): void {
    if (!this.isRunning || this.isPaused) return;

    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Update timer
    this.elapsedTime += deltaTime;
    this.timeLeft = Math.max(0, GAME_CONFIG.DURATION - Math.floor(this.elapsedTime / 1000));
    this.callbacks.onTimerUpdate(this.timeLeft);

    // Check if time is up
    if (this.timeLeft <= 0) {
      this.stop();
      return;
    }

    // Spawn new objects
    if (timestamp - this.lastSpawnTime >= this.spawnInterval) {
      const newObject = this.onSpawnObject();
      if (newObject) {
        this.objects.push(newObject);
      }
      this.lastSpawnTime = timestamp;
    }

    // Update object positions
    this.updateObjects(deltaTime);

    // Check for objects that fell off screen
    this.removeOffscreenObjects();

    // Update callbacks
    this.callbacks.onObjectsUpdate([...this.objects]);

    // Continue loop
    this.animationFrameId = requestAnimationFrame((ts) => this.gameLoop(ts));
  }

  /**
   * Update positions of all falling objects
   */
  private updateObjects(deltaTime: number): void {
    const deltaSeconds = deltaTime / 1000;

    this.objects = this.objects.map((obj) => ({
      ...obj,
      position: {
        ...obj.position,
        y: obj.position.y + obj.speed * deltaSeconds * 60, // Normalize to 60 FPS
      },
    }));
  }

  /**
   * Remove objects that have fallen off screen
   */
  private removeOffscreenObjects(): void {
    const screenHeight = window.innerHeight;
    this.objects = this.objects.filter((obj) => obj.position.y < screenHeight + 100);
  }

  /**
   * Handle object catch
   */
  catchObject(objectId: string, points: number): void {
    const currentTime = performance.now();
    
    // Remove caught object
    this.objects = this.objects.filter((obj) => obj.id !== objectId);

    // Update combo
    if (currentTime - this.lastCatchTime < 1000) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastCatchTime = currentTime;

    // Calculate score with combo bonus
    const comboMultiplier = Math.min(1 + (this.comboCount - 1) * 0.1, 2);
    const finalPoints = Math.floor(points * comboMultiplier);

    // Update score
    this.score += finalPoints;
    this.callbacks.onScoreUpdate(this.score);
    this.callbacks.onObjectsUpdate([...this.objects]);
  }

  /**
   * Handle bomb hit (lose life)
   */
  loseLife(): void {
    this.lives = Math.max(0, this.lives - 1);
    this.comboCount = 0; // Reset combo on bomb hit
    this.callbacks.onLivesUpdate(this.lives);

    if (this.lives === 0) {
      this.stop();
    }
  }

  /**
   * Get current game state
   */
  getState() {
    return {
      score: this.score,
      lives: this.lives,
      timeLeft: this.timeLeft,
      objects: [...this.objects],
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      comboCount: this.comboCount,
    };
  }

  /**
   * Reset game state
   */
  private reset(): void {
    this.score = 0;
    this.lives = GAME_CONFIG.MAX_LIVES;
    this.timeLeft = GAME_CONFIG.DURATION;
    this.objects = [];
    this.elapsedTime = 0;
    this.lastSpawnTime = 0;
    this.comboCount = 0;
    this.lastCatchTime = 0;

    this.callbacks.onScoreUpdate(this.score);
    this.callbacks.onLivesUpdate(this.lives);
    this.callbacks.onTimerUpdate(this.timeLeft);
    this.callbacks.onObjectsUpdate([]);
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stop();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * Adjust difficulty (change spawn interval)
   */
  setSpawnInterval(interval: number): void {
    this.spawnInterval = Math.max(300, interval); // Min 300ms
  }
}
