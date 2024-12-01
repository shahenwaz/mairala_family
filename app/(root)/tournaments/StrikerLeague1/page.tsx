import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

export default function StrikerLeague1() {
  const tournament = {
    title: "STRIKER LEAGUE 1.0",
    logo: "/images/SND_SLS1_LOGO.png", // Replace with actual logo path
    startDate: "01/12/2024",
    endDate: "15/12/2024",
    status: "Ongoing",
    background: "/images/CODM_BG1.jpg", // Replace with actual background path
  };

  return (
    <div className="relative">
      {/* Background Section */}
      <div className="relative h-[15rem] bg-black border-b border-muted">
        <Image
          src={tournament.background}
          alt="Tournament Background"
          fill
          className="object-cover object-center opacity-90 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"></div>

        {/* Tournament Details */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3 px-4 text-center">
          {/* Logo */}
          <img
            src={tournament.logo}
            alt={tournament.title}
            className="h-24 w-24 object-contain"
          />

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {tournament.title}
          </h1>

          {/* Dates and Status */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-secondary-foreground text-xs md:text-sm">
            <span>Start: {tournament.startDate}</span>
            <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-md">
              {tournament.status}
            </Badge>
            <span>End: {tournament.endDate}</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
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
              <p className="text-secondary-foreground text-center mt-4">
                Leaderboards content goes here...
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
