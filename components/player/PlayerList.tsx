import { UserIcon } from "lucide-react";

interface Player {
  playername: string;
  playerkills: number;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  // Sort players by kills in descending order
  const sortedPlayers = players.sort((a, b) => b.playerkills - a.playerkills);

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
            <div className="flex items-center gap-2">
              <UserIcon className="text-primary" />
              <span className="text-lg font-semibold">{player.playername}</span>
            </div>
            <span className="text-primary">
              Kills: <span className="text-white">{player.playerkills}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
