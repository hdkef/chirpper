import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromAppReducer from './redux/reducers/app-reducer'
import * as fromAuthAction from './redux/actions/auth-action'
import { Store } from '@ngrx/store';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(private store:Store<fromAppReducer.AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if (error.headers.get("CLEARBEARER")){
          this.store.dispatch(new fromAuthAction.LogoutStart({}))
        }
        return throwError(error)
      })
    )
  }
}
