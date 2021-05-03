import { MsgPayload } from 'src/app/models/msgpayload'
import * as fromEndpointsAction from '../actions/endpoints-action'

export interface State {
    feeds:MsgPayload[],
}

const initialState:State = {
    feeds:null,
}

export function EndpointsReducer(
    state:State = initialState,
    action:fromEndpointsAction.EndpointsActionType
){
    switch(action.type){
        case fromEndpointsAction.VERIFY_TOKEN:
            return state
        case fromEndpointsAction.INIT_WS:
            return state
        default:
            return state
    }
}