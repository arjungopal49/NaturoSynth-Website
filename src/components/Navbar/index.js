import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
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
            </Nav>
        </>
    );
};

export default Navbar;
