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
      <h2 className="text-2xl font-bold text-purple mb-4">Players</h2>
      <ul className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <span className="text-lg font-semibold">{player.name}</span>
            <span className="text-primary">
              Kills: <span className="text-white">{player.kills}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center p-4 bg-card rounded-lg shadow-md text-lg font-semibold">
        <span className="text-accent">Total Team Kills:</span>
        <span className="text-purple">{totalKills}</span>
      </div>
    </div>
  );
};

export default PlayerList;
