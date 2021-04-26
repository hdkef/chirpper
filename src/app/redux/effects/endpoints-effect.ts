import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromEndpointsAction from '../actions/endpoints-action'

@Injectable()
export class EndpointsEffect {
    constructor(private actions$:Actions, private http:HttpClient){}

    feedStart$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromEndpointsAction.FEED_START),
            switchMap((action:fromEndpointsAction.FeedStart)=>{
                return this.http.get(`${environment.api}${environment.getfeedroute}`).pipe(
                    map((data)=>{
                        return new fromEndpointsAction.SendInfo({Info:""})
                    }),
                    catchError((err)=>{
                        return of(new fromEndpointsAction.SendInfo({Info:""}))
                    })
                )
            })
        )
    })
}