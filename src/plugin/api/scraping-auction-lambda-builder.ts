import { ScrapingAuctionLambda } from './scraping-auction-lambda';

export class ScrapingAuctionLambdaBuilder {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    build(): ScrapingAuctionLambda {
        return new ScrapingAuctionLambda(this.baseUrl);
    }
}
