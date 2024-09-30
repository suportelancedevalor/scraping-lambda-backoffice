import { UseCase } from "typescript-ode/src/business/interactor/UseCase";
import { Output } from "typescript-ode/src/business/dto/Output";
import { ValueOutput } from "typescript-ode/src/business/dto/ValueOutput";

export class GetLatlongUseCase extends UseCase<string, string> {
    private repo: GoogleAPI;

    constructor(repo: GoogleAPI) {
        super();
        this.repo = repo;
    }

    public async execute(_param: string): Promise<Output<string>> {
        console.log("GetLatlongUseCase.execute.start")
        
        return new Promise<Output<string>>((resolve, reject) => {
            var latlong = this.repo.getLatLong(_param)
            setTimeout( () => {
                resolve(new ValueOutput(latlong));
            }, 1500);
        });
    }
}