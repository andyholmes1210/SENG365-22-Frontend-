import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
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

    const checkCategory = (x: number) => {
        // for(let item of category) {
        //     console.log(item.categoryId)
        //     if(x === item.categoryId) {
        //         return item.name
        //     } else {
        //         return "Not Found"
        //     }
        // }

        let name = ""
        for(let i = 0; i < category.length; i++) {
            if(x === category[i].categoryId){
                name = category[i].name
                return name
            } else {
                name = "Not Found"
                return name
            }
        }
    }

    const getAuctionImage = (x: any) => {
        axios.get('http://localhost:4941/api/v1/auctions/' + x.sellerId + "/image")
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setImage(response.data)
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
        const daysBetween: number = new Date(x).getDate() - new Date().getDate()
        if (daysBetween < 0) {
            return <h6 style={{fontSize: "15px",
                color: '#58111A'}}> Auction End </h6>
        } if (daysBetween == 0) {
            return <h6 style={{fontSize: "15px",
                color: '#FF0800'}}> Close Today </h6>
        } if (daysBetween == 1) {
            return <h6 style={{fontSize: "15px",
                color: '#CD5700'}}> Close Tomorrow </h6>
        } if (daysBetween == 2) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in 2 days </h6>
        } if (daysBetween == 3) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in 3 days </h6>
        } if (daysBetween == 4) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in 4 days </h6>
        }if (daysBetween == 5) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in 5 days </h6>
        } if (daysBetween == 6) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in 6 days </h6>
        } if (daysBetween == 7) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in a week </h6>
        } if (daysBetween > 7 && daysBetween < 14) {
            return <h6 style={{fontSize: "15px",
                color: '#FEBE10'}}> Close in a week </h6>
        } if (daysBetween >= 14 && daysBetween < 21) {
            return <h6 style={{fontSize: "15px",
                color: '#006400'}}> Close in 2 weeks </h6>
        } if (daysBetween >= 21 && daysBetween < 28) {
            return <h6 style={{fontSize: "15px",
                color: '#006400'}}> Close in 3 weeks </h6>
        } if (daysBetween >= 28 && daysBetween < 35) {
            return <h6 style={{fontSize: "15px",
                color: '#006400'}}> Close in 4 weeks </h6>
        } if (daysBetween >= 35) {
            return <h6 style={{fontSize: "15px",
                color: '#006400'}}> Close in a month </h6>
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

    // const checkImage = (x: any) => {
    //     if(image === null){
    //         return <img style={{height: "30px", width: "30px"}} src={"https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"}/>
    //     } else {
    //         return <img style={{height: "30px", width: "30px"}} src={"http://localhost:4941/api/v1/users/" + x.sellerId + "/image"}/>
    //     }
    // }

    const auction_rows = () => {
        return (auctions.map((row) =>
            <Paper elevation={15} style={{
                display: "inline-block",
                height: "480px",
                width: "330px",
                margin: "60px",
                padding: "5px",
                textAlign: "center"}}>
                <div style={{
                    padding: "5px"}}>
                    <img style={{
                        height: "120px",
                        width: "180px",}}
                    src={"http://localhost:4941/api/v1/auctions/" + row.auctionId + "/image"}/>
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
                    <h6 style={{fontSize: "15px"}}> {checkCategory(row.categoryId)} </h6>
                </div>
                <div style={{
                    width: "320px"}}>
                    <h6 style={{fontWeight: 'bold', textDecorationLine: 'underline'}}> Seller:</h6>
                    <h6 style={{fontSize: "15px"}}>
                        {row.sellerFirstName} {row.sellerLastName} <img style={{
                            height: "30px", width: "30px"}} src={"http://localhost:4941/api/v1/users/" + row.sellerId + "/image"}/>
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
                        <Link to={"/auction/" + row.auctionId}>
                            <Button variant="contained" endIcon={<ArticleIcon/>}>
                              View
                            </Button>
                        </Link>
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
        backgroundColor: '#008B8B'
    }

    return (
        <Paper elevation={10} style={card}>
            <h1 style={{fontSize: "50px",
                textAlign: "center",
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#000000',
                textShadow: "2px 2px #F0FFFF",
                textDecorationLine: 'underline'}}>Auctions</h1>
            <div style={{display: "inline-block",
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
                <Pagination count={totalpage} variant="outlined" shape="rounded" size="large" onChange={paginationPage}/>
            </div>
        </Paper>
    )

}

export default Auctions;