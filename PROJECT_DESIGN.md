# Farmer Game - Project Structure & Implementation Plan

## Project Overview
A blockchain-integrated fruit-catching game where players click on falling fruits to earn points while avoiding bombs. Built with React + Vite frontend, Clarity smart contracts on Stacks testnet, and Chainhook for event monitoring.

---

## Design Philosophy
- **Colors**: Primary Orange (#FF8C42) and White (#FFFFFF) with accents
- **Mobile-First**: Optimized for mobile gameplay, responsive for desktop
- **User Experience**: Non-intrusive wallet connection, play first, connect when ready
- **Clean UI**: Minimalist game library aesthetic with smooth animations

---

## Application Flow

### 1. User Journey
```
Landing Page → Dashboard (Browse) → Connect Wallet (Optional) → Register (Name Only) → Start Game → Play → Submit Score → Leaderboard
```

#### Entry Points:
1. **Landing Page** - Hero section with "Go to Dashboard" CTA
2. **Dashboard** - Public access, shows leaderboard and game preview
3. **Wallet Connection** - User-initiated, not forced
4. **Registration** - Required only when starting first game (name input)
5. **Game Start** - Checks registration status, prompts if needed
6. **Gameplay** - 2 minutes or 4 bomb hits = game over
7. **Score Submission** - Automatically posts to smart contract
8. **Leaderboard Update** - Real-time via Chainhook events

---

## Frontend Structure

### Directory Organization
```
frontend/
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Main router & layout
│   ├── index.css                # Global styles & CSS variables
│   │
│   ├── pages/
│   │   ├── Landing.tsx          # Hero section, game intro, CTA
│   │   ├── Dashboard.tsx        # Main hub, game stats, leaderboard preview
│   │   ├── Game.tsx             # Game canvas & logic container
│   │   └── Leaderboard.tsx      # Full leaderboard view
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Persistent navigation, wallet button
│   │   │   ├── Footer.tsx       # Links, social, blockchain info
│   │   │   └── Layout.tsx       # Wrapper with nav/footer
│   │   │
│   │   ├── game/
│   │   │   ├── GameCanvas.tsx   # Main game rendering area
│   │   │   ├── FallingObject.tsx # Individual fruit/bomb component
│   │   │   ├── ScoreDisplay.tsx # Live score, lives, timer
│   │   │   ├── GameOverModal.tsx # Results, submit score prompt
│   │   │   ├── GameControls.tsx # Start/Pause/Resume buttons
│   │   │   └── GameTutorial.tsx # First-time instructions overlay
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── LeaderboardTable.tsx  # Ranked player list
│   │   │   ├── LeaderboardCard.tsx   # Individual player card
│   │   │   ├── LeaderboardFilters.tsx # Time filters (daily/weekly/all-time)
│   │   │   └── PlayerStats.tsx       # Personal best, rank, history
│   │   │
│   │   ├── wallet/
│   │   │   ├── ConnectWallet.tsx     # Stacks Connect integration
│   │   │   ├── WalletButton.tsx      # Navbar wallet display
│   │   │   ├── WalletModal.tsx       # Connection options
│   │   │   └── RegisterModal.tsx     # Name registration form
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx            # Reusable button component
│   │       ├── Card.tsx              # Container cards
│   │       ├── Modal.tsx             # Base modal wrapper
│   │       ├── Loading.tsx           # Loading states
│   │       └── Toast.tsx             # Notifications
│   │
│   ├── hooks/
│   │   ├── useWallet.ts         # Wallet connection state
│   │   ├── useGame.ts           # Game state management
│   │   ├── useContract.ts       # Smart contract interactions
│   │   ├── useLeaderboard.ts    # Leaderboard data fetching
│   │   └── useChainhook.ts      # Chainhook event subscription
│   │
│   ├── lib/
│   │   ├── gameEngine.ts        # Core game loop & physics
│   │   ├── objectGenerator.ts   # Fruit/bomb spawn logic
│   │   ├── scoreCalculator.ts   # Score computation rules
│   │   └── collisionDetection.ts # Click/touch hit detection
│   │
│   ├── services/
│   │   ├── stacksService.ts     # Stacks blockchain API calls
│   │   ├── contractService.ts   # Contract function calls
│   │   └── chainhookService.ts  # Chainhook polling/websocket
│   │
│   ├── utils/
│   │   ├── constants.ts         # Game config, contract addresses
│   │   ├── validators.ts        # Input validation
│   │   └── formatters.ts        # Data formatting helpers
│   │
│   ├── types/
│   │   ├── game.types.ts        # Game state interfaces
│   │   ├── player.types.ts      # Player data models
│   │   └── contract.types.ts    # Contract response types
│   │
│   └── assets/
│       ├── fruits/              # Fruit SVGs/PNGs
│       │   ├── apple.svg
│       │   ├── banana.svg
│       │   ├── orange.svg
│       │   ├── grape.svg
│       │   └── watermelon.svg
│       └── icons/
│           ├── bomb.svg
│           ├── heart.svg
│           └── trophy.svg
```

---

## Component Architecture

### 1. Landing Page Components
**Purpose**: First impression, game introduction, clear CTA

**Components**:
- `Navbar` - Logo, "Connect Wallet" button (optional action)
- `Hero Section` - Game title, tagline, "Go to Dashboard" button
- `Features Grid` - 3-4 key features (blockchain rewards, fair play, global leaderboard)
- `How To Play` - Quick visual guide (3 steps)
- `Footer` - Links, testnet info, social

**Flow**: Users land → Read about game → Click "Go to Dashboard" → No wallet required yet

---

### 2. Dashboard Components
**Purpose**: Central hub, leaderboard preview, game access

**Layout**:
- `Navbar` - Persistent, shows connection status
- `Welcome Section` - Greeting, quick stats (total players, games played)
- `Leaderboard Preview` - Top 5 players, "View Full Leaderboard" link
- `Game Card` - Thumbnail, "Play Now" button
- `Player Stats Card` - Personal best (if connected), games played, rank

**Flow**: 
- Unconnected users → Can browse, see leaderboard, click "Play Now"
- Connected users → See personal stats
- Clicking "Play Now" → Routes to `/game`

---

### 3. Game Page Components
**Purpose**: Main gameplay experience

#### Pre-Game State:
- `GameTutorial` - First-time overlay explaining controls
- `RegisterModal` - Appears if wallet connected but not registered
- `GameControls` - "Start Game" button (checks registration)

#### In-Game State:
- `GameCanvas` - Full-screen playing area
  - Multiple `FallingObject` instances rendering dynamically
  - CSS animations for smooth falling motion
- `ScoreDisplay` - Top bar showing:
  - Current score
  - Lives remaining (4 hearts)
  - Timer countdown (2:00)
- `GameControls` - Pause/Resume button

#### Game Logic Flow:
1. Objects spawn at random X positions at top
2. Fall at varying speeds (difficulty curve)
3. User clicks/taps to "catch"
4. Hit detection → Award points or deduct life
5. Game ends when: timer reaches 0:00 OR lives = 0
6. Trigger `GameOverModal`

#### Post-Game State:
- `GameOverModal` - Shows:
  - Final score
  - Fruits caught breakdown
  - "Submit Score" button (if connected & registered)
  - "Play Again" button
  - Leaderboard position (if applicable)

**Flow**:
```
Enter Page → Check wallet → Check registration → Show tutorial (first time) → Start Game → Play → Game Over → Submit Score → View Leaderboard
```

---

### 4. Leaderboard Components
**Purpose**: Global and personal rankings

**Components**:
- `LeaderboardFilters` - Time range tabs (All Time / Weekly / Daily)
- `LeaderboardTable` - Ranked list:
  - Rank number
  - Player name
  - Score
  - Date
  - Wallet address (truncated)
- `PlayerStats` - Personal section showing:
  - Best score
  - Current rank
  - Total games
  - Average score

**Data Flow**:
- Fetch from smart contract `get-leaderboard` function
- Real-time updates via Chainhook listener
- Cache results with 30s refresh

---

## Game Mechanics

### Falling Objects

#### Fruit Types & Scores:
| Fruit      | Points | Spawn Rate | Fall Speed |
|------------|--------|------------|------------|
| Apple      | 10     | 30%        | Medium     |
| Banana     | 15     | 25%        | Slow       |
| Orange     | 20     | 20%        | Medium     |
| Grape      | 25     | 15%        | Fast       |
| Watermelon | 50     | 10%        | Very Slow  |
| Bomb       | -1 Life| 20%        | Medium     |

#### Spawn Logic:
- Every 0.8-1.2 seconds, spawn new object
- Random X position (10% to 90% of screen width)
- Difficulty progression: Speed increases every 30 seconds
- Bomb frequency increases after 1 minute

#### Physics:
- Linear downward motion (CSS transform: translateY)
- Remove from DOM when reaching bottom (garbage collection)
- Touch/click events with bounding box collision detection

### Game Rules:
1. **Duration**: 2 minutes (120 seconds)
2. **Lives**: 4 (displayed as hearts)
3. **Game Over Conditions**:
   - Timer reaches 0 (natural end)
   - All 4 lives lost (bomb hits)
4. **Scoring**: Cumulative points from caught fruits
5. **No penalties** for missed fruits (only bomb hits matter)

---

## Smart Contract Structure

### Contract: `farmer-game.clar`

#### Data Maps:
```clarity
;; Player registration
(define-map players 
  principal 
  {
    name: (string-ascii 50),
    registered-at: uint,
    total-games: uint
  })

;; High scores
(define-map scores
  uint ;; game-id
  {
    player: principal,
    score: uint,
    timestamp: uint,
    game-id: uint
  })

;; Leaderboard (top scores)
(define-map leaderboard-entries
  principal
  {
    best-score: uint,
    last-played: uint,
    total-games: uint
  })
```

#### Data Variables:
```clarity
(define-data-var game-counter uint u0)
(define-data-var min-name-length uint u3)
(define-data-var max-name-length uint u50)
```

#### Public Functions:

1. **`register-player`**
   - Parameters: `name (string-ascii 50)`
   - Validation: Name length 3-50 characters
   - Action: Store player registration
   - Returns: `(ok true)` or error

2. **`submit-score`**
   - Parameters: `score uint`
   - Validation: Player registered, score > 0
   - Action: 
     - Increment game counter
     - Store score in scores map
     - Update leaderboard if new best
   - Returns: `game-id`
   - **Emits Event** for Chainhook

3. **`get-player-info`**
   - Parameters: `player principal`
   - Returns: Player registration data

4. **`get-player-best-score`**
   - Parameters: `player principal`
   - Returns: Best score or u0

5. **`get-leaderboard`**
   - Parameters: `limit uint, offset uint`
   - Returns: Top scores (sorted)
   - Note: Limited pagination due to Clarity constraints

6. **`is-registered`**
   - Parameters: `player principal`
   - Returns: `true/false`

#### Read-Only Functions:
- `get-game-details` - Fetch specific game score
- `get-total-games` - Global game counter
- `get-player-games` - User's game history

---

## Stacks Integration

### 1. Wallet Connection
**Library**: `@stacks/connect`

**Flow**:
1. User clicks "Connect Wallet" in navbar
2. `WalletModal` appears with options (Hiro, Xverse, Leather)
3. On success: Store address in React state + localStorage
4. Display truncated address in navbar
5. Enable "Register" and "Submit Score" features

### 2. Contract Interactions
**Library**: `@stacks/transactions`

**Operations**:

#### Registration:
```typescript
// contractService.ts
registerPlayer(name: string)
  → Call contract function "register-player"
  → Await transaction confirmation
  → Update local state
```

#### Score Submission:
```typescript
submitScore(score: number)
  → Call contract function "submit-score"
  → Transaction broadcast
  → Poll for confirmation
  → Show success toast
  → Redirect to leaderboard
```

#### Leaderboard Fetch:
```typescript
fetchLeaderboard()
  → Read-only contract call "get-leaderboard"
  → Parse response
  → Sort and display
```

### 3. Testnet Configuration
- **Network**: Stacks Testnet
- **Deployment**: Via Clarinet to testnet
- **Faucet**: Link in UI for users to get test STX
- **Explorer**: Link to transaction on explorer.stacks.co

---

## Chainhook Integration Strategy

### Challenge: No Backend
Since there's no Firebase/Supabase, we have two approaches:

### Option 1: Client-Side Polling (Recommended for MVP)
**Implementation**:
1. After score submission, store transaction ID
2. Poll Stacks API every 3-5 seconds to check confirmation
3. Once confirmed, fetch updated leaderboard from contract
4. Display update notification

**Pros**: 
- No backend needed
- Simple implementation
- Works immediately

**Cons**:
- Not real-time
- Relies on client to fetch updates

### Option 2: Chainhook with Edge Function (Advanced)
**Architecture**:
1. Deploy lightweight Chainhook listener on Vercel Edge Function
2. Chainhook monitors contract events (score submissions)
3. Edge function receives webhook payload
4. Broadcasts to connected clients via Server-Sent Events (SSE)
5. Frontend subscribes to SSE endpoint

**Setup**:
```
Chainhook Config → Vercel Edge Function → SSE Endpoint → React Client
```

**Pros**:
- True real-time updates
- Professional UX
- All users see updates simultaneously

**Cons**:
- Requires Chainhook setup
- Vercel edge function deployment
- More complex

### Recommended Approach for This Project:
**Hybrid Model**:
1. **Initial Launch**: Client-side polling (Option 1)
2. **Phase 2**: Add Chainhook + Edge Function (Option 2)

**Phase 1 Implementation**:
```typescript
// useChainhook.ts (simplified)
useEffect(() => {
  const pollForUpdates = setInterval(() => {
    fetchLeaderboard(); // Refresh from contract
  }, 10000); // Every 10 seconds
  
  return () => clearInterval(pollForUpdates);
}, []);
```

**Phase 2 Enhancement**:
```typescript
// Vercel Edge Function: /api/chainhook-listener
export const config = { runtime: 'edge' };

export default async function handler(req) {
  // Receive Chainhook payload
  const event = await req.json();
  
  // Broadcast to SSE clients
  broadcastToClients(event);
  
  return new Response('OK');
}
```

---

## Chainhook Configuration File

### Creating the Chainhook Predicate

For this project, create a file `chainhook-config.json` in the project root:

```json
{
  "chain": "stacks",
  "uuid": "farmer-game-scores",
  "name": "Farmer Game Score Submissions",
  "version": 1,
  "networks": {
    "testnet": {
      "if_this": {
        "scope": "contract_call",
        "contract_identifier": "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC.farmer-game",
        "method": "submit-score"
      },
      "then_that": {
        "http_post": {
          "url": "https://your-app.vercel.app/api/chainhook-listener",
          "authorization_header": "Bearer YOUR_SECRET_TOKEN"
        }
      }
    }
  }
}
```

**Key Configuration Points**:
- `scope`: "contract_call" - monitors contract function calls
- `contract_identifier`: Your deployed contract address
- `method`: "submit-score" - triggers on score submissions
- `http_post.url`: Your Vercel edge function endpoint

### How to Use Chainhook:

#### Option A: Local Development (Testing)
```bash
# Install Chainhook
brew install chainhook

# Run local Chainhook node
chainhook predicates scan chainhook-config.json --testnet
```

#### Option B: Hosted Chainhook (Production - Hiro Platform)
1. Sign up for Hiro Platform account
2. Upload your `chainhook-config.json`
3. Configure webhook endpoint URL
4. Hiro handles the infrastructure

#### Option C: Self-Hosted (VPS/Cloud)
- Deploy Chainhook on a persistent server
- Configure to post to your Vercel edge function
- Manage uptime and monitoring

**For this project, recommended approach**:
- **Development**: Client-side polling (no Chainhook needed initially)
- **Production Phase 1**: Continue polling (simplest)
- **Production Phase 2**: Add Hiro Platform Chainhook + Vercel Edge Function

This allows launching quickly while keeping the option to upgrade to real-time updates later.

---

## Vercel Edge Function for Chainhook

Create file: `api/chainhook-listener.ts`

```typescript
// This is the endpoint that receives Chainhook webhooks
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Verify authorization
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CHAINHOOK_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Parse Chainhook payload
  const payload = await req.json();
  
  // Extract score submission data
  const { apply, rollback } = payload;
  
  // Process new score submissions
  for (const transaction of apply) {
    const { contract_identifier, method, args } = transaction;
    
    if (method === 'submit-score') {
      // Broadcast to connected clients via SSE
      // Or trigger refresh via WebSocket
      // Implementation depends on chosen real-time strategy
    }
  }
  
  return new Response('OK', { status: 200 });
}
```

**Environment Variable** (add to Vercel):
- `CHAINHOOK_SECRET` - Random secure token

This architecture allows the frontend to receive instant updates when scores are submitted on-chain, without polling!

---

## UI/UX Design Specifications

### Color Palette
```css
:root {
  /* Primary */
  --orange-primary: #FF8C42;
  --orange-light: #FFB380;
  --orange-dark: #E67A2E;
  
  /* Neutral */
  --white: #FFFFFF;
  --off-white: #F8F9FA;
  --gray-light: #E9ECEF;
  --gray-medium: #ADB5BD;
  --gray-dark: #495057;
  --black: #212529;
  
  /* Feedback */
  --success: #51CF66;
  --error: #FF6B6B;
  --warning: #FFD43B;
}
```

### Typography
- **Headings**: Poppins (Bold, 600)
- **Body**: Inter (Regular, 400)
- **Accent**: Fredoka (for game elements, playful)

### Responsive Breakpoints
```css
/* Mobile First */
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

### Component Design Patterns

#### Navbar (Mobile)
- Hamburger menu
- Logo centered
- Wallet button in menu

#### Navbar (Desktop)
- Logo left
- Nav links center
- Wallet button right

#### Game Canvas
- **Mobile**: Full screen, vertical orientation prioritized
- **Desktop**: Centered with max-width, aspect ratio maintained

#### Buttons
- Primary: Orange background, white text
- Secondary: White background, orange border
- Hover: Slight scale + shadow animation

#### Cards
- White background
- Subtle shadow
- Orange accent border on hover
- Rounded corners (12px)

---

## State Management

### Global State (Context/Zustand)
```typescript
interface GameState {
  // Wallet
  isConnected: boolean;
  address: string | null;
  
  // Player
  isRegistered: boolean;
  playerName: string | null;
  
  // Game
  gameStatus: 'idle' | 'playing' | 'paused' | 'ended';
  score: number;
  lives: number;
  timer: number;
  
  // Leaderboard
  leaderboardData: LeaderboardEntry[];
  lastFetched: number;
}
```

### Local Component State
- Falling objects array (game canvas)
- Modal visibility toggles
- Form inputs
- Loading states

---

## Routing Structure

```
/                    - Landing page
/dashboard           - Dashboard hub
/game                - Game page
/leaderboard         - Full leaderboard
/how-to-play         - Tutorial page
```

**React Router Setup**:
- `BrowserRouter`
- Protected route wrapper for game start (checks registration)
- Smooth page transitions

---

## Deployment Strategy

### Frontend (Vercel)
1. Build optimized production bundle
2. Environment variables:
   - `VITE_STACKS_NETWORK=testnet`
   - `VITE_CONTRACT_ADDRESS=ST...`
   - `VITE_CONTRACT_NAME=farmer-game`
3. Deploy to Vercel
4. Custom domain (optional)

### Smart Contract (Stacks Testnet)
1. Test with `clarinet test`
2. Deploy via `clarinet deploy --testnet`
3. Note contract address
4. Update frontend environment variables
5. Verify on Stacks Explorer

### Post-Deployment
- Add testnet STX faucet link
- Monitor transaction costs
- Gather user feedback
- Iterate on game balance

---

## Performance Optimizations

### Frontend
- Lazy load game assets
- Code splitting by route
- Memoize leaderboard data
- Debounce click events
- Use `requestAnimationFrame` for game loop
- Optimize SVG assets
- Implement virtual scrolling for long leaderboards

### Smart Contract
- Minimize state reads/writes
- Batch leaderboard queries
- Cache player registration checks
- Efficient sorting algorithms

---

## Testing Strategy

### Frontend Testing
- **Unit Tests**: Game logic (score calculation, collision detection)
- **Component Tests**: Button clicks, modal interactions
- **E2E Tests**: Full gameplay flow, score submission
- **Visual Regression**: Screenshot comparisons

### Contract Testing
- Clarinet unit tests for each function
- Edge cases: Invalid names, duplicate registrations
- Gas optimization tests
- Leaderboard sorting accuracy

---

## Future Enhancements (Post-MVP)

### Gameplay
- Power-ups (double points, shield)
- Seasonal fruits/themes
- Difficulty levels (easy/medium/hard)
- Combo multipliers

### Social Features
- Share score on social media
- Friend challenges
- Team competitions

### Blockchain
- NFT rewards for milestones
- Token rewards for top players
- On-chain achievements

### Technical
- Full Chainhook integration with SSE
- Replay system (save game sessions)
- Analytics dashboard
- Mobile app (React Native)

---

## Development Checklist

### Phase 1: Foundation (Week 1)
- [ ] Setup Vite + React + TypeScript
- [ ] Install Stacks dependencies
- [ ] Create basic routing
- [ ] Design system setup (colors, typography)
- [ ] Navbar component
- [ ] Landing page layout

### Phase 2: Smart Contract (Week 1-2)
- [ ] Write Clarity contract
- [ ] Unit tests
- [ ] Deploy to testnet
- [ ] Verify functionality

### Phase 3: Wallet Integration (Week 2)
- [ ] Connect wallet flow
- [ ] Registration modal
- [ ] Contract interaction service
- [ ] Transaction status tracking

### Phase 4: Game Development (Week 2-3)
- [ ] Game engine logic
- [ ] Falling object physics
- [ ] Collision detection
- [ ] Score calculation
- [ ] Timer & lives system
- [ ] Game over handling

### Phase 5: UI/UX (Week 3-4)
- [ ] Dashboard page
- [ ] Game canvas design
- [ ] Leaderboard table
- [ ] Mobile responsive design
- [ ] Animations & transitions
- [ ] Loading states

### Phase 6: Integration (Week 4)
- [ ] Score submission to contract
- [ ] Leaderboard fetching
- [ ] Real-time updates (polling)
- [ ] Error handling
- [ ] Toast notifications

### Phase 7: Polish & Deploy (Week 4-5)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] User testing
- [ ] Bug fixes

---

## Technical Considerations

### Game Performance
- Target 60 FPS on mobile
- Limit max simultaneous objects (15-20)
- Clean up off-screen objects immediately
- Use CSS transforms for hardware acceleration

### Blockchain Considerations
- Transaction costs: ~0.001 STX per submission
- Confirmation time: 10-30 seconds
- Contract call limits: Handle errors gracefully
- Show pending state during transactions

### Mobile Optimization
- Touch-friendly targets (min 44px)
- Prevent scroll during gameplay
- Landscape orientation lock (optional)
- PWA manifest for "Add to Home Screen"

---

## Security & Best Practices

### Smart Contract
- Input validation on all functions
- Prevent overflow/underflow (Clarity handles this)
- Rate limiting considerations (contract level)
- No admin backdoors (fully decentralized)

### Frontend
- Sanitize user inputs (player names)
- Validate scores client-side before submission
- Secure environment variable handling
- HTTPS only (Vercel default)

### User Safety
- Clear testnet warnings
- Transaction cost disclosure
- No personal data collection (only wallet address + name)
- Open source for transparency

---

## Success Metrics

### User Engagement
- Daily active users
- Average session duration
- Games played per user
- Return rate

### Blockchain Metrics
- Total registrations
- Scores submitted
- Transaction success rate
- Average gas costs

### Technical Metrics
- Page load time < 2s
- Game FPS > 55
- Contract call success > 95%
- Mobile usability score > 90

---

## Conclusion

This farmer game combines engaging gameplay with blockchain technology, creating a transparent and fair competitive experience. The architecture prioritizes:

1. **User Experience**: No forced wallet connection, play first
2. **Simplicity**: Clean contract, straightforward game mechanics
3. **Scalability**: Modular components, easy to extend
4. **Mobile-First**: Optimized for touch devices
5. **Decentralization**: On-chain leaderboard, no central database

The phased development approach ensures a solid MVP while leaving room for future enhancements. The client-side polling approach for Chainhook allows immediate deployment, with the option to upgrade to real-time SSE later.

**Ready to build a fun, fair, and blockchain-powered gaming experience! 🎮🍎🚀**
