export interface Tournament {
  tourtitle: string;
  tourlogo: string;
  startdate: string;
  enddate: string;
  tourstatus: "Ongoing" | "Finalized";
  tourbg: string;
}

export interface Team {
  id: string;
  teamname: string;
  teamlogo: string;
  playercount: number;
  roundwon: number;
  teamkills: number;
  players: Player[];
}

export interface Player {
  playername: string;
  playerkills: number;
  teamname: string;
}
