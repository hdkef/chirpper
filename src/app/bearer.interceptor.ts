import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as fromAppReducer from './redux/reducers/app-reducer'
import { select, Store } from '@ngrx/store';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(private store:Store<fromAppReducer.AppState>) { }

  addToken(req:HttpRequest<any>): Observable<HttpRequest<any>>{
    return this.store.pipe(
      select("auth"),
      first(),
      mergeMap((state,_)=>{
        if (state.Token != ""){
          let token = state.Token
          let authorizedReq = req.clone({headers:req.headers.append("BEARER",token)})
          return of(authorizedReq)
        }
        else{of(req)}
      })
    )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    let tokenGet = JSON.parse(localStorage.getItem("userData"))
    if (tokenGet == null) {
      return next.handle(req)
    }
    else {
      let tokenHead = `bearer ${tokenGet["Token"]}`
      let authorizedReq = req.clone({headers:req.headers.append("Auth",tokenHead)})
      return next.handle(authorizedReq)
    }
  }
}
