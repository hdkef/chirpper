import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuthAction from '../../redux/actions/auth-action';
import * as fromAppReducer from '../../redux/reducers/app-reducer'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup

  constructor(private store:Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'Username':new FormControl(null,[Validators.required]),
      'Password':new FormControl(null,[Validators.required]),
      'Email':new FormControl(null,[Validators.required, Validators.email]),
    })
  }

  register(){
    let Username = this.registerForm.value.Username
    let Password = this.registerForm.value.Password
    let Email = this.registerForm.value.Email
    console.log(JSON.stringify({Username,Password,Email}))
    this.store.dispatch(new fromAuthAction.RegisterStart({Username,Password,Email}))
  }

}
