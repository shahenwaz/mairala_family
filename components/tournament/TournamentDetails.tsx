import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TournamentDetailsProps {
  tourTitle: string;
  tourLogo: string;
  startDate: string;
  endDate: string;
  tourStatus: string;
  tourBG: string;
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({
  tourTitle,
  tourLogo,
  startDate,
  endDate,
  tourStatus,
  tourBG,
}) => {
  // Determine the color scheme based on the tournament status
  const badgeColor =
    tourStatus === "Ongoing"
      ? "bg-yellow-400 text-primary-foreground"
      : "bg-primary text-primary-foreground";

  return (
    <div className="relative">
      {/* Background Section */}
      <div className="relative h-[15rem] bg-black border-b border-muted">
        {/* Background Image */}
        <Image
          src={tourBG}
          alt="Tournament Background"
          fill
          className="object-cover object-center opacity-90 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"></div>

        {/* Tournament Details */}
        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3 px-4 text-center">
          {/* Logo */}
          <Image
            src={tourLogo}
            alt={tourTitle}
            width={96} // Explicitly set width (adjust as necessary)
            height={96} // Explicitly set height (adjust as necessary)
            className="object-contain rounded-md"
          />

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {tourTitle}
          </h1>

          {/* Dates and Status */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-secondary-foreground text-xs md:text-sm">
            <span>Start: {startDate}</span>
            <Badge className={`font-bold px-3 py-1 rounded-md ${badgeColor}`}>
              {tourStatus}
            </Badge>
            <span>End: {endDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
