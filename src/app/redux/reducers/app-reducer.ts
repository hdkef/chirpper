import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../reducers/auth-reducer"
import * as fromEndpoints from "../reducers/endpoints-reducer"

export interface AppState {
    auth:fromAuth.State,
    endpoints:fromEndpoints.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth:fromAuth.authReducer,
    endpoints:fromEndpoints.EndpointsReducer,
}