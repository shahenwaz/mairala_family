"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import TournamentDetails from "@/components/tournament/TournamentDetails";

const TournamentPage = ({ params }: { params: { uniqueId: string } }) => {
  const { uniqueId } = params;
  const [tournament, setTournament] = useState<any | null>(null);

  useEffect(() => {
    axios
      .get(`/api/tournaments?uniqueId=${uniqueId}`)
      .then((res) => setTournament(res.data))
      .catch((err) => console.error(err));
  }, [uniqueId]);

  if (!tournament) return <p>Loading...</p>;

  return (
    <div>
      <TournamentDetails {...tournament} />
    </div>
  );
};

export default TournamentPage;
