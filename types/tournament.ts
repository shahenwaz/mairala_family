export interface Tournament {
  tourTitle: string;
  tourLogo: string;
  startDate: string;
  endDate: string;
  tourStatus: "Ongoing" | "Finalized";
  tourBG: string;
}

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
