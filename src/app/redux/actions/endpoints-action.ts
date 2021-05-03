import { Action } from "@ngrx/store";

export const VERIFY_TOKEN = "ENDPOINTS FEED START"
export const INIT_WS = "ENDPOINTS INIT WS"
export const SEND_INFO = "ENDPOINTS SEND INFO"

export class VerifyToken implements Action{
    type: string = VERIFY_TOKEN
}

export class InitWS implements Action{
    type: string = INIT_WS
}

export class SendInfo implements Action{
    type: string = SEND_INFO
    constructor(public payload:{Info:string}){}
}

export type EndpointsActionType = VerifyToken | SendInfo