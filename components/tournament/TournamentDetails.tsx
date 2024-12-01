import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TournamentDetailsProps {
  title: string;
  logo: string;
  startDate: string;
  endDate: string;
  status: string;
  background: string;
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({
  title,
  logo,
  startDate,
  endDate,
  status,
  background,
}) => {
  // Determine the color scheme based on the tournament status
  const badgeColor =
    status === "Ongoing"
      ? "bg-yellow-400 text-primary-foreground"
      : "bg-primary text-primary-foreground";

  return (
    <div className="relative">
      {/* Background Section */}
      <div className="relative h-[15rem] bg-black border-b border-muted">
        <Image
          src={background}
          alt="Tournament Background"
          fill
          className="object-cover object-center opacity-90 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"></div>

        {/* Tournament Details */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3 px-4 text-center">
          {/* Logo */}
          <img src={logo} alt={title} className="h-24 w-24 object-contain" />

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h1>

          {/* Dates and Status */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-secondary-foreground text-xs md:text-sm">
            <span>Start: {startDate}</span>
            <Badge className={`font-bold px-3 py-1 rounded-md ${badgeColor}`}>
              {status}
            </Badge>
            <span>End: {endDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
