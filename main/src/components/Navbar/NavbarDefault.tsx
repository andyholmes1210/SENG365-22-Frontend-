import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, Bars, NavBtnLink} from "./NavbarElement";

import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useNavigate} from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate()

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
                        <NavBtnLink to='/login'>Login</NavBtnLink>
                        {/*<Button variant="contained" endIcon={<LogoutIcon/>}>*/}
                        {/*    Logout*/}
                        {/*</Button>*/}
                </NavBtn>
            </Nav>
        </>
    );
};
export default Navbar