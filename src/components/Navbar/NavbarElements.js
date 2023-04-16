import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Image = styled.img`
  height: 6rem;
  width: 10rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Nav = styled.nav`
  background: #000000;
  height: 10rem;
  justify-content: center;
  text-align: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  //margin-left: calc(50% - 50vw);
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    height: 6rem;
  }
`;

export const NavLink = styled(Link)`
  color: #ece5e5;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-family: "Arial Black", monospace;
  font-size: 1.2rem;

  &.active {
    color: #4dffd0;
  }

  &:hover {
    color: #c1cbcb;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
    //display: inline-grid;
    position: absolute;
    right: 0;
    top: 6rem;
    background-color: #000000;
    width: 10rem;
    height: calc(100vh - 60px);
    transition: all 0.3s ease-in;
    overflow: hidden;
  }
`;
