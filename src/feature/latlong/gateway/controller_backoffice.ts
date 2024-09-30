import { Controller } from "typescript-ode/src/mvvm/Controller";

export interface ControllerBackOffice extends Controller {
    fetchLatLong(channelName: string): void
}