export interface Tournament {
  tourtitle: string;
  tourlogo: string;
  startdate: string;
  enddate: string;
  tourstatus: "Ongoing" | "Finalized";
  tourbg: string;
}

export interface Team {
  teamname: string;
  teamlogo: string;
  playercount: number;
  roundwon: number;
  teamkills: number;
}

export interface Player {
  playername: string;
  playerkills: number;
  teamname: string;
}
