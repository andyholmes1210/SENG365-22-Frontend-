import CSS from "csstype";
import {
    Alert,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Paper, Snackbar, Stack,
    TextField
} from "@mui/material";
import React from "react";
import axios from "axios";
import Navbar from "./Navbar/NavbarDefault";
import EditIcon from "@mui/icons-material/Edit";
import {NavBottom} from "./Navbar/NavbarElement";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Visibility, VisibilityOff} from "@mui/icons-material";

const Profile = () => {

    interface State {
        password: string;
        showPassword: boolean;
    }

    const [file, setFile] = React.useState("");
    const [filetype, setFileType] = React.useState("");
    const [userImage, setUserImage] = React.useState(null);

    const [loginFlag, setLoginFlag] = React.useState(false);
    const [loginMessage, setLoginMessage] = React.useState("");

    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [editFlag, setEditFlag] = React.useState(false);
    const [editMessage, setEditMessage] = React.useState("");
    const [userDetails, setUserDetails] = React.useState<Array<any>>([]);

    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [newfirstname, setNewFirstname] = React.useState("");
    const [firstnameerror, setFirstNameError] = React.useState(false);
    const [firstnamehelpertext, setFirstNameHelperText] = React.useState("");

    const [newlastname, setNewLastName] = React.useState("");
    const [lastnameerror, setLastNameError] = React.useState(false);
    const [lastnamehelpertext, setLastNameHelperText] = React.useState("");

    const [newemail, setNewEmail] = React.useState("");
    const [emailerror, setEmailError] = React.useState(false);
    const [emailhelpertext, setEmailHelperText] = React.useState("");

    const [snackOpen, setSnackOpen] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState("");
    const handleSnackClose = (event?: React.SyntheticEvent | Event,
                              reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const [dialogAuction, setDialogAuction] = React.useState<any>({
        image_filename: ""
    });
    const handleDeleteDialogOpen = (auction: any) => {
        setDialogAuction(auction);
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDialogAuction({
            image_filename: ""
        })
        setOpenDeleteDialog(false);
    };

    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
    const [editUser, setEditUser] = React.useState<any>({email:"",
                                                                    firstName:"",
                                                                    lastName:""});
    const [dialogUser, setDialogUser] = React.useState<any>({email:"",
                                                                        firstName:"",
                                                                        lastName:""});
    const handleEditDialogOpen = (user: any) => {
        setDialogUser(user);
        setOpenUpdateDialog(true);
    };

    const handleEditDialogClose = () => {
        setEditUser({email:"",
                            firstName:"",
                            lastName:""})
        setOpenUpdateDialog(false);
    };

    const [password, setPassword] = React.useState<State>({
        password: '',
        showPassword: false,
    });
    const handleChangePassword =
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

    const [newpassword, setNewPassword] = React.useState<State>({
        password: '',
        showPassword: false,
    });
    const handleChangeNewPassword =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewPassword({ ...newpassword, [prop]: event.target.value });
        };
    const handleClickShowNewPassword = () => {
        setNewPassword({
            ...newpassword,
            showPassword: !newpassword.showPassword,
        });
    };
    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    React.useEffect(() => {
        getUser();
        getUserImage();
    },[]);

    const updateUser = () => {
         if(newpassword.password !== ""){
            if(newpassword.password.length < 6) {
                setEditFlag(true);
                setEditMessage("New Password much be at least 6 characters in length!");
            } else {
                axios.patch('http://localhost:4941/api/v1/users/' + localStorage.getItem("userId"), {
                    "password": newpassword.password,
                    "currentPassword": password.password
                }, {headers:
                        {'X-Authorization': localStorage.getItem("auth_token")!}})
                    .then((response) => {
                        handleEditDialogClose();
                        setSnackMessage("Edit Profile successfully");
                        setSnackOpen(true);
                        getUser();
                        if (file !== '') {
                            uploadProfilePic();
                        }
                    }, (error) => {
                        setEditFlag(true);
                        setEditMessage(error.response.statusText);
                    })
            }
        } else{
            axios.patch('http://localhost:4941/api/v1/users/' + localStorage.getItem("userId"), {
                "firstName": newfirstname,
                "lastName": newlastname,
                "email": newemail,
            }, {headers:
                    {'X-Authorization': localStorage.getItem("auth_token")!}})
                .then((response) => {
                    handleEditDialogClose();
                    setSnackMessage("Edit Profile successfully");
                    setSnackOpen(true);
                    getUser();
                    if (file !== '') {
                        uploadProfilePic();
                    }
                }, (error) => {
                    setEditFlag(true);
                    setEditMessage(error.response.statusText);
                })
        }
    };

    const getUserImage = () => {
        axios.get('http://localhost:4941/api/v1/users/' + localStorage.getItem('userId') + '/image')
            .then((response) => {
                setUserImage(response.data);
            },() => {
                setUserImage(null);
            })
    };

    const deleteImage = () => {
        axios.delete('http://localhost:4941/api/v1/users/' + localStorage.getItem('userId') + '/image', {
            headers:
                {'X-Authorization': localStorage.getItem("auth_token")!}})
            .then(()=> {
                handleDeleteDialogClose();
                getUser();
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
        window.location.href = window.location.href;
        setSnackMessage("Delete Profile picture successfully");
        setSnackOpen(true);
    };

    const updateImageState = (event: any) => {
        setFile(event.target.files[0]);
        setFileType(event.target.files[0].type);
    };

    const uploadProfilePic = () => {
        axios.put('http://localhost:4941/api/v1/users/' + localStorage.getItem('userId') + '/image', file, {
            headers:
                {'X-Authorization': localStorage.getItem("auth_token")!,
                'Content-Type': filetype}
        })
            .then(()=>{
                handleEditDialogClose();
            }, () => {
                setErrorFlag(true);
                setErrorMessage("Image must be jpg/gif/png");
            })
        window.location.href = window.location.href;
        setSnackMessage("Edit Profile successfully");
        setSnackOpen(true);
    };

    const getUser = () => {
        if(localStorage.getItem('userId') === null) {
            setLoginFlag(true);
            setLoginMessage("Please login to view your profile!");
        } else {
            axios.get('http://localhost:4941/api/v1/users/' + localStorage.getItem('userId'), {headers:
                    {'X-Authorization': localStorage.getItem("auth_token")!}})
                .then((response)=> {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setUserDetails(response.data);
                    updateFirstNameState(response.data.firstName);
                    updateLastNameState(response.data.lastName);
                    updateEmailState(response.data.email);
                    setNewLastName(response.data.lastName);
                    setNewFirstname(response.data.firstName);
                    setNewEmail(response.data.email);
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                })
        }
    };


    const updateFirstNameState = (x: any) => {
        setFirstname(x);
    };
    const updateLastNameState = (x: any) => {
        setLastName(x);
    };
    const updateEmailState = (x: any) => {
        setEmail(x);
    };

    const updateNewFirstNameState = (event: any) => {
        if(event.target.value.length > 0) {
            setFirstNameError(false);
            setFirstNameHelperText("");
            setNewFirstname(event.target.value);
        } else {
            setFirstNameError(true);
            setFirstNameHelperText("Please enter First name");
        }
    };

    const updateNewLastNameState = (event: any) => {
        if(event.target.value.length > 0) {
            setLastNameError(false);
            setLastNameHelperText("");
            setNewLastName(event.target.value)
        } else {
            setLastNameError(true);
            setLastNameHelperText("Please enter First name");
        }
    };

    const updateNewEmailState = (event: any) => {
        if (event.target.value.match("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+")) {
            setEmailError(false);
            setEmailHelperText("");
            setNewEmail(event.target.value);
        } else {
            setEmailError(true);
            setEmailHelperText("Please enter a valid email");
        }
    };

    const getImageDefault = (event: any) => {
        event.target.src = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
    };

    const profile_rows = () => {
        return (
            <Paper elevation={10} style={cardDiv}>
                <div>
                    {localStorage.getItem("userId") === null?
                        <img style={{
                            height: "50%", width: "50%"}} src={"https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"}
                             onError={getImageDefault} alt=""/>:
                        <img style={{
                            height: "50%", width: "50%"}} src={'http://localhost:4941/api/v1/users/' + localStorage.getItem('userId') + '/image'}
                             onError={getImageDefault} alt=""/>
                    }
                </div>
                <div style={{marginTop:"10px"}}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        { userImage === null || localStorage.length === 0?
                            <Button variant="contained" color="error" endIcon={<DeleteIcon/>} disabled>
                                Delete
                            </Button>:
                            <Button variant="contained" color="error" endIcon={<DeleteIcon/>} onClick={() => {handleDeleteDialogOpen(file)}}>
                                Delete
                            </Button>
                        }
                        <Dialog
                            open={openDeleteDialog}
                            onClose={handleDeleteDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"Delete This Image?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this Image?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                                <Button variant="outlined" color="error" onClick={() => {deleteImage()}} autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar
                            autoHideDuration={6000}
                            open={snackOpen}
                            onClose={handleSnackClose}
                            key={snackMessage}
                        >
                            <Alert onClose={handleSnackClose} severity="success" sx={{
                                width: '100%' }}>
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                    </Stack>
                </div>
                {localStorage.length !== 0 ?
                    <div>
                        <div style={HeadingText}>
                            Firstname:
                            <h4 style={text}>
                                {firstname}
                            </h4>
                        </div>
                        <div style={HeadingText}>
                            Lastname:
                            <h4 style={text}>
                                {lastname}
                            </h4>
                        </div>
                        <div style={HeadingText}>
                            Email:
                            <h4 style={text}>
                                {email}
                            </h4>
                        </div>
                    </div>:""
                }
            </Paper>
        )
    };

    const text: CSS.Properties = {
        fontSize: "24px",
        color: '#fff'
    };

    const HeadingText: CSS.Properties = {
        width: "58%",
        margin: "auto",
        textAlign: 'left',
        marginTop: "24px",
        fontWeight: 'bold',
        color: '#fff'
    };

    const cardMain: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        marginTop: "5%",
        marginBottom: "5%",
        width: "40%",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    };

    const cardDiv: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        textAlign: "center",
        width: "90%",
        backgroundColor: '#827397',
        marginBottom: "20px",
        borderRadius: "15px"
    };

    const buttonStyle: CSS.Properties = {
        display:"inline-block",
        width: "50%",
        margin: "left",
        padding:"5px",
    };

    const textBox: CSS.Properties = {
        width: "45%",
        margin: "auto",
        textAlign: 'left',
        padding: "5px 5px"
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
                        textDecorationLine: 'underline'}}>Profile Details</h1>
                    <div style={{display:"inline-block",
                        width: "100%",
                        marginBottom: "10px"}}>
                        {loginFlag?
                            <Alert severity="info" variant="filled">
                                {loginMessage}
                            </Alert>
                            :""}
                        {errorFlag?
                            <Alert severity="error" variant="filled">
                                {errorMessage}
                            </Alert>
                            :""}
                    </div>
                    {profile_rows()}
                    {localStorage.length !== 0 ?
                        <div>
                            <div style={buttonStyle}>
                                <Stack direction="row" spacing={3} justifyContent="center">
                                    <Button variant="contained" color="secondary" endIcon={<EditIcon/>} onClick={() => {handleEditDialogOpen(userDetails)}}>
                                        Edit Profile
                                    </Button>
                                    <Dialog
                                        open={openUpdateDialog}
                                        onClose={handleEditDialogClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title">
                                            {"Edit User"}
                                        </DialogTitle>
                                        {editFlag?
                                            <Alert severity="error" variant="filled">
                                                {editMessage}
                                            </Alert>
                                            :""}
                                        <DialogContent>
                                            <h5>Select a new profile picture (optional):</h5>
                                            <input type="file" onChange={updateImageState} accept="image/png, image/jpeg, image/gif" name="myfile"/>
                                        </DialogContent>
                                        <DialogContent style={textBox}>
                                            <TextField id="outlined-basic"
                                                       label="Firstname"
                                                       variant="outlined"
                                                       defaultValue={firstname}
                                                       helperText={firstnamehelpertext}
                                                       error={firstnameerror}
                                                       onChange={updateNewFirstNameState}/>
                                        </DialogContent>
                                        <DialogContent style={textBox}>
                                            <TextField id="outlined-basic"
                                                       label="Lastname"
                                                       variant="outlined"
                                                       defaultValue={lastname}
                                                       helperText={lastnamehelpertext}
                                                       error={lastnameerror}
                                                       onChange={updateNewLastNameState}/>
                                        </DialogContent>
                                        <DialogContent style={textBox}>
                                            <TextField id="outlined-basic"
                                                       label="Email"
                                                       variant="outlined"
                                                       defaultValue={email}
                                                       helperText={emailhelpertext}
                                                       error={emailerror}
                                                       onChange={updateNewEmailState}/>
                                        </DialogContent>
                                        <DialogContent style={textBox}>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                                                <Input fullWidth
                                                       id="standard-adornment-password"
                                                       type={newpassword.showPassword ? 'text' : 'password'}
                                                       value={newpassword.password}
                                                       onChange={handleChangeNewPassword('password')}
                                                       endAdornment={
                                                           <InputAdornment position="end">
                                                               <IconButton
                                                                   aria-label="toggle password visibility"
                                                                   onClick={handleClickShowNewPassword}
                                                                   onMouseDown={handleMouseDownNewPassword}>
                                                                   {newpassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                                               </IconButton>
                                                           </InputAdornment>
                                                       }
                                                />
                                            </FormControl>
                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input fullWidth
                                                       id="standard-adornment-password"
                                                       type={password.showPassword ? 'text' : 'password'}
                                                       value={password.password}
                                                       onChange={handleChangePassword('password')}
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
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleEditDialogClose}>Cancel</Button>
                                            {firstnameerror === true || lastnameerror === true?
                                                <Button variant="outlined" color="success" data-dismiss="model" disabled>
                                                Update
                                                </Button>:
                                                <Button variant="outlined" color="success" data-dismiss="model" onClick={() => {updateUser()}} autoFocus>
                                                    Update
                                                </Button>
                                            }
                                        </DialogActions>
                                    </Dialog>
                                    <Snackbar
                                        autoHideDuration={6000}
                                        open={snackOpen}
                                        onClose={handleSnackClose}
                                        key={snackMessage}
                                    >
                                        <Alert onClose={handleSnackClose} severity="success" sx={{
                                            width: '100%' }}>
                                            {snackMessage}
                                        </Alert>
                                    </Snackbar>
                                </Stack>
                            </div>
                        </div>:
                        <div>
                            <div style={buttonStyle}>
                                <Stack direction="row" spacing={3} justifyContent="center">
                                    <Button variant="contained" color="secondary" endIcon={<EditIcon/>} disabled>
                                        Edit Profile
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    }
                </Paper>
            </div>
            <NavBottom/>
        </div>
    )
}
export default Profile;