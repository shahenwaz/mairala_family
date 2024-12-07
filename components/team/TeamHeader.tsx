import Image from "next/image";

interface TeamHeaderProps {
  name: string;
  logo: string;
}

const TeamHeader = ({ name, logo }: TeamHeaderProps) => (
  <div className="text-center my-6">
    <Image
      src={logo}
      alt={`${name} Logo`}
      width={120}
      height={120}
      className="mx-auto"
    />
    <h1 className="text-3xl font-bold text-primary mt-4">{name}</h1>
  </div>
);

export default TeamHeader;
