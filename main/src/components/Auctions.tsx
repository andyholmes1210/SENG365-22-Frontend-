import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import CSS from 'csstype';
import Navbar from "./Navbar/NavbarDefault";
import {NavBottom} from "./Navbar/NavbarElement";
import {BtnLink, Btn} from "./ButtonElement";

import {
    Button,
    Paper,
    Stack,
    Alert,
    AlertTitle,
    Typography, Pagination
} from
        "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

const Auctions = () => {

    const navigate = useNavigate()
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [auctions, setAuctions] = React.useState<Array<Auctions>>([])
    const [category, setCategory] = React.useState<Array<Category>>([])
    const [count] = React.useState(10)
    const [index, setIndex] = React.useState(0)
    const [totalpage, setTotalpage] = React.useState(0)

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
                         onError={getAuctionDefault}/>
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
                        <h6 style={{fontSize: "15px", color: '#fff'}}> {category.filter(function checkCategory(x:any) {
                            return x.categoryId === row.categoryId
                        }).map((x) => x.name)} </h6>
                    </div>
                    <div style={{
                        width: "300px"}}>
                        <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline', color: '#fff'}}> Seller:</h6>
                        <h6 style={{fontSize: "15px", color: '#fff'}}>
                            {row.sellerFirstName} {row.sellerLastName} <img style={{
                            height: "30px", width: "30px"}} src={"http://localhost:4941/api/v1/users/" + row.sellerId + "/image"} onError={getImageDefault}/>
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

    return (
        <div>
            <Navbar/>
            <div>
                <Paper elevation={10} style={card}>
                    <div style={{display:"inline-block",
                        width:"13%",
                        margin: "auto"}}>
                        <Stack direction="row" spacing={2} justifyContent="right">
                            <Button variant="contained" color="success" endIcon={<AddIcon/>}>
                                Add Auction
                            </Button>
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