"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For detecting active page
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current active route

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const pages = [
    { name: "HOME", href: "/" },
    { name: "TOURNAMENTS", href: "/tournaments" },
    { name: "NEWS", href: "/news" },
    { name: "FAMILY", href: "/family" },
  ];

  return (
    <header className="bg-card shadow-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/MF_LOGO.png"
            alt="Mairala Family Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-extrabold text-primary hover:text-primary transition-colors">
            Mairala Family
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                pathname === page.href
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-muted"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-card border-t border-border ${
          isMobileMenuOpen ? "block animate-fadeIn" : "hidden"
        }`}
      >
        <nav className="flex flex-col items-center py-4 space-y-2">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                pathname === page.href
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground hover:text-primary hover:bg-muted"
              }`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
