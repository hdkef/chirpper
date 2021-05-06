import { Chirp } from 'src/app/models/chirp'
import * as fromEndpointsAction from '../actions/endpoints-action'

export interface State {
    feed:Chirp[],
}

const initialState:State = {
    feed:[],
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
        case fromEndpointsAction.APPEND_MANY_FEED:
            let Feed:Chirp[] = action.payload.concat(state.feed)
            return {...state,feed:Feed}
        case fromEndpointsAction.APPEND_ONE_FEED:
            let Feed2:Chirp[] = [...state.feed]
            Feed2.unshift(action.payload)
            return {...state,feed:Feed2}
        default:
            return state
    }
}