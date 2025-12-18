import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const player1 = accounts.get("wallet_1")!;
const player2 = accounts.get("wallet_2")!;

describe("Farmer Game Contract Tests", () => {
  
  // ===================================
  // Registration Tests
  // ===================================
  
  describe("Player Registration", () => {
    it("should allow a player to register with valid name", () => {
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      expect(result).toBeOk(Cl.bool(true));
      
      // Verify player is registered
      const isRegistered = simnet.callReadOnlyFn(
        "farmer-game",
        "is-registered",
        [Cl.principal(player1)],
        player1
      );
      
      expect(isRegistered.result).toBe(Cl.bool(true));
    });
    
    it("should reject registration with name too short (< 3 chars)", () => {
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("Jo")],
        player1
      );
      
      expect(result).toBeErr(Cl.uint(102)); // ERR-INVALID-NAME-LENGTH
    });
    
    it("should reject registration with name too long (> 50 chars)", () => {
      const longName = "A".repeat(51);
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii(longName)],
        player1
      );
      
      expect(result).toBeErr(Cl.uint(102)); // ERR-INVALID-NAME-LENGTH
    });
    
    it("should reject duplicate registration", () => {
      // First registration
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Attempt duplicate registration
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe2")],
        player1
      );
      
      expect(result).toBeErr(Cl.uint(101)); // ERR-ALREADY-REGISTERED
    });
    
    it("should store correct player data after registration", () => {
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("TestPlayer")],
        player1
      );
      
      const playerInfo = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-info",
        [Cl.principal(player1)],
        player1
      );
      
      expect(playerInfo.result).toBeSome(
        Cl.tuple({
          name: Cl.stringAscii("TestPlayer"),
          "registered-at": Cl.uint(simnet.blockHeight),
          "total-games": Cl.uint(0)
        })
      );
    });
  });
  
  // ===================================
  // Score Submission Tests
  // ===================================
  
  describe("Score Submission", () => {
    it("should reject score submission from unregistered player", () => {
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(100)],
        player1
      );
      
      expect(result).toBeErr(Cl.uint(100)); // ERR-NOT-REGISTERED
    });
    
    it("should reject score of 0", () => {
      // Register player first
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Try to submit score of 0
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(0)],
        player1
      );
      
      expect(result).toBeErr(Cl.uint(103)); // ERR-INVALID-SCORE
    });
    
    it("should accept valid score from registered player", () => {
      // Register player
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Submit score
      const { result } = simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(450)],
        player1
      );
      
      expect(result).toBeOk(Cl.uint(1)); // Returns game-id 1
    });
    
    it("should increment game counter correctly", () => {
      // Register player
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Submit first score
      const result1 = simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(100)],
        player1
      );
      expect(result1.result).toBeOk(Cl.uint(1));
      
      // Submit second score
      const result2 = simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(200)],
        player1
      );
      expect(result2.result).toBeOk(Cl.uint(2));
      
      // Check total games
      const totalGames = simnet.callReadOnlyFn(
        "farmer-game",
        "get-total-games",
        [],
        player1
      );
      expect(totalGames.result).toBeOk(Cl.uint(2));
    });
    
    it("should update leaderboard when score is new best", () => {
      // Register player
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Submit first score
      simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(300)],
        player1
      );
      
      // Submit higher score
      simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(500)],
        player1
      );
      
      // Check best score
      const bestScore = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-best-score",
        [Cl.principal(player1)],
        player1
      );
      
      expect(bestScore.result).toBe(Cl.uint(500));
    });
    
    it("should not update best score when new score is lower", () => {
      // Register player
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Submit high score
      simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(500)],
        player1
      );
      
      // Submit lower score
      simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(300)],
        player1
      );
      
      // Best score should still be 500
      const bestScore = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-best-score",
        [Cl.principal(player1)],
        player1
      );
      
      expect(bestScore.result).toBe(Cl.uint(500));
    });
    
    it("should increment total games counter", () => {
      // Register player
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      // Submit three scores
      simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(100)], player1);
      simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(200)], player1);
      simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(300)], player1);
      
      // Check leaderboard entry
      const leaderboardEntry = simnet.callReadOnlyFn(
        "farmer-game",
        "get-leaderboard-entry",
        [Cl.principal(player1)],
        player1
      );
      
      expect(leaderboardEntry.result).toBeSome(
        Cl.tuple({
          "best-score": Cl.uint(300),
          "last-played": Cl.uint(simnet.blockHeight),
          "total-games": Cl.uint(3)
        })
      );
    });
  });
  
  // ===================================
  // Read Function Tests
  // ===================================
  
  describe("Read-Only Functions", () => {
    it("should return player info for registered player", () => {
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("TestPlayer")],
        player1
      );
      
      const playerInfo = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-info",
        [Cl.principal(player1)],
        player1
      );
      
      expect(playerInfo.result).toBeSome(
        Cl.tuple({
          name: Cl.stringAscii("TestPlayer"),
          "registered-at": Cl.uint(simnet.blockHeight),
          "total-games": Cl.uint(0)
        })
      );
    });
    
    it("should return none for unregistered player", () => {
      const playerInfo = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-info",
        [Cl.principal(player1)],
        player1
      );
      
      expect(playerInfo.result).toBeNone();
    });
    
    it("should return 0 for player with no scores", () => {
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("NewPlayer")],
        player1
      );
      
      const bestScore = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-best-score",
        [Cl.principal(player1)],
        player1
      );
      
      expect(bestScore.result).toBe(Cl.uint(0));
    });
    
    it("should return true for registered player", () => {
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("RegisteredPlayer")],
        player1
      );
      
      const isRegistered = simnet.callReadOnlyFn(
        "farmer-game",
        "is-registered",
        [Cl.principal(player1)],
        player1
      );
      
      expect(isRegistered.result).toBe(Cl.bool(true));
    });
    
    it("should return false for unregistered player", () => {
      const isRegistered = simnet.callReadOnlyFn(
        "farmer-game",
        "is-registered",
        [Cl.principal(player1)],
        player1
      );
      
      expect(isRegistered.result).toBe(Cl.bool(false));
    });
    
    it("should return game details for valid game-id", () => {
      // Register and submit score
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("FarmerJoe")],
        player1
      );
      
      simnet.callPublicFn(
        "farmer-game",
        "submit-score",
        [Cl.uint(450)],
        player1
      );
      
      // Get game details
      const gameDetails = simnet.callReadOnlyFn(
        "farmer-game",
        "get-game-details",
        [Cl.uint(1)],
        player1
      );
      
      expect(gameDetails.result).toBeSome(
        Cl.tuple({
          player: Cl.principal(player1),
          score: Cl.uint(450),
          timestamp: Cl.uint(simnet.blockHeight),
          "game-id": Cl.uint(1)
        })
      );
    });
  });
  
  // ===================================
  // Edge Cases & Multi-Player Tests
  // ===================================
  
  describe("Edge Cases", () => {
    it("should handle multiple players independently", () => {
      // Register two players
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("Player1")],
        player1
      );
      
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("Player2")],
        player2
      );
      
      // Submit scores
      simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(300)], player1);
      simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(500)], player2);
      
      // Check individual best scores
      const player1Best = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-best-score",
        [Cl.principal(player1)],
        player1
      );
      
      const player2Best = simnet.callReadOnlyFn(
        "farmer-game",
        "get-player-best-score",
        [Cl.principal(player2)],
        player2
      );
      
      expect(player1Best.result).toBe(Cl.uint(300));
      expect(player2Best.result).toBe(Cl.uint(500));
    });
    
    it("should maintain unique sequential game IDs", () => {
      // Register two players
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("Player1")],
        player1
      );
      
      simnet.callPublicFn(
        "farmer-game",
        "register-player",
        [Cl.stringAscii("Player2")],
        player2
      );
      
      // Submit scores from different players
      const result1 = simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(100)], player1);
      const result2 = simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(200)], player2);
      const result3 = simnet.callPublicFn("farmer-game", "submit-score", [Cl.uint(300)], player1);
      
      expect(result1.result).toBeOk(Cl.uint(1));
      expect(result2.result).toBeOk(Cl.uint(2));
      expect(result3.result).toBeOk(Cl.uint(3));
    });
  });
});
