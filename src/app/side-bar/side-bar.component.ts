import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../redux/reducers/app-reducer'
import * as fromAuthAction from '../redux/actions/auth-action'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router:Router, private store:Store<fromAppReducer.AppState>) { }

  authSubs:Subscription
  ID:string
  Username:string
  AvatarURL:string

  ngOnInit(): void {
    let parsedJSON = JSON.parse(localStorage.getItem("BEARER"))
    this.ID = parsedJSON["ID"]
    this.Username = parsedJSON["Username"]
    this.AvatarURL = parsedJSON["AvatarURL"]
  }
  
  goProfile(){
    this.router.navigate([`profile`],{queryParams:{ID:this.ID}})
  }

  logOut(){
    this.store.dispatch(new fromAuthAction.LogoutStart({}))
  }

}
