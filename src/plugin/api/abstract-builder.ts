import axios, { AxiosInstance } from 'axios';

export abstract class AbstractBuilder {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    createHttpClient(): AxiosInstance {
        const httpClient = axios.create({
            baseURL: this.baseUrl,
            timeout: 5000,
        });
        return httpClient;
    }

    abstract build(): any;
}
