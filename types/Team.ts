export interface Team {
  _id: string;
  teamName: string;
  rw: number; // Rounds Won (default: 0)
  teamKills: number; // Total Kills (default: 0)
  tournamentId: string;
  playerCount: number; // Total number of players
}

export interface Player {
  _id: string;
  playerName: string;
  playerKills: number;
  teamId: string;
}
