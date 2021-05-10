import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAuthAction from '../actions/auth-action'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { of } from "rxjs";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import * as fromEndpointsAction from '../actions/endpoints-action'

@Injectable()
export class AuthEffect {
    constructor(private actions$:Actions, private http:HttpClient, private router:Router){}

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
                        let Token = data["Token"]
                        let AvatarURL = data["AvatarURL"]
                        let Desc = data["Desc"]
                        this.saveToLocal({ID,Username,Email,Token,AvatarURL,Desc})
                        return new fromAuthAction.LoginSuccess({ID,Username,Email,Token,AvatarURL,Desc})
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

    autoLogin$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromAuthAction.AUTOLOGIN_START),
            switchMap((action:fromAuthAction.AutoLoginStart)=>{
                if(localStorage.getItem("BEARER")){
                    let parsedJSON = JSON.parse(localStorage.getItem("BEARER"))
                    let ID = parsedJSON["ID"]
                    let Username = parsedJSON["Username"]
                    let Email = parsedJSON["Email"]
                    let Token = parsedJSON["Token"]
                    let AvatarURL = parsedJSON["AvatarURL"]
                    let Desc = parsedJSON["Desc"]
                    return of(new fromAuthAction.LoginSuccess({ID,Username,Email,Token,AvatarURL,Desc}))
                }else{
                    return of(new fromAuthAction.SendInfo({Info:""}))
                }
            })
        )
    })

    logoutStart$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromAuthAction.LOGOUT_START),
            switchMap((action:fromAuthAction.LogoutStart)=>{
                this.removeLocal()
                this.router.navigateByUrl('/login')
                return of(new fromAuthAction.SendInfo({Info:"logged out"}))
            })
        )
    })

    loginSuccess$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromAuthAction.LOGIN_SUCCESS),
            switchMap((action:fromAuthAction.LoginSuccess)=>{
                return of(new fromEndpointsAction.InitWS({}))
            })
        )
    })

    settingSuccess$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(fromAuthAction.SETTING_SUCCESS),
            switchMap((action:fromAuthAction.SettingSuccess)=>{
                let ID = action.payload["ID"]
                let Username = action.payload["Username"]
                let Email = action.payload["Email"]
                let Token = action.payload["Token"]
                let AvatarURL = action.payload["AvatarURL"]
                let Desc = action.payload["Desc"]
                this.saveToLocal({ID,Username,Email,Token,AvatarURL,Desc})
                return of(new fromAuthAction.LoginSuccess({ID,Username,Email,Token,AvatarURL,Desc}))
            })
        )
    })

    saveToLocal(payload:{ID,Username,Email,Token,AvatarURL,Desc}){
        localStorage.setItem("BEARER",JSON.stringify(payload))
    }

    removeLocal(){
        localStorage.removeItem("BEARER")
    }

}