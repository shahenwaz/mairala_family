const TeamLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 sm:space-y-4 bg-background animate-fadeIn">
      {/* Rotating Gradient Spinner */}
      <div className="relative w-16 h-16 sm:w-12 sm:h-12">
        <div className="absolute w-full h-full border-4 border-t-purple border-r-darkGray border-b-purple border-l-darkGray rounded-full animate-spin"></div>
      </div>
      {/* Loading Message - Primary */}
      <p className="md:text-xl text-md font-bold text-lightGray tracking-wide animate-pulse mb-10">
        Loading team details...
      </p>
      {/* Patience Message - Highlighted */}
      <h1 className="text-2xl lg:text-4xl font-extrabold text-primary animate-bounce text-center">
        PLEASE KEEP PATIENCE !!!
      </h1>
    </div>
  );
};

export default TeamLoadingState;
