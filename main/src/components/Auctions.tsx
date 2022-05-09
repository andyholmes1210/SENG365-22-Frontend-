import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import CSS from 'csstype';
import ArticleIcon from '@mui/icons-material/Article';

import {
    Button,
    Paper,
    Stack,
    Alert,
    AlertTitle,
    Typography, Pagination
} from
        "@mui/material";

const Auctions = () => {

    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [auctions, setAuctions] = React.useState<Array<Auctions>>([])
    const [category, setCategory] = React.useState<Array<Category>>([])
    const [image, setImage] = React.useState<Array<Auctions>>([])
    const [count, setCount] = React.useState(10)
    const [index, setIndex] = React.useState(0)
    const [totalpage, setTotalpage] = React.useState(0)
    const navigate = useNavigate()

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
                color: '#58111A'}}> Auction End </h6>
        } if (daysBetween === 0) {
            return <h6 style={{fontSize: "15px",
                color: '#FF0800'}}> Close Today </h6>
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
            return <h6 style={{fontSize: "15px",
                textAlign: "right",
                fontStyle: 'italic',
                color: 'green'}}>Reserved Met</h6>
        } else {
            return <h6 style={{fontSize: "15px",
                textAlign: "right",
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
            <Paper elevation={15} style={{
                display:"inline-block",
                height: "480px",
                width: "330px",
                margin: "55px",
                padding: "5px",
                textAlign: "center",
                alignContent: "center",
                borderRadius: "30px"}}>
                <div style={{
                    padding: "5px"}}>
                    <img style={{
                        height: "120px",
                        width: "180px",
                        borderRadius: "15px"}}
                    src={"http://localhost:4941/api/v1/auctions/" + row.auctionId + "/image"}
                    onError={getAuctionDefault}/>
                </div>
                <div style={{display:"inline-block",
                    width: "320px"}}>
                    <h1 style={{fontSize: "24px"}}>{row.title}</h1>
                </div>
                <div style={{float:"left",
                    width: "150px"}}>
                    <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> End Date:</h6>
                    {checkDate(row.endDate.toString())}
                </div>
                <div style={{display:"inline-block",
                    width: "150px"}}>
                    <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> Category: </h6>
                    <h6 style={{fontSize: "15px"}}> {category.filter(function checkCategory(x:any) {
                        return x.categoryId === row.categoryId
                    }).map((x) => x.name)} </h6>
                </div>
                <div style={{
                    width: "320px"}}>
                    <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> Seller:</h6>
                    <h6 style={{fontSize: "15px"}}>
                        {row.sellerFirstName} {row.sellerLastName} <img style={{
                            height: "30px", width: "30px"}} src={"http://localhost:4941/api/v1/users/" + row.sellerId + "/image"} onError={getImageDefault}/>
                    </h6>
                </div>
                <div style={{float:"left",
                    width: "150px"}}>
                    <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> Highest bid:</h6>
                    <h6 style={{fontSize: "15px"}}>${checkNull(row.highestBid)}</h6>
                </div>
                <div style={{display:"inline-block",
                    width: "150px"}}>
                    <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> Reserve Price:</h6>
                    <h6 style={{fontSize: "15px"}}>${row.reserve}</h6>
                    {checkReserve(row)}
                </div>
                <div style={{
                    width: "320px"}}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={() => navigate("/auction/" + row.auctionId)}variant="contained" endIcon={<ArticleIcon/>}>
                            View
                        </Button>
                    </Stack>
                </div>
            </Paper>
            )
        )
    }

    const card: CSS.Properties = {
        padding: "10px",
        margin: "30px",
        display: "inline-block",
        width: "1800px",
        backgroundColor: '#B5834A',
        borderRadius: "15px"
    }

    return (
        <Paper elevation={10} style={card}>
            <h1 style={{fontSize: "50px",
                textAlign: "center",
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#0B2A55',
                textShadow: "2px 2px #55360B",
                textDecorationLine: 'underline'}}>Auctions</h1>
            <div style={{display: "flex",
                flexFlow: "row wrap",
                justifyContent: "center",
                width: "1780px",
                textAlign: "center"}}>
                {errorFlag?
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                    :""}
                {auction_rows()}
            </div>
            <div style={{width: "1800px",
                textAlign:"center"}}>
                <Typography>Page: {(index/count) + 1}</Typography>
            </div>
            <div style={{width: "1800px",
                display:"flex",
                justifyContent:"center"}}>
                <Pagination count={totalpage} size="large" onChange={paginationPage}/>
            </div>
        </Paper>
    )

}

export default Auctions;