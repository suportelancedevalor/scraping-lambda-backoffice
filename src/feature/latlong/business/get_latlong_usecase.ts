import { UseCase } from "typescript-ode/src/business/interactor/UseCase";
import { Output } from "typescript-ode/src/business/dto/Output";


export class GetLatlongUseCase extends UseCase<string, string> {
    private repo: GoogleAPI;

    constructor(repo: GoogleAPI) {
        super();
        this.repo = repo;
    }

    public async execute(param: string): Promise<Output<string>> {
        var latlong = this.repo.getLatLong(param)
        latlong.length
        return null
    }
}