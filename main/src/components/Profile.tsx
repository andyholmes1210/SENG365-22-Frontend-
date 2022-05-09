import {Link, useNavigate} from "react-router-dom";
import CSS from "csstype";
import {
    Alert,
    AlertTitle, Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Paper, Stack,
    TextField
} from "@mui/material";
import {LoginBtnLink, LoginBtn} from "./ButtonElement";
import React from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Navbar from "./Navbar/NavbarDefault";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {

    // interface State {
    //     password: string;
    //     showPassword: boolean;
    // }
    //

    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    // const [email, setEmail] = React.useState("")
    // const [password, setPassword] = React.useState<State>({
    //     password: '',
    //     showPassword: false,
    // });
    //
    // const handleChange =
    //     (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setPassword({ ...password, [prop]: event.target.value });
    //     };
    //
    // const handleClickShowPassword = () => {
    //     setPassword({
    //         ...password,
    //         showPassword: !password.showPassword,
    //     });
    // };
    //
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    //
    // const updateEmailState = (event: any) => {
    //     setEmail(event.target.value)
    // }


    const profile_rows = () => {
        return (
            <Paper elevation={10} style={cardDiv}>
                <div style={HeadingText}>
                    Picture section
                </div>
                <div style={HeadingText}>
                    Firstname:
                    <h4>
                        Test
                    </h4>
                </div>
                <div style={HeadingText}>
                    Lastname:
                    <h4>
                        Test
                    </h4>
                </div>
                <div style={HeadingText}>
                    Email:
                    <h4>
                        Test
                    </h4>
                </div>
            </Paper>
        )
    }

    const text: CSS.Properties = {
        padding: "10px",
        marginTop: "18px",
        fontSize: "15px"
    }

    const HeadingText: CSS.Properties = {
        width: "58%",
        margin: "auto",
        textAlign: 'left',
        marginTop: "24px",
        fontWeight: 'bold'
    }

    const cardMain: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        marginTop: "5%",
        width: "40%",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    }

    const cardDiv: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        textAlign: "center",
        width: "90%",
        backgroundColor: '#827397',
        marginBottom: "20px",
        borderRadius: "15px"
    }
    const cardBidder: CSS.Properties = {
        display: "inline-block",
        padding: "5px",
        margin: "auto 6%",
        marginTop: "50px",
        width: "700px",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    }

    const cardSeller: CSS.Properties = {
        display: "inline-block",
        padding: "5px",
        margin: "auto 6%",
        marginTop: "50px",
        width: "700px",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    }

    return (
        <div>
            <Navbar/>
            <div>
                <Paper elevation={24} style={cardMain}>
                    <h1 style={{fontSize: "50px",
                        textAlign: "center",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: '#fff',
                        textShadow: "3px 3px #5C527F",
                        textDecorationLine: 'underline'}}>Profile Details</h1>
                    <div style={{display:"inline-block",
                        width: "100%"}}>
                        {errorFlag?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errorMessage}
                            </Alert>
                            :""}
                        {profile_rows()}
                    </div>
                    <div style={{display:"inline-block",
                        marginBottom: "10px",
                        padding: "5px"}}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                            <Button variant="contained" color="secondary" endIcon={<EditIcon/>}>
                                Edit
                            </Button>
                        </Stack>
                    </div>
                </Paper>
                <Paper elevation={24} style={cardBidder}>
                    <h1> Auction that user Bid on section </h1>
                </Paper>
                <Paper elevation={24} style={cardSeller}>
                    <h1> Auction that user Selling section </h1>
                </Paper>
            </div>
        </div>
    )
}
export default Profile;