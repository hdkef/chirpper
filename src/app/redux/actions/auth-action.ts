import { Action } from "@ngrx/store"

export const LOGIN_START = "AUTH LOGIN START"
export const REGISTER_START = "AUTH REGISTER START"
export const LOGIN_SUCCESS = "AUTH LOGIN SUCCESS"
export const SEND_INFO = "AUTH SEND_INFO"
export const AUTOLOGIN_START = "AUTH AUTO_LOGIN"
export const LOGOUT_START = "AUTH LOGOUT START"

export class LoginStart implements Action {
    type: string = LOGIN_START
    constructor(public payload:{
        Username:string,
        Password:string,
    }){}
}

export class AutoLoginStart implements Action {
    type: string = AUTOLOGIN_START
    constructor(public payload){}
}

export class RegisterStart implements Action {
    type: string = REGISTER_START
    constructor(public payload:{
        Username:string,
        Password:string,
        Email:string,
    }){}
}

export class LoginSuccess implements Action {
    type:string = LOGIN_SUCCESS
    constructor(public payload:{
        ID:string,
        Username:string,
        Email:string,
        Token:string,
        AvatarURL:string,
    }){}
}

export class SendInfo implements Action {
    type:string = SEND_INFO
    constructor(public payload:{
        Info:string
    }){}
}

export class LogoutStart implements Action {
    type:string = LOGOUT_START
    constructor(public payload){}
}

export type AuthActionType = LoginStart | RegisterStart | LoginSuccess | SendInfo | AutoLoginStart | LogoutStart