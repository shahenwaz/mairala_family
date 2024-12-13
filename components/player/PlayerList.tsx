interface Player {
  name: string;
  kills: number;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList = ({ players }: PlayerListProps) => {
  const sortedPlayers = players.sort((a, b) => b.kills - a.kills);
  const totalKills = players.reduce((sum, player) => sum + player.kills, 0);

  return (
    <div>
      <h2 className="mb-4 mt-6 text-xl lg:text-2xl font-bold text-center text-purple lg:text-start">
        Players
      </h2>
      <ul className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 overflow-hidden rounded-lg bg-card card-hover"
          >
            <span className="text-lg font-semibold">{player.name}</span>
            <span className="text-primary">
              Kills: <span className="text-white">{player.kills}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between p-4 mt-4 text-lg font-semibold rounded-lg bg-card card-hover">
        <span className="text-accent">Total Team Kills:</span>
        <span className="text-purple">{totalKills}</span>
      </div>
    </div>
  );
};

export default PlayerList;
