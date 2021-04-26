import * as fromEndpointsAction from '../actions/endpoints-action'

export interface State {
    feeds:string
}

const initialState:State = {
    feeds:""
}

export function EndpointsReducer(
    state:State = initialState,
    action:fromEndpointsAction.EndpointsActionType
){
    switch(action.type){
        case fromEndpointsAction.FEED_START:
            return state
        default:
            return state
    }
}