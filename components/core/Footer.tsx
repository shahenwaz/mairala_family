"use client";
import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";
import { LuCircleChevronUp } from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-foreground">
      <div className="container px-4 py-5 mx-auto">
        {/* Copyright Info */}
        <div className="text-center mb-4">
          <p className="text-sm">
            &copy; {currentYear} By{" "}
            <a
              href="https://shahenwazmuzahid.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Shahenwaz Muzahid
            </a>
            . All Rights Reserved.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-3 mb-4">
          {[
            {
              href: "https://www.facebook.com/profile.php?id=61554009010915",
              icon: <FaFacebookF />,
            },
            {
              href: "https://discord.gg/mairala",
              icon: <FaDiscord />,
            },
            {
              href: "https://www.youtube.com/@mairalagamingcommunity",
              icon: <FaYoutube />,
            },
            {
              href: "https://www.instagram.com/_mcod_mairala/",
              icon: <FaInstagram />,
            },
          ].map(({ href, icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-purple justify-center w-12 h-12 rounded-md bg-background shadow-lg transition-transform transform hover:scale-105"
            >
              {React.cloneElement(icon, {
                size: 20,
                className: "text-white hover:text-purple",
              })}
            </a>
          ))}
        </div>

        {/* Scroll-to-Top Button */}
        <div className="flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white hover:bg-purple shadow-lg transition-transform transform hover:scale-105"
          >
            <LuCircleChevronUp size={25} className="text-black" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
