import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromAuthAction from '../../redux/actions/auth-action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup

  constructor(private store:Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'Username': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required])
    })
  }

  login(){
    let Username = this.loginForm.value.Username
    let Password = this.loginForm.value.Password
    console.log(JSON.stringify({Username:Username,Password:Password}))
    this.store.dispatch(new fromAuthAction.LoginStart({Username,Password}))
  }

}
