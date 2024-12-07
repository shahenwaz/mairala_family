import Image from "next/image";

interface TeamHeaderProps {
  name: string;
  logo: string;
}

const TeamHeader = ({ name, logo }: TeamHeaderProps) => (
  <div className="my-6 text-center">
    <Image
      src={logo}
      alt={`${name} Logo`}
      width={120}
      height={120}
      className="mx-auto"
    />
    <h1 className="mt-4 text-xl font-semibold lg:text-2xl text-primary">
      {name}
    </h1>
  </div>
);

export default TeamHeader;
