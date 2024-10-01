import axios from 'axios';

export class ScrapingAuctionLambda {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    startSequence(_param: any): Promise<any> {
        return axios.post(this.baseUrl, _param);
    }
}
