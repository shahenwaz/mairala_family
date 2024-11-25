import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons from lucide-react
import { ModeToggle } from "@/components/ui/mode-toggle"; // Import ModeToggle component

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
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
          <span className="text-xl font-bold text-primary">Mairala Family</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {["Home", "Tournaments", "News", "Family"].map((page) => (
            <Link
              key={page}
              href={`/${page.toLowerCase()}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {page}
            </Link>
          ))}

          {/* Mode Toggle Button */}
          <div className="ml-6">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col items-center py-4 space-y-2">
            {["Home", "Tournaments", "News", "Family"].map((page) => (
              <Link
                key={page}
                href={`/${page.toLowerCase()}`}
                className="text-foreground hover:text-primary block transition-colors"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              >
                {page}
              </Link>
            ))}

            {/* Mode Toggle for Mobile */}
            <div className="pt-4">
              <ModeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
