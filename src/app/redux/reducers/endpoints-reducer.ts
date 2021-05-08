import { Chirp } from 'src/app/models/chirp'
import * as fromEndpointsAction from '../actions/endpoints-action'

export interface State {
    feed:Chirp[],
    commentHeader:Chirp,
    comment:Chirp[],
}

const initialState:State = {
    feed:[],
    commentHeader:null,
    comment:[],
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
        case fromEndpointsAction.APPEND_MANY_COMMENT:
            let Comment:Chirp[] = action.payload.concat(state.comment)
            return {...state,comment:Comment}
        case fromEndpointsAction.APPEND_ONE_COMMENT:
            let Comment2:Chirp[] = [...state.comment]
            Comment2.unshift(action.payload)
            return {...state,comment:Comment2}
        case fromEndpointsAction.APPEND_ONE_FEED:
            let Feed2:Chirp[] = [...state.feed]
            Feed2.unshift(action.payload)
            return {...state,feed:Feed2}
        case fromEndpointsAction.DESTROY_COMMENT:
            return {...state,comment:[],commentHeader:null}
        case fromEndpointsAction.COMMENT_HEADER:
            return {...state,commentHeader:action.payload}
        default:
            return state
    }
}