import React, { useState } from "react";

interface MatchesFilterProps {
  options: ("ALL MATCHES" | "UPCOMING" | "FINISHED")[]; // Filter options
  defaultFilter: "ALL MATCHES" | "UPCOMING" | "FINISHED"; // Default filter
  onFilterChange: (filter: "ALL MATCHES" | "UPCOMING" | "FINISHED") => void; // Callback for filter change
}

const MatchesFilter: React.FC<MatchesFilterProps> = ({
  options,
  defaultFilter,
  onFilterChange,
}) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  const handleFilterClick = (
    filter: "ALL MATCHES" | "UPCOMING" | "FINISHED"
  ) => {
    setActiveFilter(filter);
    onFilterChange(filter); // Notify the parent component
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10 mt-8">
      {options.map((option) => (
        <button
          key={option}
          className={`text-sm lg:text-base px-6 py-2 font-semibold rounded-md ${
            activeFilter === option
              ? "border-b-4 border-t-4 border-primary text-purple"
              : "text-muted-foreground hover:text-lightGray transition-all duration-300"
          }`}
          onClick={() => handleFilterClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MatchesFilter;
