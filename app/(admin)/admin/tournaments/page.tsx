"use client";

const TournamentsPage = () => {
  const tournaments = [
    { id: 1, name: "Striker League", status: "Ongoing" },
    { id: 2, name: "Winter Cup", status: "Upcoming" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground]">
        Manage Tournaments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="p-4 bg-card text-foreground rounded-lg card-hover"
          >
            <h3 className="font-semibold">{tournament.name}</h3>
            <p className="text-sm text-muted-foreground">
              Status: {tournament.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
