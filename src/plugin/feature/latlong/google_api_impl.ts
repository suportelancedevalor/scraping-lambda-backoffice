// import { BaseRepository } from "../../api/base-repository";
// import { ScrapingAuctionAPI } from "../../api/scraping-auction-api";
// import { ScrapingAuctionAPIBuilder } from "../../api/scraping-auction-api-builder";

// export class GoogleAPIImpl extends BaseRepository implements GoogleAPI {
//     constructor(url: string) {
//         super(url);
//     }

//     async getLatLong(param: string): Promise<string> {
//         const details = this.getBodyOrThrow(await this.getService().fetchPage(param))
//         return details;
//     }   

//     getService(): ScrapingAuctionAPI {
//         return new ScrapingAuctionAPIBuilder(this.baseUrl).build();
//     }
// }