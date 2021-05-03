import { Feed } from 'src/app/models/feed'
import * as fromEndpointsAction from '../actions/endpoints-action'

export interface State {
    feed:Feed[],
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
            console.log("reducer many", action.payload)
            let Feed:Feed[] = action.payload.concat(state.feed)
            return {...state,feed:Feed}
        case fromEndpointsAction.APPEND_ONE_FEED:
            console.log("reducer one", action.payload)
            let Feed2:Feed[] = [...state.feed]
            Feed2.unshift(action.payload)
            console.log(Feed2)
            return {...state,feed:Feed2}
        default:
            return state
    }
}