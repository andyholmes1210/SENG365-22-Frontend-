import CSS from "csstype";
import React from "react";
import Navbar from "./Navbar/NavbarDefault";
import axios from "axios";
import {
    Paper,
    Alert,
} from
        "@mui/material";
import {Btn, BtnLink} from "./ButtonElement";
import {NavBottom} from "./Navbar/NavbarElement";

const MyAuction = () => {

    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [sellAuction, setSellAuction] = React.useState<Array<Auctions>>([]);
    const [bidAuction, setBidAuction] = React.useState<Array<Auctions>>([]);
    const [categories, setCategories] = React.useState<Array<Category>>([]);
    const [sellerId, setSellerId] = React.useState(localStorage.getItem("userId"));
    const [bidderId, setBidderId] = React.useState(localStorage.getItem("userId"));
    const [bidderFlag, setBidderAuctionFlag] = React.useState(false)
    const [bidderMessage, setBidderAuctionMessage] = React.useState("")
    const [sellerFlag, setSellerAuctionFlag] = React.useState(false)
    const [sellerMessage, setSellerAuctionMessage] = React.useState("")

    React.useEffect(() => {
        getSellerIdAuctions();
        getBidderIdAuctions();
        getCategory();
    },[]);

    const getBidderIdAuctions = () => {
        if(localStorage.getItem('userId') === null) {
            setBidderAuctionFlag(true);
            setBidderAuctionMessage("Please login to view your Bid Auction!");
        } else {
            axios.get('http://localhost:4941/api/v1/auctions?bidderId=' + bidderId)
                .then((response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setBidAuction(response.data.auctions);
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                })
        }
    };

    const getSellerIdAuctions = () => {
        if(localStorage.getItem('userId') === null) {
            setSellerAuctionFlag(true);
            setSellerAuctionMessage("Please login to view your Sell Auction!");
        } else {
            axios.get('http://localhost:4941/api/v1/auctions?sellerId=' + sellerId)
                .then((response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setSellAuction(response.data.auctions);
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                })
        }
    };

    const getCategory = () => {
        axios.get('http://localhost:4941/api/v1/auctions/categories')
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setCategories(response.data);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    };

    const checkNull = (x: any) => {
        if(x === null){
            return 0;
        } else {
            return x;
        }
    };

    const checkDate = (x: any) => {
        const daysBetween: number = (Math.trunc((new Date(x).getTime() - new Date().getTime())/(86400 * 1000)));
        if (daysBetween < 0) {
            return <h6 style={{fontSize: "15px",
                color: '#FF0000'}}> Auction End </h6>;
        } if (daysBetween === 0) {
            return <h6 style={{fontSize: "15px",
                color: '#950101'}}> Close Today </h6>;
        } if (daysBetween === 1) {
            return <h6 style={{fontSize: "15px",
                color: '#CD5700'}}> Close in {daysBetween} day </h6>;
        } if (daysBetween > 1 && daysBetween < 14) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in {daysBetween} days </h6>;
        } if (daysBetween >= 14) {
            return <h6 style={{fontSize: "15px",
                color: '#006400'}}> Close in {daysBetween} days </h6>;
        }
    };

    const checkReserve = (x: any) => {
        if(x.highestBid >= x.reserve) {
            return <h6 style={{fontSize: "12px",
                textAlign: "center",
                fontStyle: 'italic',
                color: 'green'}}>Reserved Met</h6>;
        } else {
            return <h6 style={{fontSize: "12px",
                textAlign: "center",
                fontStyle: 'italic',
                color: 'red'}}>Reserved Not Met</h6>;
        }
    };

    const getImageDefault = (event: any) => {
        event.target.src = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
    };

    const getAuctionDefault = (event: any) => {
        event.target.src = "https://atasouthport.com/wp-content/uploads/2017/04/default-image.jpg";
    };

    const sellAuction_rows = () => {
        return (sellAuction.map((row) =>
                <Paper elevation={24} style={{
                    display:"inline-block",
                    height: "480px",
                    width: "330px",
                    margin: "5px",
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
    };

    const BidAuction_rows = () => {
        return (bidAuction.map((row) =>
                <Paper elevation={24} style={{
                    display:"inline-block",
                    height: "480px",
                    width: "330px",
                    margin: "5px",
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
    };




    const cardMain: CSS.Properties = {
        padding: "10px",
        margin: "auto",
        marginTop: "5%",
        marginBottom: "5%",
        width: "80%",
        textAlign: 'center',
        backgroundColor: '#261C2C',
        borderRadius: "15px"
    };

    return (
        <div>
            <Navbar/>
            <div>
                {errorFlag?
                    <Alert severity="error" variant="filled">
                        {errorMessage}
                    </Alert>
                    :""}
                <Paper elevation={24} style={cardMain}>
                    <h1 style={{fontSize: "50px",
                        textAlign: "center",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: '#fff',
                        textShadow: "3px 3px #5C527F",
                        textDecorationLine: 'underline'}}>My Bid Auctions</h1>
                    {bidderFlag?
                        <Alert severity="info" variant="filled">
                            {bidderMessage}
                        </Alert>
                        :""}
                    <div>
                        {BidAuction_rows()}
                    </div>
                </Paper>
                <Paper elevation={24} style={cardMain}>
                    <h1 style={{fontSize: "50px",
                        textAlign: "center",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: '#fff',
                        textShadow: "3px 3px #5C527F",
                        textDecorationLine: 'underline'}}>My Sell Auctions</h1>
                    {sellerFlag?
                        <Alert severity="info" variant="filled">
                            {sellerMessage}
                        </Alert>
                        :""}
                    <div>
                        {sellAuction_rows()}
                    </div>
                </Paper>
            </div>
            <NavBottom/>
        </div>
    )
}
export default MyAuction;