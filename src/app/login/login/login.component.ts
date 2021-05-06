import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromAuthAction from '../../redux/actions/auth-action'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup

  constructor(private store:Store<fromAppReducer.AppState>, private router:Router) { }
  
  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  authSubs:Subscription

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'Username': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required])
    })
    this.authSubs = this.store.select("auth").subscribe((auth)=>{
      if (auth["ID"] != ""){
        this.router.navigateByUrl("/feed")
      }
    })
  }

  login(){
    let Username = this.loginForm.value.Username
    let Password = this.loginForm.value.Password
    this.store.dispatch(new fromAuthAction.LoginStart({Username,Password}))
  }

}
