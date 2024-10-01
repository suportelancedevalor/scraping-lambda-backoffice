import axios from 'axios';

export class ScrapingAuctionAPI {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    fetchPage(address: string): Promise<any> {
        const url = `${this.baseUrl}/json?address=${address}&key=${process.env.ENGINE_API_KEY}`;
        return axios.get(url);
    }
}