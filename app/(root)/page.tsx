import MatchCard from "@/components/match/MatchCard";

export default function Home() {
  // Define Match type
  interface Match {
    team1: string;
    team2: string;
    team1Logo: string;
    team2Logo: string;
    score: string;
    round: string;
    date: string;
    status: "Upcoming" | "Finished";
  }

  // Dummy matches array
  const matches: Match[] = [
    {
      team1: "SHURIKEN THE HUNTERS",
      team2: "DRAGONS ON THE GO",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "0 : 0",
      round: "Round Robin",
      date: "5 OCTOBER 2024, 10:00 PM BST",
      status: "Upcoming",
    },
    {
      team1: "DISCIPLES OF MAYHEM",
      team2: "GRUMBLING GANGSTERS 2.0",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "0 : 0",
      round: "Semi-Final",
      date: "6 OCTOBER 2024, 8:00 PM BST",
      status: "Upcoming",
    },
  ];

  // Filter only upcoming matches
  const upcomingMatches = matches.filter(
    (match) => match.status === "Upcoming"
  );

  return (
    <div className="w-full bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="mb-">
          {/* Subtitle */}
          <h2 className="text-center text-sm font-bold text-muted-foreground mb-2">
            STRIKER LEAGUE 1.0
          </h2>

          {/* Title */}
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
            UPCOMING MATCHES
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match: Match, index: number) => (
              <MatchCard key={index} {...match} />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No upcoming matches available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
