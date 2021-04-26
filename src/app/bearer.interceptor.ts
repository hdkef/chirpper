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

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
 
    let tokenSaved = localStorage.getItem("BEARER")
    if (!tokenSaved) {
      return next.handle(req)
    }
    else {
      let token = JSON.parse(tokenSaved)["Token"]
      let authorizedReq = req.clone({headers:req.headers.append("BEARER",token)})
      return next.handle(authorizedReq)
    }
  }
}
