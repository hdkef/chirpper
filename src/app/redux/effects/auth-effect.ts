import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAuthAction from '../actions/auth-action'
import { catchError, map, switchMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthEffect {
    constructor(private actions$:Actions, private http:HttpClient){}

    loginStart$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromAuthAction.LOGIN_START),
            switchMap((action:fromAuthAction.LoginStart)=>{
                let payloadJSON = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.loginroute}`,payloadJSON).pipe(
                    map((data)=>{
                        let ID = data["ID"]
                        let Username = data["Username"]
                        let Email = data["Email"]
                        return new fromAuthAction.LoginSuccess({ID,Username,Email})
                    }),
                    catchError((err)=>{
                        let errmsg = err.error
                        return of(new fromAuthAction.SendInfo({Info:errmsg}))
                    })
                )
            })
        )
    })

    registerStart$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromAuthAction.REGISTER_START),
            switchMap((action:fromAuthAction.RegisterStart)=>{
                let payloadJSON = JSON.stringify(action.payload)
                return this.http.post(`${environment.api}${environment.registerroute}`,payloadJSON).pipe(
                    map((data)=>{
                        let msg = data["MESSAGE"]
                        return new fromAuthAction.SendInfo({Info:msg})
                    }),
                    catchError((err)=>{
                        let errmsg = err.error
                        return of(new fromAuthAction.SendInfo({Info:errmsg}))
                    })
                )
            })
        )
    })

}