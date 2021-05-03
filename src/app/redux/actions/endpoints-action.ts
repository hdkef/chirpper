import { Action } from "@ngrx/store";
import { Feed } from "src/app/models/feed";

export const VERIFY_TOKEN = "ENDPOINTS FEED START"
export const INIT_WS = "ENDPOINTS INIT WS"
export const SEND_INFO = "ENDPOINTS SEND INFO"
export const APPEND_MANY_FEED = "ENDPOINTS APPEND MANY FEED"
export const APPEND_ONE_FEED = "ENDPOINTS APPEND ONE FEED"

export class VerifyToken implements Action{
    type: string = VERIFY_TOKEN
    constructor(public payload){}
}

export class AppendManyFeed implements Action {
    type:string = APPEND_MANY_FEED
    constructor(public payload:Feed[]){}
}

export class AppendOneFeed implements Action {
    type:string = APPEND_ONE_FEED
    constructor(public payload:Feed){}
}

export class InitWS implements Action{
    type: string = INIT_WS
    constructor(public payload){}
}

export class SendInfo implements Action{
    type: string = SEND_INFO
    constructor(public payload:{Info:string}){}
}

export type EndpointsActionType = VerifyToken | SendInfo | AppendManyFeed | AppendOneFeed