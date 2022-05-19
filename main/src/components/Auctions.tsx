import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import CSS from 'csstype';
import Navbar from "./Navbar/NavbarDefault";
import {NavBottom} from "./Navbar/NavbarElement";
import {BtnLink, Btn} from "./ButtonElement";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDateTimePicker} from "@mui/x-date-pickers";

import {
    Button,
    Paper,
    Stack,
    Alert,
    Typography,
    Pagination,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    TextField,
    InputLabel,
    OutlinedInput, InputAdornment, FormControl, Select, MenuItem, Snackbar
} from
        "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

const Auctions = () => {

    const allCategory = [ {categoryId: 1, name: 'Smartphones'},
        {categoryId: 2, name: 'Computers & Laptops'},
        {categoryId: 3, name: 'Books'},
        {categoryId: 4, name: 'CDs'},
        {categoryId: 5, name: 'DVDs'},
        {categoryId: 6, name: 'Motorbikes'},
        {categoryId: 7, name: 'Bicycles'},
        {categoryId: 8, name: 'Farm Equipment'},
        {categoryId: 9, name: 'Jewellery'},
        {categoryId: 10, name: 'Homeware'},
        {categoryId: 11, name: 'Furniture'},
        {categoryId: 12, name: 'Watches'},
        {categoryId: 13, name: 'Instruments'},
        {categoryId: 14, name: 'Electronics'},
        {categoryId: 15, name: 'Office Equipment'},
        {categoryId: 16, name: 'Tablets'},
        {categoryId: 17, name: 'Paintings & Sculptures'},
        {categoryId: 18, name: 'Bulk Items'},
        {categoryId: 19, name: 'Gaming Consoles'},
        {categoryId: 20, name: 'Hair Care'},
        {categoryId: 21, name: 'Perfume'},
        {categoryId: 22, name: 'Clothing'},
        {categoryId: 23, name: 'Lego'},
        {categoryId: 24, name: 'Figurines'},
        {categoryId: 25, name: 'Cars'},
    ];

    //const navigate = useNavigate()
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [auctions, setAuctions] = React.useState<Array<Auctions>>([])
    const [categories, setCategories] = React.useState<Array<Category>>([])
    const [count, setCount] = React.useState(10)
    const [index, setIndex] = React.useState(0)
    const [totalpage, setTotalpage] = React.useState(0)
    const [file, setFile] = React.useState("")
    const [filetype, setFileType] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [category, setCategory] = React.useState("")
    const [endDate, setEndDate] = React.useState<Date | null>(new Date());
    const [description, setDescription] = React.useState("")
    const [reservePrice, setReservePrice] = React.useState(1)
    const [AuctionFlag, setAuctionFlag] = React.useState(false)
    const [AuctionMessage, setAuctionMessage] = React.useState("")

    const [openAddAuctionDialog, setOpenAddAuctionDialog] = React.useState(false)
    const [AddAuction, setAddAction] = React.useState<any>({title:"",
        description:"",
        categotyId:"",
        endDate: new Date(),
        reserve: 0})
    const [dialogAddAuction, setDialogAddAuction] = React.useState<any>({title:"",
        description:"",
        categotyId:"",
        endDate: new Date(),
        reserve: 0})

    const handleAddAuctionDialogOpen = (addAuction: any) => {
        setDialogAddAuction(addAuction)
        setOpenAddAuctionDialog(true);
    };

    const handleAddAuctionDialogClose = () => {
        setAddAction({title:"",
            description:"",
            categotyId:"",
            endDate: new Date(),
            reserve: 0})
        setOpenAddAuctionDialog(false);
    };

    const [snackOpen, setSnackOpen] = React.useState(false)
    const [snackMessage, setSnackMessage] = React.useState("")
    const handleSnackClose = (event?: React.SyntheticEvent | Event,
                              reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    };

    const paginationPage = (event: React.ChangeEvent<unknown>, value: number) => {
        setIndex((value * count) - count)
        getAuctions()
    }

    React.useEffect(() => {
        getAuctions()
        getCategory()
    },[index, count, totalpage])

    const getAuctions = () => {
        axios.get('http://localhost:4941/api/v1/auctions?count=' + count + "&startIndex=" + index)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctions(response.data.auctions)
                setTotalpage(Math.round(response.data.count/count))
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const addAuction = () => {
        if(file === "") {
            setAuctionFlag(true)
            setAuctionMessage("Must Provide a Photo of the Auction!")
        } else if(title === ""){
            setAuctionFlag(true)
            setAuctionMessage("Must Provide a Title!")
        } else if (description === ""){
            setAuctionFlag(true)
            setAuctionMessage("Must Provide a Description!")
        } else if (reservePrice < 1){
            setAuctionFlag(true)
            setAuctionMessage("Reserve Price must be 1 or higher!")
        } else if (endDate === null || endDate < new Date()){
            setAuctionFlag(true)
            setAuctionMessage("Must Provide an End Date!")
        } else if (category === ""){
            setAuctionFlag(true)
            setAuctionMessage("Must Provide a Category!")
        } else {
            axios.post('http://localhost:4941/api/v1/auctions', {
                    "title": title,
                    "description": description,
                    "categoryId": category,
                    "endDate": endDate.toISOString().replace("T", " ").replace("Z", ""),
                    "reserve": reservePrice},
                {headers:
                        {'X-Authorization': localStorage.getItem("auth_token")!}})
                .then((response) => {
                    uploadAuctionPic(response.data.auctionId)
                    getAuctions()
                    window.location.href = window.location.href
                    setSnackMessage("Add Auction successfully")
                    setSnackOpen(true)
                }, (error) => {
                    setAuctionFlag(true)
                    setAuctionMessage(error.response.statusText)
                })
        }
    }

    const getCategory = () => {
        axios.get('http://localhost:4941/api/v1/auctions/categories')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setCategories(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const updateImageState = (event: any) => {
        setFile(event.target.files[0])
        setFileType(event.target.files[0].type)
    }

    const uploadAuctionPic = (id: any) => {
            axios.put('http://localhost:4941/api/v1/auctions/' + id + '/image', file, {
                headers:
                    {'X-Authorization': localStorage.getItem("auth_token")!,
                        'Content-Type': filetype}
            })
                .then(()=>{
                }, () => {
                    setErrorFlag(true)
                    setErrorMessage("Image must be jpg/gif/png")
                })
    }

    const checkNull = (x: any) => {
        if(x === null){
            return 0
        } else {
            return x
        }
    }

    const checkDate = (x: any) => {
        const daysBetween: number = (Math.trunc((new Date(x).getTime() - new Date().getTime())/(86400 * 1000)))
        if (daysBetween < 0) {
            return <h6 style={{fontSize: "15px",
                color: '#FF0000'}}> Auction End </h6>
        } if (daysBetween === 0) {
            return <h6 style={{fontSize: "15px",
                color: '#950101'}}> Close Today </h6>
        } if (daysBetween === 1) {
            return <h6 style={{fontSize: "15px",
                color: '#CD5700'}}> Close Tomorrow </h6>
        } if (daysBetween > 1 && daysBetween < 14) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in {daysBetween} days </h6>
        } if (daysBetween >= 14) {
            return <h6 style={{fontSize: "15px",
                color: '#006400'}}> Close in {daysBetween} days </h6>
        }
    }

    const checkReserve = (x: any) => {
        if(x.highestBid >= x.reserve) {
            return <h6 style={{fontSize: "12px",
                textAlign: "center",
                fontStyle: 'italic',
                color: 'green'}}>Reserved Met</h6>
        } else {
            return <h6 style={{fontSize: "12px",
                textAlign: "center",
                fontStyle: 'italic',
                color: 'red'}}>Reserved Not Met</h6>
        }
    }

    const updateTitleState = (event: any) => {
        setTitle(event.target.value)
    }

    const updateDescriptionState = (event: any) => {
        setDescription(event.target.value)
    }

    const updateReserveState = (event: any) => {
        setReservePrice(+event.target.value)
    }


    const updateCategoryState = (event: any) => {
        setCategory(event.target.value)
    }

    const getImageDefault = (event: any) => {
        event.target.src = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
    }

    const getAuctionDefault = (event: any) => {
        event.target.src = "https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg"
    }

    const auction_rows = () => {
        return (auctions.map((row) =>
            <Paper elevation={24} style={{
                display:"inline-block",
                height: "480px",
                width: "330px",
                margin: "10px",
                padding: "5px",
                textAlign: "center",
                alignContent: "center",
                borderRadius: "30px",
                backgroundColor: "#5C527F"}}>
                <Paper elevation={20} style={{
                    height: "450px",
                    borderRadius: "30px",
                    marginTop: "10px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    backgroundColor: "#3E2C41"}}>
                    <div style={{
                        padding: "5px",
                        marginTop: "5px"}}>
                    <img style={{
                        height: "120px",
                        width: "180px",
                        borderRadius: "15px"}}
                         src={"http://localhost:4941/api/v1/auctions/" + row.auctionId + "/image"}
                         onError={getAuctionDefault} alt=""/>
                    </div>
                    <div style={{display:"inline-block",
                        width: "300px"}}>
                        <h1 style={{fontSize: "24px", color: '#fff'}}>{row.title}</h1>
                    </div>
                    <div style={{float:"left",
                        width: "150px"}}>
                        <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff'}}> End Date:</h6>
                        {checkDate(row.endDate.toString())}
                    </div>
                    <div style={{display:"inline-block",
                        width: "150px"}}>
                        <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff'}}> Category: </h6>
                        <h6 style={{fontSize: "15px", color: '#fff'}}> {categories.filter(function checkCategory(x:any) {
                            return x.categoryId === row.categoryId
                        }).map((x) => x.name)} </h6>
                    </div>
                    <div style={{
                        width: "300px"}}>
                        <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff'}}> Seller:</h6>
                        <h6 style={{fontSize: "15px", color: '#fff'}}>
                            {row.sellerFirstName} {row.sellerLastName} <img style={{
                            height: "30px", width: "30px"}} src={"http://localhost:4941/api/v1/users/" + row.sellerId + "/image"} onError={getImageDefault} alt=""/>
                        </h6>
                    </div>
                    <div style={{float:"left",
                        width: "150px"}}>
                        <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff'}}> Highest bid:</h6>
                        <h6 style={{fontSize: "15px", color: '#fff'}}>${checkNull(row.highestBid)}</h6>
                    </div>
                    <div style={{display:"inline-block",
                        width: "150px"}}>
                        <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff'}}> Reserve Price:</h6>
                        <h6 style={{fontSize: "15px", color: '#fff'}}>${row.reserve}</h6>
                        {checkReserve(row)}
                    </div>
                    <div>
                        <Btn>
                            <BtnLink to={"/auction/" + row.auctionId}>
                                View
                            </BtnLink>
                        </Btn>
                    </div>
                </Paper>
            </Paper>
            )
        )
    }

    const card: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        marginTop: "5%",
        marginBottom: "5%",
        width: "80%",
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    }

    const textBox: CSS.Properties = {
        width: "45%",
        margin: "auto",
        textAlign: 'left',
        padding: "5px 5px"
    }

    return (
        <div>
            <Navbar/>
            <div>
                <Paper elevation={10} style={card}>
                    <div style={{display:"inline-block",
                        width:"13%",
                        margin: "auto"}}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                            { localStorage.length === 0?
                                <Button variant="contained" color="success" endIcon={<AddIcon/>} disabled>
                                    Add Auction
                                </Button>:
                                <Button variant="contained" color="success" endIcon={<AddIcon/>} onClick={() => handleAddAuctionDialogOpen(AddAuction)}>
                                    Add Auction
                                </Button>
                            }
                            <Dialog
                                open={openAddAuctionDialog}
                                onClose={handleAddAuctionDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle id="alert-dialog-title">
                                    {"Add Auction"}
                                </DialogTitle>
                                {AuctionFlag?
                                    <Alert severity="error" variant="filled" >
                                        {AuctionMessage}
                                    </Alert>
                                    :""}
                                <DialogContent>
                                    <h5>Select an Auction Picture:</h5>
                                    <input type="file" onChange={updateImageState} accept="image/png, image/jpeg, image/gif" name="myfile"/>
                                </DialogContent>
                                <DialogContent style={{padding: "10px 10px"}}>
                                    <TextField fullWidth id="outlined-multiline-flexible"
                                               label="Title"
                                               multiline
                                               maxRows={2}
                                               helperText="Please enter a Title"
                                               defaultValue={title}
                                               onChange={updateTitleState}/>
                                </DialogContent>
                                <DialogContent style={{padding: "10px 10px"}}>
                                    <TextField fullWidth id="outlined-multiline-flexible"
                                               label="Description"
                                               multiline
                                               maxRows={4}
                                               helperText="Please enter a Description"
                                               defaultValue={description}
                                               onChange={updateDescriptionState}/>
                                </DialogContent>
                                <DialogContent style={textBox}>
                                    <FormControl sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={reservePrice}
                                            onChange={updateReserveState}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Amount"
                                        />
                                    </FormControl>
                                </DialogContent>
                                <DialogContent style={textBox}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDateTimePicker
                                            label="Pick Date and Time"
                                            value={endDate}
                                            onChange={(newValue) => {
                                                setEndDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                            minDateTime={new Date()}
                                        />
                                    </LocalizationProvider>
                                </DialogContent>
                                <DialogContent style={{
                                    width: "70%",
                                    margin: "auto",
                                    textAlign: 'left',
                                    padding: "5px 5px"
                                }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Category"
                                            onChange={updateCategoryState}
                                        >
                                            {allCategory.map((category) =>
                                            <MenuItem value={category.categoryId}>{category.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleAddAuctionDialogClose}>Cancel</Button>
                                    <Button variant="outlined" color="success" onClick={() => {addAuction()}} autoFocus>
                                        Add
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
                    <div style={{display:"inline-block",
                        width:"85%",
                        margin: "auto"}}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                            <Button variant="contained" endIcon={<FilterAltIcon/>}>
                                Filter
                            </Button>
                        </Stack>
                    </div>
                    <h1 style={{fontSize: "50px",
                        textAlign: "center",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: '#fff',
                        textShadow: "3px 3px #5C527F",
                        textDecorationLine: 'underline'}}>Auctions</h1>
                    <div style={{display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "center",
                        width: "80%",
                        margin: "auto",
                        textAlign: "center",
                        marginBottom: "10px"}}>
                        {errorFlag?
                            <Alert severity="error" variant="filled" >
                                {errorMessage}
                            </Alert>
                            :""}
                    </div>
                    <div style={{display: "flex",
                        flexFlow: "row wrap",
                        justifyContent: "center",
                        width: "80%",
                        margin: "auto",
                        textAlign: "center"}}>
                        {auction_rows()}
                    </div>
                    <div style={{width: "80%",
                        margin: "auto",
                        marginTop: "20px",
                        textAlign:"center",
                        color: "white"}}>
                        <Typography>Page: {(index/count) + 1}</Typography>
                    </div>
                    <div style={{width: "80%",
                        margin: "auto",
                        marginBottom: "20px",
                        display:"flex",
                        justifyContent:"center"}}>
                        <Pagination count={totalpage} color="secondary" size="large" onChange={paginationPage}/>
                    </div>
                </Paper>
            </div>
            <NavBottom/>
        </div>
    )
}

export default Auctions;