import { GetLatlongUseCase } from "../business/get_latlong_usecase";

interface UseCaseGatewayInjector {
    getUseCase: GetLatlongUseCase;
}

export class UseCaseGatewayInjectorCompanion {
    static self: UseCaseGatewayInjector;
}