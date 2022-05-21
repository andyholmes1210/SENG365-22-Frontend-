import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, Bars, NavBtnLink} from "./NavbarElement";

import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const Navbar = () => {

    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const logoutUser = () => {
        axios.post('http://localhost:4941/api/v1/users/logout', {}, {headers: {'X-Authorization' : localStorage.getItem("auth_token")!}})
            .then(() => {
                localStorage.clear();
                navigate("/login");
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

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
                    <NavLink to="/myauction">
                        My Auction
                    </NavLink>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    { localStorage.length === 0 ?
                        <NavBtnLink to='/login'>Login</NavBtnLink>:
                        <Button variant="contained" color="error" endIcon={<LogoutIcon/>} onClick={() => logoutUser()}>Logout</Button>
                    }
                </NavBtn>
            </Nav>
        </>
    );
};
export default Navbar