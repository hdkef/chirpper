import * as fromAuthAction from '../actions/auth-action'

export interface State {
    ID:string,
    Username:string,
    Email:string,
    Token:string,
    Info:string,
}

const initialState:State = {
    ID:"",
    Username:"",
    Email:"",
    Token:"",
    Info:"",
}

export function authReducer (
    state:State = initialState,
    action:fromAuthAction.AuthActionType
){
    switch (action.type){
        case fromAuthAction.LOGIN_START:
            return {...state}
        case fromAuthAction.REGISTER_START:
            return {...state}
        case fromAuthAction.LOGIN_SUCCESS:
            return {...state,
                ID:action.payload["ID"],
                Username:action.payload["Username"],
                Email:action.payload["Email"],
                Token:action.payload["Token"],
            }
        case fromAuthAction.SEND_INFO:
            return {...state,
                Info:action.payload["Info"],
            }
        case fromAuthAction.AUTOLOGIN_START:
            return state
        default:
            return {...initialState}
    }
}