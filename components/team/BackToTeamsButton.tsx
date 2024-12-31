import { useRouter } from "next/navigation";

const BackToTeamsButton = ({ tournamentId }: { tournamentId: string }) => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-1 px-2 py-1 mx-auto my-4 text-xs font-medium transition border rounded-md lg:text-sm text-lightGray border-lightGray hover:bg-primary hover:text-primary-foreground"
      onClick={() => router.push(`/tournaments/${tournamentId}`)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 md:w-4 md:h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      BACK TO TEAMS
    </button>
  );
};

export default BackToTeamsButton;
