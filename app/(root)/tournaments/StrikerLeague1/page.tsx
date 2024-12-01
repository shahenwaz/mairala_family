import TournamentDetails from "@/components/tournament/TournamentDetails";
import TeamLeaderboard from "@/components/tournament/TeamLeaderboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function StrikerLeague1() {
  const tournament = {
    title: "STRIKER LEAGUE 1.0",
    logo: "/images/SND_SLS1_LOGO.png",
    startDate: "01/12/2024",
    endDate: "15/12/2024",
    status: "Ongoing",
    background: "/images/CODM_BG1.jpg",
  };

  const teams = [
    {
      rank: 1,
      name: "DISCIPLES OF MAYHEM",
      logo: "/images/CODM_LOGO.png",
      rw: 67,
      kills: 393,
    },
    {
      rank: 2,
      name: "QUITE ONE ELITE",
      logo: "/images/CODM_LOGO.png",
      rw: 73,
      kills: 356,
    },
    {
      rank: 3,
      name: "VENGEANCE SEEKERS",
      logo: "/images/CODM_LOGO.png",
      rw: 43,
      kills: 306,
    },
    {
      rank: 4,
      name: "GRUMBLING GANGSTERS",
      logo: "/images/CODM_LOGO.png",
      rw: 48,
      kills: 296,
    },
    {
      rank: 5,
      name: "GRUMBLING GANGSTERS 2.0",
      logo: "/images/CODM_LOGO.png",
      rw: 28,
      kills: 162,
    },
    {
      rank: 6,
      name: "TOXIQUE GIRLS",
      logo: "/images/CODM_LOGO.png",
      rw: 25,
      kills: 147,
    },
    {
      rank: 7,
      name: "BTV",
      logo: "/images/CODM_LOGO.png",
      rw: 23,
      kills: 139,
    },
    {
      rank: 8,
      name: "TEAM MAIRALA",
      logo: "/images/CODM_LOGO.png",
      rw: 27,
      kills: 104,
    },
    {
      rank: 9,
      name: "THE MIGHTY FORCE",
      logo: "/images/CODM_LOGO.png",
      rw: 12,
      kills: 81,
    },
    {
      rank: 10,
      name: "ASTRAL LEGIONS",
      logo: "/images/CODM_LOGO.png",
      rw: 4,
      kills: 47,
    },
    {
      rank: 11,
      name: "TEAM OMEGA",
      logo: "/images/CODM_LOGO.png",
      rw: 3,
      kills: 45,
    },
    {
      rank: 12,
      name: "LIONS ROAR",
      logo: "/images/CODM_LOGO.png",
      rw: 9,
      kills: 43,
    },
    {
      rank: 13,
      name: "TEAM EPSILON",
      logo: "/images/CODM_LOGO.png",
      rw: 0,
      kills: 43,
    },
    {
      rank: 14,
      name: "GANGS OF COD",
      logo: "/images/CODM_LOGO.png",
      rw: 0,
      kills: 18,
    },
    {
      rank: 15,
      name: "BLOOD CULT",
      logo: "/images/CODM_LOGO.png",
      rw: 7,
      kills: 10,
    },
    {
      rank: 16,
      name: "TEAM ALPHA",
      logo: "/images/CODM_LOGO.png",
      rw: 0,
      kills: 0,
    },
  ];

  return (
    <div>
      <TournamentDetails {...tournament} />
      <div className="w-full bg-background py-3">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full">
            {/* Tabs List */}
            <TabsList className="flex justify-center gap-2 md:gap-6 bg-card rounded-lg shadow-md p-2 md:p-3">
              <TabsTrigger
                value="dashboard"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                DASHBOARD
              </TabsTrigger>
              <TabsTrigger
                value="matches"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                MATCHES
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                TEAMS
              </TabsTrigger>
              <TabsTrigger
                value="leaderboards"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                LEADERBOARDS
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="dashboard">
              <p className="text-secondary-foreground text-center mt-4">
                Dashboard content goes here...
              </p>
            </TabsContent>
            <TabsContent value="matches">
              <p className="text-secondary-foreground text-center mt-4">
                Matches content goes here...
              </p>
            </TabsContent>
            <TabsContent value="teams">
              <p className="text-secondary-foreground text-center mt-4">
                Teams content goes here...
              </p>
            </TabsContent>
            <TabsContent value="leaderboards">
              <TeamLeaderboard teams={teams} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
