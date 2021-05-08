import { Action } from "@ngrx/store";
import { Chirp } from "src/app/models/chirp";

export const VERIFY_TOKEN = "ENDPOINTS FEED START"
export const INIT_WS = "ENDPOINTS INIT WS"
export const SEND_INFO = "ENDPOINTS SEND INFO"
export const APPEND_MANY_FEED = "ENDPOINTS APPEND MANY FEED"
export const APPEND_ONE_FEED = "ENDPOINTS APPEND ONE FEED"
export const INIT_COMMENT = "ENDPOINTS INIT COMMENT"
export const APPEND_MANY_COMMENT = "ENDPOINTS APPEND MANY COMMENT"
export const APPEND_ONE_COMMENT = "ENDPOINTS APPEND ONE COMMENT"
export const COMMENT_HEADER = "ENDPOINTS COMMENT HEADER"
export const DESTROY_COMMENT = "ENDPOINTS DESTROY COMMENT"

export class DestroyComment implements Action {
    type:string = DESTROY_COMMENT
    constructor(public payload){}
}

export class CommentHeader implements Action {
    type:string = COMMENT_HEADER
    constructor(public payload:Chirp){}
}

export class VerifyToken implements Action{
    type: string = VERIFY_TOKEN
    constructor(public payload){}
}

export class AppendManyComment implements Action {
    type:string = APPEND_MANY_COMMENT
    constructor(public payload:Chirp[]){}
}

export class AppendOneComment implements Action {
    type:string = APPEND_ONE_COMMENT
    constructor(public payload:Chirp){}
}

export class InitComment implements Action{
    type: string = INIT_COMMENT
    constructor(public payload:string){}
}

export class AppendManyFeed implements Action {
    type:string = APPEND_MANY_FEED
    constructor(public payload:Chirp[]){}
}

export class AppendOneFeed implements Action {
    type:string = APPEND_ONE_FEED
    constructor(public payload:Chirp){}
}

export class InitWS implements Action{
    type: string = INIT_WS
    constructor(public payload){}
}

export class SendInfo implements Action{
    type: string = SEND_INFO
    constructor(public payload:{Info:string}){}
}

export type EndpointsActionType = VerifyToken | SendInfo | AppendManyFeed | AppendOneFeed | InitWS | AppendOneComment | AppendManyComment | InitComment | CommentHeader | DestroyComment