import { AxiosResponse } from 'axios';
import { ScrapingAuctionAPI } from './scraping-auction-api';
import {AuthenticationException, HttpException } from 'typescript-ode/src/business/exception/Exceptions';
import { parseFromString } from 'dom-parser';

export abstract class BaseRepository {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected getBodyOrThrow(response: AxiosResponse): any {
        if (response.status === 401) {
            throw new AuthenticationException();
        }

        const content = response.data;
        const htmlDocument = parseFromString(content);
        const body = htmlDocument.getElementsByClassName('body');
        
        if (!body) {
            throw new HttpException(response.status, response.statusText);
        }

        return body;
    }

    abstract getService(): ScrapingAuctionAPI;
}
