type Auctions = {

    auctionId: number,
    title: string,
    description: string,
    reserve: number,
    categoryId: number,
    sellerId: number,
    sellerFirstName: string,
    sellerLastName: string,
    highestBid: number
    numBids: number,
    endDate: Date,
    image_filename?: string|null

}
