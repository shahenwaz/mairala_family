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
    <div className="flex mx-auto flex-col items-center bg-card rounded-md p-6 max-w-xs w-full card-hover">
      <div className="w-32 h-32 overflow-hidden rounded-full mb-4">
        <Image
          src={image}
          alt={`${name}'s photo`}
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="flex flex-col">
        <h3 className="text-xs font-semibold text-lightGray">{nickname}</h3>
      </div>
      <p className="text-sm text-purple mt-3 mb-5">{role}</p>
      <div className="flex space-x-4">
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
  );
};

export default FamilyCard;
