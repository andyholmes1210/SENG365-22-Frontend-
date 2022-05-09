import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, Bars} from "./NavbarElement";
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";


const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img style={{ height: "70px",
                        width: "70px"}} src={require('../../clipart1139281.png')} alt={'Logo'} />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <Link to={"/login"}>
                        <Button variant="contained" endIcon={<LogoutIcon/>}>
                            Logout
                        </Button>
                    </Link>
                </NavBtn>
            </Nav>
        </>
    );
};
export default Navbar