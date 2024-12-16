export interface Team {
  teamName: string;
  teamLogo: string;
  playerCount: number;
  roundWon: number;
  teamKills: number;
}

export interface Player {
  playerName: string;
  playerKills: number;
  teamName: string;
}
