import { ScrapingAuctionAPI } from "./scraping-auction-api";

export class ScrapingAuctionAPIBuilder {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    build(): ScrapingAuctionAPI {
        return new ScrapingAuctionAPI(this.baseUrl);
    }
}
