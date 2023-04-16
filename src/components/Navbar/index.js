import React, {useState} from "react";
import {Nav, NavLink, NavMenu, Bars, Image}
    from "./NavbarElements";
import pic from "../../data/NSLogoWhite.png"

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <>
            <Nav>
                <Image src = {pic}/>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/music" activeStyle>
                        Music
                    </NavLink>
                    <NavLink to="/videos" activeStyle>
                        Videos
                    </NavLink>
                    <NavLink to="/shows" activeStyle>
                        Shows
                    </NavLink>
                    <NavLink to="/merch" activeStyle>
                        Merch
                    </NavLink>
                    <NavLink to="/EPK" activeStyle>
                        EPK
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Contact
                    </NavLink>
                </NavMenu>
                <Bars onClick={handleShowNavbar}/>
            </Nav>
        </>
    );
};

export default Navbar;
