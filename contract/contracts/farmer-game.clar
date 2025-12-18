;; Title: Farmer Game Contract
;; Version: 1.0.0
;; Description: Player registration, score submission, and leaderboard management for a fruit-catching game

;; ===================================
;; Constants - Error Codes
;; ===================================

(define-constant ERR-NOT-REGISTERED (err u100))
(define-constant ERR-ALREADY-REGISTERED (err u101))
(define-constant ERR-INVALID-NAME-LENGTH (err u102))
(define-constant ERR-INVALID-SCORE (err u103))
(define-constant ERR-UNAUTHORIZED (err u104))

;; ===================================
;; Data Variables
;; ===================================

(define-data-var game-counter uint u0)
(define-data-var min-name-length uint u3)
(define-data-var max-name-length uint u50)

;; ===================================
;; Data Maps
;; ===================================

;; Store player registration information
(define-map players 
  principal 
  {
    name: (string-ascii 50),
    registered-at: uint,
    total-games: uint
  }
)

;; Store individual game results
(define-map scores
  uint ;; game-id as key
  {
    player: principal,
    score: uint,
    timestamp: uint,
    game-id: uint
  }
)

;; Store best performance per player
(define-map leaderboard-entries
  principal
  {
    best-score: uint,
    last-played: uint,
    total-games: uint
  }
)

;; ===================================
;; Private Functions (Helpers)
;; ===================================

;; Validate name length is within acceptable range
(define-private (is-valid-name-length (name (string-ascii 50)))
  (let
    (
      (name-len (len name))
      (min-len (var-get min-name-length))
      (max-len (var-get max-name-length))
    )
    (and 
      (>= name-len min-len)
      (<= name-len max-len)
    )
  )
)

;; Check if a player is registered
(define-private (is-player-registered (player principal))
  (is-some (map-get? players player))
)

;; ===================================
;; Read-Only Functions
;; ===================================

;; Get player information
(define-read-only (get-player-info (player principal))
  (map-get? players player)
)

;; Get player's best score from leaderboard
(define-read-only (get-player-best-score (player principal))
  (match (map-get? leaderboard-entries player)
    entry (get best-score entry)
    u0
  )
)

;; Check if a player is registered
(define-read-only (is-registered (player principal))
  (is-player-registered player)
)

;; Get specific game details by game-id
(define-read-only (get-game-details (game-id uint))
  (map-get? scores game-id)
)

;; Get total number of games played across all players
(define-read-only (get-total-games)
  (ok (var-get game-counter))
)

;; Get player's leaderboard entry (best score, total games, last played)
(define-read-only (get-leaderboard-entry (player principal))
  (map-get? leaderboard-entries player)
)

;; ===================================
;; Public Functions
;; ===================================

;; Register a new player with username
(define-public (register-player (name (string-ascii 50)))
  (let
    (
      (player tx-sender)
    )
    ;; Validate player is not already registered
    (asserts! (not (is-player-registered player)) ERR-ALREADY-REGISTERED)
    
    ;; Validate name length
    (asserts! (is-valid-name-length name) ERR-INVALID-NAME-LENGTH)
    
    ;; Store player registration data
    (map-set players
      player
      {
        name: name,
        registered-at: stacks-block-height,
        total-games: u0
      }
    )
    
    ;; Initialize leaderboard entry
    (map-set leaderboard-entries
      player
      {
        best-score: u0,
        last-played: stacks-block-height,
        total-games: u0
      }
    )
    
    ;; Emit registration event
    (print {
      event: "player-registered",
      player: player,
      name: name,
      block-height: stacks-block-height
    })
    
    (ok true)
  )
)

;; Submit a game score
(define-public (submit-score (score uint))
  (let
    (
      (player tx-sender)
      (current-game-id (var-get game-counter))
      (new-game-id (+ current-game-id u1))
    )
    ;; Validate player is registered
    (asserts! (is-player-registered player) ERR-NOT-REGISTERED)
    
    ;; Validate score is greater than 0
    (asserts! (> score u0) ERR-INVALID-SCORE)
    
    ;; Increment game counter
    (var-set game-counter new-game-id)
    
    ;; Store score in scores map
    (map-set scores
      new-game-id
      {
        player: player,
        score: score,
        timestamp: stacks-block-height,
        game-id: new-game-id
      }
    )
    
    ;; Update leaderboard and player stats
    (match (map-get? leaderboard-entries player)
      current-entry
        (let
          (
            (current-best (get best-score current-entry))
            (current-total-games (get total-games current-entry))
            (new-best (if (> score current-best) score current-best))
          )
          ;; Update leaderboard entry
          (map-set leaderboard-entries
            player
            {
              best-score: new-best,
              last-played: stacks-block-height,
              total-games: (+ current-total-games u1)
            }
          )
          
          ;; Update player's total games count
          (match (map-get? players player)
            player-data
              (map-set players
                player
                (merge player-data { total-games: (+ current-total-games u1) })
              )
            false
          )
        )
      ;; If no leaderboard entry exists (shouldn't happen if registered properly)
      (begin
        (map-set leaderboard-entries
          player
          {
            best-score: score,
            last-played: stacks-block-height,
            total-games: u1
          }
        )
        true
      )
    )
    
    ;; Emit score submission event for Chainhook
    (print {
      event: "score-submitted",
      player: player,
      score: score,
      game-id: new-game-id,
      timestamp: stacks-block-height
    })
    
    ;; Return the game-id
    (ok new-game-id)
  )
)
