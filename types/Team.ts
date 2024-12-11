export interface Team {
  _id: string; // Use the MongoDB `_id` as `id`
  name: string; // Team name
  playerCount: number; // Number of players
  rw: number; // Rounds won
  kills: number; // Total kills
  tournamentId: string; // Associated tournament
}
