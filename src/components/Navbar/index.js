import React, { useEffect, useState } from "react";
import {
  Nav,
  FullscreenMenu,
  MenuNavLink,
  MenuContainer,
  CircleMenuButton,
  NavLogo
} from "./NavbarElements";

const logo = require('../../data/Pictures/Icons/NSLogoWhite.png');

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { to: "/", label: "Home" },
    { to: "/music", label: "Music" },
    { to: "/videos", label: "Videos" },
    { to: "/shows", label: "Shows" },
    { to: "/merch", label: "Merch" },
    { to: "/EPK", label: "EPK" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      <Nav $isScrolled={isScrolled}>
        <NavLogo src={logo} alt="NaturoSynth" />
        <CircleMenuButton onClick={toggleMenu} $isOpen={isMenuOpen}>
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </CircleMenuButton>
      </Nav>

      <FullscreenMenu $isOpen={isMenuOpen}>
        <MenuContainer>
          {menuLinks.map((link, index) => (
            <MenuNavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              $isOpen={isMenuOpen}
              $delay={0.1 + index * 0.1}
            >
              {link.label}
            </MenuNavLink>
          ))}
        </MenuContainer>
      </FullscreenMenu>
    </>
  );
};

export default Navbar;
