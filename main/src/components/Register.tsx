import {Link, useNavigate} from "react-router-dom";
import CSS from "csstype";
import {
    Alert,
    AlertTitle,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    TextField
} from "@mui/material";
import {RegisterBtnLink, RegisterBtn} from "./ButtonElement";
import React from "react";
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Navbar from "./Navbar/NavbarDefault";
import axios from "axios";

const Register = () => {

    interface State {
        password: string;
        showPassword: boolean;
    }

    const navigate = useNavigate()

    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [firstname, setFirstName] = React.useState("")
    const [lastname, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
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
        setEmail(event.target.value)
    }

    const updateFirstNameState = (event: any) => {
        setFirstName(event.target.value)
    }

    const updateLastNameState = (event: any) => {
        setLastName(event.target.value)
    }

    const registerUser = () => {
        if (firstname === "" || lastname === "") {
            alert("Please enter all the fields")
        } else {
            axios.post('http://localhost:4941/api/v1/users/register', {
                "firstName": firstname,
                "lastName": lastname,
                "email": email,
                "password": password.password
            })
                .then(async () => {
                    await  axios.post('http://localhost:4941/api/v1/users/login', {
                        "email": email,
                        "password": password.password
                    })
                        .then((response) => {
                            localStorage.setItem("auth_token", response.data.token)
                            localStorage.setItem("logged_id", response.data.user_id)
                            navigate("/")
                        }, (error) => {
                            setErrorFlag(true)
                            setErrorMessage(error.toString())
                        })
                })
        }
    }

    const register_rows = () => {
        return (
            <Paper elevation={10} style={cardDiv}>
                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" label="First Name" value={firstname} variant="standard" onChange={updateFirstNameState}/>
                </div>
                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" label="Last Name" value={lastname} variant="standard" onChange={updateLastNameState}/>
                </div>
                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" label="Email address" value={email} variant="standard" onChange={updateEmailState}/>
                </div>
                <div style={textBox}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input fullWidth
                               id="standard-adornment-password"
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
                    Already have an Account? <Link to="/login">Sign In</Link>
                </div>
                <div>
                    <RegisterBtn>
                        <RegisterBtnLink to="/">Register</RegisterBtnLink>
                    </RegisterBtn>
                </div>
            </Paper>
        )
    }

    const text: CSS.Properties = {
        padding: "10px",
        marginTop: "18px",
        fontSize: "15px"
    }

    const textBox: CSS.Properties = {
        width: "58%",
        margin: "auto",
        textAlign: 'left',
        marginTop: "15px",
        marginBottom: "15px"
    }

    const cardMain: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        marginTop: "10%",
        width: "30%",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    }

    const cardDiv: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        textAlign: "center",
        width: "80%",
        backgroundColor: '#827397',
        marginBottom: "20px",
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
                        textDecorationLine: 'underline'}}>Register</h1>
                    <div style={{display:"inline-block",
                        width: "100%"}}>
                        {errorFlag?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errorMessage}
                            </Alert>
                            :""}
                        {register_rows()}
                    </div>
                </Paper>
            </div>
        </div>
    )
}
export default Register;