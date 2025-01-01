import React from "react";
import FamilyCard, { FamilyCardProps } from "@/components/others/FamilyCard";

const familyMembers: FamilyCardProps[] = [
  {
    name: "Rifat Shahriar Sanjveer",
    nickname: "@MEMBOxBRAND",
    role: "Chancellor",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      discord: "https://discord.com",
    },
    image: "/images/male.png",
  },
  {
    name: "Shahriyar Nasir Bishal",
    nickname: "@! Bishal",
    role: "Vice Chancellor",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      discord: "https://discord.com",
    },
    image: "/images/male.png",
  },
  {
    name: "Adiba Binte Azad",
    nickname: "@! TWINKLE",
    role: "Director",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      discord: "https://discord.com",
    },
    image: "/images/female.png",
  },
  {
    name: "Shahenwaz Muzahid",
    nickname: "@! Cupid",
    role: "Operation Manager",
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      discord: "https://discord.com",
    },
    image: "/images/male.png",
  },
];

const FamilyPage = () => {
  return (
    <div className="container px-4 py-10 mx-auto space-y-8">
      <div>
        <h2 className="mb-2 text-sm font-bold text-center text-muted-foreground">
          MEET LOVELY PEOPLE
        </h2>
        <h1 className="text-2xl font-extrabold text-center sm:text-3xl md:text-4xl text-foreground">
          OUR FAMILY MEMBERS
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-6 md:px-16">
        {familyMembers.map((member, index) => (
          <FamilyCard key={index} {...member} />
        ))}
      </div>

      <div className="text-sm text-center text-muted-foreground mt-8">
        <p>
          <a
            href="https://www.freepik.com/free-vector/smiling-redhaired-boy-illustration_395229298.htm#fromView=keyword&page=1&position=2&uuid=8f42d2a1-0dbf-47c9-8c7b-18fed356bc55&new_detail=true"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            Male avatar by brgfx on Freepik
          </a>
        </p>
        <p>
          <a
            href="https://www.freepik.com/free-vector/woman-with-long-dark-hair_395229319.htm#fromView=search&page=1&position=44&uuid=c02cb759-a394-4e92-98f2-210975e8fd57&new_detail=true"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            Female avatar by brgfx on Freepik
          </a>
        </p>
      </div>
    </div>
  );
};

export default FamilyPage;
