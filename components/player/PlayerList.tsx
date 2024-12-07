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
      <h2 className="text-2xl font-bold text-primary mb-4">Players</h2>
      <ul className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-card rounded-lg shadow-md"
          >
            <span className="text-lg font-semibold">{player.name}</span>
            <span className="text-primary">Kills: {player.kills}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-lg font-bold text-accent">
        Total Kills: {totalKills}
      </div>
    </div>
  );
};

export default PlayerList;
