import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { CommentWS } from "src/app/comment/comment-ws";
import { WSService } from "src/app/ws-service/ws-service";
import { environment } from "src/environments/environment";
import * as fromEndpointsAction from '../actions/endpoints-action'

@Injectable()
export class EndpointsEffect {
    constructor(private actions$:Actions, private http:HttpClient, private ws:WSService, private wsComment:CommentWS){}

    verifyToken$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromEndpointsAction.VERIFY_TOKEN),
            switchMap((action:fromEndpointsAction.VerifyToken)=>{
                return this.http.get(`${environment.api}${environment.verifytokenroute}`).pipe(
                    map((data)=>{
                        return new fromEndpointsAction.SendInfo({Info:"token is valid"})
                    }),
                    catchError((err)=>{
                        return of(new fromEndpointsAction.SendInfo({Info:err.error}))
                    })
                )
            })
        )
    })

    initWS$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromEndpointsAction.INIT_WS),
            tap(()=>{
                this.ws.establishWS()
            }),
            switchMap(()=>{
                return of(new fromEndpointsAction.SendInfo({Info:"websocket established"}))
            }),
        )
    })


    initComment$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromEndpointsAction.INIT_COMMENT),
            tap((action:fromEndpointsAction.InitWS)=>{
                this.wsComment.establishCommentWS(action.payload)
            }),
            switchMap(()=>{
                return of(new fromEndpointsAction.SendInfo({Info:"websocket established"}))
            })
        )
    })

}