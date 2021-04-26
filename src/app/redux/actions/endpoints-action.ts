import { Action } from "@ngrx/store";

export const FEED_START = "ENDPOINTS FEED START"
export const SEND_INFO = "ENDPOINTS SEND INFO"

export class FeedStart implements Action{
    type: string = FEED_START
}

export class SendInfo implements Action{
    type: string = SEND_INFO
    constructor(public payload:{Info:string}){}
}

export type EndpointsActionType = FeedStart | SendInfo