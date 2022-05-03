import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars} from "./NavbarElement";


const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img style={{ height: "70px",
                        width: "70px"}} src={require('../../telegram-logo-947.png')} alt={'Logo'} />
                </NavLink>
                <Bars />
                <NavLink to="/">
                    Home
                </NavLink>
                <NavMenu>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                       Login
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};
export default Navbar