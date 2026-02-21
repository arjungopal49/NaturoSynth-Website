import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: none;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 9999;
  transition: none;
  font-family: "Staatliches", sans-serif;
  pointer-events: none;
  box-sizing: border-box;
  
  @media screen and (max-width: 768px) {
    height: 4rem;
    padding: 0 1rem;
  }
`;

export const NavLogo = styled.img`
  height: 3rem;
  width: auto;
  filter: drop-shadow(0 0 10px rgba(100, 149, 237, 0.6));
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 0 20px rgba(100, 149, 237, 0.9));
    transform: scale(1.05);
  }
  
  @media screen and (max-width: 768px) {
    left: 1rem;
    height: 2.5rem;
  }
`;

export const CircleMenuButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 0 20px rgba(100, 149, 237, 0.6);
  z-index: 10000;
  flex-shrink: 0;
  pointer-events: all;
  
  .line {
    width: ${({ $isOpen }) => ($isOpen ? '20px' : '0')};
    height: 2px;
    background: #000000;
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    position: absolute;
  }
  
  .line1 {
    transform: ${({ $isOpen }) => 
      $isOpen ? 'rotate(45deg)' : 'translateY(-6px)'};
  }
  
  .line2 {
    opacity: ${({ $isOpen }) => ($isOpen ? '0' : '0')};
    transform: ${({ $isOpen }) => 
      $isOpen ? 'scale(0)' : 'translateY(0)'};
  }
  
  .line3 {
    transform: ${({ $isOpen }) => 
      $isOpen ? 'rotate(-45deg)' : 'translateY(6px)'};
  }
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 30px rgba(100, 149, 237, 0.9);
    
    .line {
      width: 20px;
      opacity: 1;
    }
    
    .line1 {
      transition-delay: 0s;
      transform: ${({ $isOpen }) => 
        $isOpen ? 'rotate(45deg)' : 'translateY(-6px)'};
    }
    
    .line2 {
      transition-delay: 0.1s;
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: ${({ $isOpen }) => 
        $isOpen ? 'scale(0)' : 'translateY(0)'};
    }
    
    .line3 {
      transition-delay: 0.2s;
      transform: ${({ $isOpen }) => 
        $isOpen ? 'rotate(-45deg)' : 'translateY(6px)'};
    }
  }
  
  @media screen and (max-width: 768px) {
    width: 35px;
    height: 35px;
    
    .line {
      width: ${({ $isOpen }) => ($isOpen ? '18px' : '0')};
    }
    
    &:hover .line {
      width: 18px;
    }
  }
`;

export const CloseIcon = styled(FaTimes)`
  color: #ffffff;
  font-size: 3rem;
  cursor: pointer;
  filter: drop-shadow(0 0 10px rgba(100, 149, 237, 0.6));
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 0 20px rgba(100, 149, 237, 0.9));
    transform: rotate(90deg) scale(1.1);
  }
  
  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const FullscreenMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 40, 0.95) 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.4s ease, visibility 0.4s ease;
`;

export const MenuCloseButton = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  
  @media screen and (max-width: 768px) {
    top: 1.5rem;
    right: 1.5rem;
  }
`;

export const MenuNavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-family: "Staatliches", sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${({ $isOpen, $delay }) => ($isOpen ? '1' : '0')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(20px)')};
  transition-delay: ${({ $delay }) => $delay}s;
  white-space: nowrap;
  
  &:hover {
    color: #6495ed;
    text-shadow: 0 0 20px rgba(100, 149, 237, 0.8);
    transform: scale(1.1) translateY(0);
  }
  
  &.active {
    color: #6495ed;
    text-shadow: 0 0 15px rgba(100, 149, 237, 0.6);
  }
  
  @media screen and (max-width: 768px) {
    font-size: 1.8rem;
    padding: 0.6rem 1rem;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 90%;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// Remove unused exports
export const Bars = styled(FaBars)`
  display: none;
`;

export const NavLink = styled(Link)`
  display: none;
`;

export const NavMenu = styled.div`
  display: none;
`;
