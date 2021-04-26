import { Action } from "@ngrx/store"

export const LOGIN_START = "LOGIN START"
export const REGISTER_START = "REGISTER START"
export const LOGIN_SUCCESS = "LOGIN SUCCESS"
export const SEND_INFO = "SEND_INFO"
export const AUTOLOGIN_START = "AUTO_LOGIN"

export class LoginStart implements Action {
    type: string = LOGIN_START
    constructor(public payload:{
        Username:string,
        Password:string,
    }){}
}

export class AutoLoginStart implements Action {
    type: string = AUTOLOGIN_START
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
    }){}
}

export class SendInfo implements Action {
    type:string = SEND_INFO
    constructor(public payload:{
        Info:string
    }){}
}

export type AuthActionType = LoginStart | RegisterStart | LoginSuccess | SendInfo