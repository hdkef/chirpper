import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as fromAuthAction from '../../redux/actions/auth-action';
import * as fromAppReducer from '../../redux/reducers/app-reducer'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup
  verifSent:boolean = false

  constructor(private store:Store<fromAppReducer.AppState>, private http:HttpClient) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'Username':new FormControl(null,[Validators.required]),
      'Password':new FormControl(null,[Validators.required]),
      'Email':new FormControl(null,[Validators.required, Validators.email]),
      'Code':new FormControl(null,[Validators.required]),
    })
  }

  sendCode(){
    this.verifSent = true
    let Email = this.registerForm.value.Email
    return this.http.post(`${environment.api}${environment.sendemailverroute}`,JSON.stringify({Email:Email}))
    .pipe(
      tap((data)=>{
        alert(data["MESSAGE"])
      }),
      catchError((err)=>{
        this.verifSent = false
        return of(this.store.dispatch(new fromAuthAction.SendInfo({Info:"cannot send code"})))
      })
    ).subscribe()
  }

  register(){
    let Username = this.registerForm.value.Username
    let Password = this.registerForm.value.Password
    let Email = this.registerForm.value.Email
    let Code = this.registerForm.value.Code
    return this.http.post(`${environment.api}${environment.verifyemailverroute}`,JSON.stringify({Email:Email,Code:Code}))
    .pipe(tap((data)=>{
      console.log("EMAILVER", data)
      if (data == true){
        this.store.dispatch(new fromAuthAction.RegisterStart({Username,Password,Email}))
      }else{
        return this.store.dispatch(new fromAuthAction.SendInfo({Info:"something wrong with email verification"}))
      }
    })).subscribe()
  }

}
