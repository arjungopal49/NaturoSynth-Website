import React, {useEffect, useRef, useState} from "react";
import {Nav, NavLink, NavMenu, Bars, Image}
    from "./NavbarElements";
import pic from "../../data/NSLogoWhite.png"

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleShowNavbar = (bool) => {
        setShowNavbar(bool)
    }

    return (
        <>
            <Nav>
                <a href="/"><Image src = {pic} /></a>
                {(showNavbar || windowSize[0] > 768) &&
                    <NavMenu>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/" activeStyle>
                            Home
                        </NavLink>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/music" activeStyle>
                            Music
                        </NavLink>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/videos" activeStyle>
                            Videos
                        </NavLink>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/shows" activeStyle>
                            Shows
                        </NavLink>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/merch" activeStyle>
                            Merch
                        </NavLink>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/EPK" activeStyle>
                            EPK
                        </NavLink>
                        <NavLink onClick={() => handleShowNavbar(false)} to="/contact" activeStyle>
                            Contact
                        </NavLink>
                    </NavMenu>
                }
                <Bars onClick={() => handleShowNavbar(!showNavbar)}/>
            </Nav>
        </>
    );
};

export default Navbar;
