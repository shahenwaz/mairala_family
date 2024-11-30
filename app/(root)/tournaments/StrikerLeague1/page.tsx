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
      <div className="relative h-[15rem] bg-black">
        <Image
          src={tournament.background}
          alt="Tournament Background"
          fill
          className="object-cover object-center opacity-80 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"></div>

        {/* Tournament Details */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-4 px-4 text-center">
          {/* Logo */}
          <img
            src={tournament.logo}
            alt={tournament.title}
            className="h-28 w-28 object-contain"
          />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {tournament.title}
          </h1>

          {/* Dates and Status */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-secondary-foreground text-sm md:text-base">
            <span>Start Date: {tournament.startDate}</span>
            <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-md">
              {tournament.status}
            </Badge>
            <span>End Date: {tournament.endDate}</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full bg-background py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full">
            {/* Tabs List with Updated Padding */}
            <TabsList className="flex justify-center gap-6 bg-card rounded-lg shadow-md p-3">
              <TabsTrigger
                value="dashboard"
                className="rounded-md font-semibold bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:bg-primary/80 active:text-primary-foreground transition-all"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="matches"
                className="rounded-md font-semibold bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:bg-primary/80 active:text-primary-foreground transition-all"
              >
                Matches
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="rounded-md font-semibold bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:bg-primary/80 active:text-primary-foreground transition-all"
              >
                Teams
              </TabsTrigger>
              <TabsTrigger
                value="leaderboards"
                className="rounded-md font-semibold bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:bg-primary/80 active:text-primary-foreground transition-all"
              >
                Leaderboards
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
