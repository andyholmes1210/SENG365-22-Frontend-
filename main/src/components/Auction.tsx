import {Link, useParams} from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Stack, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import React from "react";
import CSS from "csstype";
import axios from "axios";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArticleIcon from '@mui/icons-material/Article';
import Navbar from "./Navbar/NavbarDefault";


const Auction = () => {
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [openBidderDialog, setOpenBidderDialog] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [category, setCategory] = React.useState<Array<Category>>([])
    const [auction, setAuction] = React.useState<Array<Auctions>>([{auctionId: 0,
        title: "",
        description: "",
        reserve: 0,
        categoryId: 0,
        sellerId: 0,
        sellerFirstName: "",
        sellerLastName: "",
        highestBid: 0,
        numBids: 0,
        endDate: new Date(),
        image_filename: ""}])

    const [bids, setBids] = React.useState<Array<Bid>>([{firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0}])


    const [dialogBidder, setDialogBidder] = React.useState<Bid>({firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0})
    const [updateBidder, setUpdateBidder] = React.useState<Bid>({firstName: "firstName",
        lastName: "lastName",
        amount: 0,
        id: 0,
        timestamp: new Date(),
        auction_id: 0,
        user_id: 0,
        bidderId: 0})
    let { id } = useParams();

    const handleBidderDialogOpen = (bids: Bid) => {
        setDialogBidder(bids)
        setOpenBidderDialog(true);
    };
    const handleBidderDialogClose = () => {
        setUpdateBidder({firstName: "firstName",
            lastName: "lastName",
            amount: 0,
            id: 0,
            timestamp: new Date(),
            auction_id: 0,
            user_id: 0,
            bidderId: 0})
        setOpenBidderDialog(false);
    };

    React.useEffect(() => {
        getOneAuction()
        getAuctionBid()
        getCategory()
    },[bids])

    const getOneAuction = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuction(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    function getAuctionBid () {
        axios.get('http://localhost:4941/api/v1/auctions/' + id + '/bids')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setBids(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const getCategory = () => {
        axios.get('http://localhost:4941/api/v1/auctions/categories')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setCategory(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const checkCategory = (x: number) => {
        let name = ""
        for(let i = 0; i < category.length; i++) {
            if(x === category[i].categoryId){
                name = category[i].name
                return name
            }
        }
    }

    const changeDate = (x: string) => {
        const date = new Date(x).toLocaleString()
        return date
    }

    const checkNull = (x: any) => {
        if(x === null){
            return 0
        } else {
            return x
        }
    }

    const get_bidders_rows = () => {
        return (bids.map((row) =>
                <TableRow hover
                          tabIndex={-1}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>${row.amount}</TableCell>
                    <TableCell>{changeDate(row.timestamp.toString())}</TableCell>
                    <TableCell>
                        <img style={{
                            height: "100px", width: "100px"}} src={"http://localhost:4941/api/v1/users/" + row.bidderId + "/image"}/>
                    </TableCell>
                </TableRow>
            )
        )
    }



    const auction_detail_rows = (auction: any, bids: any) => {
        return (
            <Paper elevation={15} style={{
                textAlign: "center",
                width: "1780px"}}>
                <div style={{
                    padding: "5px"}}>
                    <img style={{display:"inline-block",
                        height: "600px",
                        width: "800px"}}
                         src={"http://localhost:4941/api/v1/auctions/" + auction.auctionId + "/image"}/>
                </div>
                <div style={{display:"inline-block",
                    width: "1780px"}}>
                    <h1 style={{fontSize: "48px",
                        fontWeight: 'bold'}}>{auction.title}</h1>
                </div>
                <div style={{float:"left",
                    padding:"5px",
                    width: "1780px",
                    textAlign:"center"}}>
                    <h2 style={headingLeft}>Description:</h2>
                    <h2 style={{fontSize: "20px", textAlign:"left"}}>{auction.description}</h2>
                </div>
                <div style={{float:"left",
                    width: "890px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>Seller:</h2>
                    <h3> {auction.sellerFirstName} {auction.sellerLastName} </h3>
                    <img style={{
                        height: "100px", width: "150px"}} src={"http://localhost:4941/api/v1/users/" + auction.sellerId + "/image"}/>
                </div>
                <div style={{float:"left",
                    width: "890px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>Current Bidder:</h2>
                    <h3> {auction.sellerFirstName} {auction.sellerLastName} </h3>
                    <img style={{
                        height: "100px", width: "150px"}} src={"http://localhost:4941/api/v1/users/" + auction.sellerId + "/image"}/>
                    {/*<h3> {bids.firstName} {bids.lastName} </h3>*/}
                    {/*<img style={{*/}
                    {/*    height: "100px", width: "150px"}} src={"http://localhost:4941/api/v1/users/" + bids.bidderId + "/image"}/>*/}
                </div>
                <div style={{float:"left",
                    width: "592px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>Number of Bids:</h2>
                    <h3> {auction.numBids} </h3>
                </div>
                <div style={{float:"left",
                    width: "592px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>Reserve Price:</h2>
                    <h3> ${auction.reserve} </h3>
                </div>
                <div style={{float:"left",
                    width: "592px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>Current Bid:</h2>
                    <h3> ${checkNull(auction.highestBid)} </h3>
                </div>
                <div style={{float:"left",
                    width: "890px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>Category:</h2>
                    <h3> {checkCategory(auction.categoryId)} </h3>
                </div>
                <div style={{float:"left",
                    width: "890px",
                    padding:"5px"}}>
                    <h2 style={headingCen}>End Date:</h2>
                    <h3>test</h3>
                    {/*<h3> {changeDate(auction.endDate.toString())} </h3>*/}
                </div>
                <div style={{float:"left",
                    width: "890px",
                    padding:"5px"}}>
                    <Stack direction="row" spacing={2} justifyContent="right">
                        <Button variant="contained" endIcon={<ArticleIcon/>}>
                            View Similar Auctions
                        </Button>
                    </Stack>
                </div>
                <div style={{float:"left",
                    width: "890px",
                    padding:"5px"}}>
                    <Stack direction="row" spacing={2} justifyContent="left">
                        <Button variant="contained" endIcon={<AttachMoneyIcon/>} onClick={() => handleBidderDialogOpen(bids)}>
                            View Bidders
                        </Button>
                        <Dialog
                            open={openBidderDialog}
                            onClose={handleBidderDialogClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"Bidders"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={headingCen}>
                                                Firstname
                                            </TableCell>
                                            <TableCell style={headingCen}>
                                                Lastname
                                            </TableCell>
                                            <TableCell style={headingCen}>
                                                Amount
                                            </TableCell>
                                            <TableCell style={headingCen}>
                                                Timestamp
                                            </TableCell>
                                            <TableCell style={headingCen}>
                                                Profile Picture
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {get_bidders_rows()}
                                    </TableBody>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleBidderDialogClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </div>
            </Paper>
        )
    }

    const headingCen: CSS.Properties = {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign:"center"
    }

    const headingLeft: CSS.Properties = {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign:"left"
    }

    const card: CSS.Properties = {
        padding: "10px",
        margin: "30px",
        display: "inline-block",
        width: "1800px",
        backgroundColor: '#008B8B'
    }
    return (
        <Paper elevation={10} style={card}>
            <Stack direction="row" spacing={2} justifyContent="left">
                <Link to={"/"}>
                    <Button variant="contained" endIcon={<ArrowCircleLeftOutlinedIcon/>}>
                        Go back
                    </Button>
                </Link>
            </Stack>
            <h1 style={{fontSize: "50px",
                textAlign: "center",
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#000000',
                textShadow: "2px 2px #F0FFFF",
                textDecorationLine: 'underline'}}>Auction Details</h1>
            <div style={{display:"inline-block",
                width: "1780px"}}>
                {errorFlag?
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                    :""}
                {auction_detail_rows(auction, bids)}
            </div>
        </Paper>
    )
}
export default Auction;