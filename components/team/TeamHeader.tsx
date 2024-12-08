import Image from "next/image";

interface TeamHeaderProps {
  name: string;
  logo: string;
}

const TeamHeader = ({ name, logo }: TeamHeaderProps) => (
  <div className="relative mt-6 mb-10 text-center flex items-center justify-center gap-4">
    {/* Left decorative line */}
    <div className="w-1/4 h-1 bg-gradient-to-r from-transparent to-purple lg:w-1/3" />

    {/* Logo */}
    <div className="relative">
      <Image
        src={logo}
        alt={`${name} Logo`}
        width={120}
        height={120}
        className="mx-auto"
      />
    </div>

    {/* Right decorative line */}
    <div className="w-1/4 h-1 bg-gradient-to-l from-transparent to-purple lg:w-1/3" />

    {/* Team Name */}
    <h1 className="absolute -bottom-8 text-xl font-semibold lg:text-2xl text-primary">
      {name}
    </h1>
  </div>
);

export default TeamHeader;
