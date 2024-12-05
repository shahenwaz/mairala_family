"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Users, Trophy } from "lucide-react";

interface TournamentTabsProps {
  defaultTab: string;
  onTabChange?: (tab: string) => void;
  children: React.ReactNode;
}

const TournamentTabs: React.FC<TournamentTabsProps> = ({
  defaultTab,
  onTabChange,
  children,
}) => {
  return (
    <Tabs
      defaultValue={defaultTab}
      className="w-full"
      onValueChange={onTabChange}
    >
      <TabsList className="flex justify-center gap-2 md:gap-6 bg-card rounded-lg shadow-md sm:p-3 md:p-4">
        <TabsTrigger
          value="matches"
          className="font-semibold hover:text-primary focus:text-primary active:text-primary transition-all 
                     text-[10px] sm:text-xs md:text-sm"
        >
          <Gamepad2 className="w-3 h-3 md:w-5 md:h-5 mr-1" />
          MATCHES
        </TabsTrigger>
        <TabsTrigger
          value="teams"
          className="font-semibold hover:text-primary focus:text-primary active:text-primary transition-all 
                     text-[10px] sm:text-xs md:text-sm"
        >
          <Users className="w-3 h-3 md:w-5 md:h-5 mr-1" />
          TEAMS
        </TabsTrigger>
        <TabsTrigger
          value="leaderboards"
          className="font-semibold hover:text-primary focus:text-primary active:text-primary transition-all 
                     text-[10px] sm:text-xs md:text-sm"
        >
          <Trophy className="w-3 h-3 md:w-5 md:h-5 mr-1" />
          LEADERBOARDS
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TournamentTabs;
