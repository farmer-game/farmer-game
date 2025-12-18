/**
 * Farmer Game - Main App Component
 * Temporary placeholder showcasing design system, types, and constants
 */

import type { GameStatus, FruitType as FruitTypeValue } from '@/types';
import { GAME_CONFIG, FRUIT_POINTS, ROUTES, CONTRACT_CONFIG } from '@/utils/constants';

function App() {
  // Demo: TypeScript types and constants are working
  const demoGameStatus: GameStatus = 'idle';
  const demoFruit: FruitTypeValue = 'apple';
  
  console.log('Setup verified:', { 
    types: { demoGameStatus, demoFruit },
    config: { GAME_CONFIG, CONTRACT_CONFIG },
    routes: ROUTES,
    fruitPoints: FRUIT_POINTS,
  });
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Hero Section */}
      <div className="text-center mb-lg">
        <h1 className="text-orange" style={{ marginBottom: '1rem' }}>
          🍎 Farmer Game
        </h1>
        <p className="text-gray" style={{ fontSize: 'var(--text-lg)' }}>
          Blockchain-powered fruit catching game on Stacks Testnet
        </p>
      </div>

      {/* Design System Preview */}
      <div className="grid gap-md" style={{ marginTop: '3rem' }}>
        <div style={{
          backgroundColor: 'var(--white)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h3 className="font-bold" style={{ marginBottom: 'var(--spacing-sm)' }}>
            ✅ Design System Loaded
          </h3>
          <p style={{ color: 'var(--gray-600)', marginBottom: 0 }}>
            Global styles, typography, and CSS variables are configured. 
            Ready for component development!
          </p>
        </div>

        {/* Color Palette Preview */}
        <div style={{
          backgroundColor: 'var(--white)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Color Palette</h4>
          <div className="flex gap-sm flex-wrap">
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--orange-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-orange)'
            }}></div>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--white)',
              border: '2px solid var(--gray-200)',
              borderRadius: 'var(--radius-md)'
            }}></div>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--success)',
              borderRadius: 'var(--radius-md)'
            }}></div>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--error)',
              borderRadius: 'var(--radius-md)'
            }}></div>
          </div>
        </div>

        {/* Button Preview */}
        <div style={{
          backgroundColor: 'var(--white)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Interactive Elements</h4>
          <div className="flex gap-md flex-wrap">
            <button style={{
              backgroundColor: 'var(--orange-primary)',
              color: 'var(--white)',
              fontWeight: 600
            }}>
              Primary Button
            </button>
            <button style={{
              backgroundColor: 'var(--white)',
              color: 'var(--orange-primary)',
              border: '2px solid var(--orange-primary)'
            }}>
              Secondary Button
            </button>
          </div>
        </div>

        {/* Typography Preview */}
        <div style={{
          backgroundColor: 'var(--white)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Typography</h4>
          <p style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--spacing-sm)' }}>
            <strong>Poppins</strong> - Headings (Bold, 600, 700)
          </p>
          <p style={{ fontFamily: 'var(--font-body)', marginBottom: 'var(--spacing-sm)' }}>
            <strong>Inter</strong> - Body text (Regular, 400-600)
          </p>
          <p style={{ fontFamily: 'var(--font-game)', marginBottom: 0 }}>
            <strong>Fredoka</strong> - Game elements (Playful)
          </p>
        </div>
      </div>

      {/* Constants Preview */}
      <div style={{
        marginTop: '3rem',
        padding: 'var(--spacing-lg)',
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Configuration Constants</h4>
        <div className="grid gap-sm" style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
          <div><strong>Game Duration:</strong> {GAME_CONFIG.DURATION}s</div>
          <div><strong>Max Lives:</strong> {GAME_CONFIG.MAX_LIVES}</div>
          <div><strong>Contract:</strong> {CONTRACT_CONFIG.NAME}@{CONTRACT_CONFIG.NETWORK}</div>
          <div><strong>Apple Points:</strong> {FRUIT_POINTS.apple} | <strong>Watermelon:</strong> {FRUIT_POINTS.watermelon}</div>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{
        marginTop: '3rem',
        padding: 'var(--spacing-lg)',
        backgroundColor: 'var(--orange-light)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'var(--orange-dark)', marginBottom: 'var(--spacing-sm)' }}>
          🚀 Ready for Prompt 5
        </h3>
        <p style={{ color: 'var(--gray-800)', marginBottom: 0 }}>
          Utility Functions (Validators & Formatters)
        </p>
      </div>
    </div>
  )
}

export default App
