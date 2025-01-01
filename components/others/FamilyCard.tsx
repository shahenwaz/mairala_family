import React from "react";
import { FaDiscord, FaInstagram, FaFacebookF } from "react-icons/fa";
import Image from "next/image";

export type FamilyCardProps = {
  name: string;
  nickname: string;
  role: string;
  social?: {
    facebook?: string;
    instagram?: string;
    discord?: string;
  };
  image: string;
};

const FamilyCard: React.FC<FamilyCardProps> = ({
  name,
  nickname,
  role,
  social,
  image,
}) => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-xs mx-auto overflow-hidden border-2 rounded-md bg-card border-card card-hover">
      {/* Card Top Background */}
      <div className="relative w-full h-20">
        <Image
          src="/images/FAMILY/FamilyCover.webp"
          alt="Card top background"
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
          unoptimized
        />
      </div>

      {/* Avatar Section */}
      <div className="relative w-24 h-24 -mt-10 overflow-hidden border-2 rounded-full shadow-md border-card bg-card">
        <Image
          src={image}
          alt={`${name}'s photo`}
          width={96}
          height={96}
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col items-center px-6 py-4">
        <h2 className="text-base font-semibold">{name}</h2>
        <h3 className="text-xs font-semibold text-lightGray">{nickname}</h3>
        <p className="mt-2 text-sm font-semibold text-purple">{role}</p>

        {/* Social Icons */}
        <div className="flex mt-3 space-x-4">
          {social?.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple"
            >
              <FaInstagram size={20} />
            </a>
          )}
          {social?.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple"
            >
              <FaFacebookF size={20} />
            </a>
          )}
          {social?.discord && (
            <a
              href={social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-purple"
            >
              <FaDiscord size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
