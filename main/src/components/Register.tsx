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
import AssignmentIcon from '@mui/icons-material/Assignment';
import React from "react";
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Navbar from "./Navbar/NavbarDefault";
import axios from "axios";

const Register = () => {

    interface State {
        password: string;
        showPassword: boolean;
    };

    const navigate = useNavigate();

    const [file, setFile] = React.useState("");
    const [filetype, setFileType] = React.useState("");
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [photoFlag, setPhotoFlag] = React.useState(false);
    const [photoMessage, setPhotoMessage] = React.useState("");
    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailerror, setEmailError] = React.useState(false);
    const [emailhelpertext, setEmailHelperText] = React.useState("");


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

    React.useEffect(() => {

    },[])


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const updateEmailState = (event: any) => {
        if (event.target.value.match("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+")) {
            setEmailError(false);
            setEmailHelperText("");
            setEmail(event.target.value);
        } else {
            setEmailError(true);
            setEmailHelperText("Please enter a valid email");
        }
    };

    const updateFirstNameState = (event: any) => {
        setFirstName(event.target.value);
    };

    const updateLastNameState = (event: any) => {
        setLastName(event.target.value);
    };

    const updateImageState = (event: any) => {
        setFile(event.target.files[0]);
        if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/gif" && event.target.files[0].type !== "image/png") {
            setPhotoFlag(true);
            setPhotoMessage("Image must be jpg/gif/png");
        } else {
            setPhotoFlag(false)
            setPhotoMessage("");
            setFileType(event.target.files[0].type);
        }
    };

    const uploadProfilePic = () => {
        axios.put('http://localhost:4941/api/v1/users/' + localStorage.getItem('userId') + '/image', file, {
            headers:
                {'X-Authorization': localStorage.getItem("auth_token")!,
                    'Content-Type': filetype}
        })
            .then(()=>{
            }, () => {
                setErrorFlag(true);
                setErrorMessage("Image must be jpg/gif/png");
            })
    };

    const registerUser = () => {
        if (firstname === "" || lastname === "" || email === "" || password.password === "") {
            setErrorMessage("Please enter all the fields!");
            setErrorFlag(true);
        } else if (password.password.length < 6) {
            setErrorMessage("Password much be at least 6 characters in length!");
            setErrorFlag(true);
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
                            localStorage.setItem("auth_token", response.data.token);
                            localStorage.setItem("userId", response.data.userId);
                            navigate("/");
                            if (file !== '') {
                                uploadProfilePic();
                            };
                        }, (error) => {
                            setErrorFlag(true);
                            setErrorMessage(error.toString());
                        })
                })
                .catch((error) => {
                    setErrorMessage("Email already in used, please try again");
                    setErrorFlag(true);
                })
        }
    };

    const register_rows = () => {
        return (
            <Paper elevation={10} style={cardDiv}>
                <div style={textBox}>
                    <h5>Select a profile picture (optional):</h5>
                    <input style={imageBox} type="file" onChange={updateImageState} accept="image/png, image/jpeg, image/gif" name="myfile"/>
                </div>

                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" inputProps={{maxLength:64}} label="First Name" value={firstname} variant="standard" onChange={updateFirstNameState}/>
                </div>
                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" inputProps={{maxLength:64}} label="Last Name" value={lastname} variant="standard" onChange={updateLastNameState}/>
                </div>
                <div style={textBox}>
                    <TextField fullWidth id="standard-basic" inputProps={{maxLength:128}} label="Email address" helperText={emailhelpertext} error={emailerror} variant="standard" onChange={updateEmailState}/>
                </div>
                <div style={textBox}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input fullWidth
                               id="standard-adornment-password"
                               type={password.showPassword ? 'text' : 'password'}
                               value={password.password}
                               onChange={handleChange('password')}
                               inputProps={{maxLength:256}}
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
                    <Stack direction="row" spacing={2} justifyContent="center">
                        { photoFlag === true?
                            <Button variant="contained" endIcon={<AssignmentIcon/>} disabled>
                                Sign Up
                            </Button>:
                            <Button variant="contained" endIcon={<AssignmentIcon/>} onClick={() => registerUser()}>
                                Sign Up
                            </Button>
                        }
                    </Stack>
                </div>
            </Paper>
        )
    }

    const text: CSS.Properties = {
        padding: "10px",
        marginTop: "18px",
        fontSize: "15px"
    };

    const imageBox: CSS.Properties = {
        width: "100%",
        margin: "auto",
        textAlign: 'left',
        marginTop: "15px",
        marginBottom: "15px"
    };

    const textBox: CSS.Properties = {
        width: "58%",
        margin: "auto",
        textAlign: 'left',
        marginTop: "15px",
        marginBottom: "15px"
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
                        textDecorationLine: 'underline'}}>Register</h1>
                    <div style={{display:"inline-block",
                        width: "100%",
                        marginBottom: "10px"}}>
                        {errorFlag?
                            <Alert severity="error" variant="filled" >
                                <strong>{errorMessage}</strong>
                            </Alert>
                            :""}
                        {photoFlag?
                            <Alert severity="error" variant="filled" >
                                {photoMessage}
                            </Alert>
                            :""}
                    </div>
                    <div>
                        {register_rows()}
                    </div>
                </Paper>
            </div>
        </div>
    )
}
export default Register;