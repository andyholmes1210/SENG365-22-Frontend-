import {Link, useNavigate} from "react-router-dom";
import CSS from "csstype";
import {
    Alert,
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Paper, Stack,
    TextField
} from "@mui/material";
import React from "react";
import axios from "axios";
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Navbar from "./Navbar/NavbarDefault";

const Login = () => {

    interface State {
        password: string;
        showPassword: boolean;
    }

    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword({ ...password, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setPassword({
            ...password,
            showPassword: !password.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const updateEmailState = (event: any) => {
        setEmail(event.target.value);
    };

    const loginUser = () => {
        if (email === "" || password.password === "") {
            setErrorMessage("Please enter all the fields!");
            setErrorFlag(true);
        } else {
            axios.post('http://localhost:4941/api/v1/users/login', {
                "email": email,
                "password": password.password
            })
                .then((response) => {
                    localStorage.setItem("auth_token", response.data.token);
                    localStorage.setItem("userId", response.data.userId);
                    navigate("/");
                }, (error) => {
                    setErrorMessage(error.response.statusText);
                    setErrorFlag(true);
                })
        }
    };

    const login_rows = () => {
        return (
            <Paper elevation={10} style={cardDiv}>
                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" inputProps={{maxLength:128}} label="Email" value={email} variant="standard" onChange={updateEmailState}/>
                </div>
                <div style={textBox}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input fullWidth
                               id="standard-adornment-password"
                               inputProps={{maxLength:256}}
                               type={password.showPassword ? 'text' : 'password'}
                               value={password.password}
                               onChange={handleChange('password')}
                               endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {password.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div style={text}>
                    Don't have an Account? <Link to="/register">Sign up</Link>
                </div>
                <div>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" endIcon={<LoginIcon/>} onClick={() => loginUser()}>
                            Login
                        </Button>
                    </Stack>
                </div>
            </Paper>
        )
    };

    const text: CSS.Properties = {
        padding: "10px",
        marginTop: "18px",
        fontSize: "15px"
    };

    const textBox: CSS.Properties = {
        width: "58%",
        margin: "auto",
        textAlign: 'left',
        marginTop: "18px",
    };

    const cardMain: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        marginTop: "10%",
        width: "30%",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    };

    const cardDiv: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        textAlign: "center",
        width: "80%",
        backgroundColor: '#827397',
        marginBottom: "20px",
        borderRadius: "15px"
    };

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
                        textDecorationLine: 'underline'}}>Login</h1>
                    <div style={{display:"inline-block",
                        width: "100%",
                        marginBottom: "10px"}}>
                        {errorFlag?
                            <Alert severity="error" variant="filled">
                                {errorMessage}
                            </Alert>
                            :""}
                    </div>
                    <div>
                        {login_rows()}
                    </div>
                </Paper>
            </div>
        </div>
    )
}
export default Login;