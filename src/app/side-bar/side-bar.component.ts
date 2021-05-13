import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SideBarComponent implements OnInit, OnDestroy {

  constructor(private router:Router, private store:Store<fromAppReducer.AppState>) { }
  
  ngOnDestroy(): void {
    if (this.authSubs){
      this.authSubs.unsubscribe()
    }
  }

  authSubs:Subscription
  ID:string
  Username:string
  AvatarURL:string

  ngOnInit(): void {
    // let parsedJSON = JSON.parse(localStorage.getItem("BEARER"))
    // this.ID = parsedJSON["ID"]
    // this.Username = parsedJSON["Username"]
    // this.AvatarURL = parsedJSON["AvatarURL"]
    this.authSubs = this.store.select("auth").subscribe((auth)=>{
      // console.log(auth)
      if (auth["AvatarURL"]){
        this.AvatarURL = auth["AvatarURL"]
      }
      if (auth["ID"]){
        this.ID = auth["ID"]
      }
      if (auth["Username"]){
        this.Username = auth["Username"]
      }
    })
  }
  
  goProfile(){
    this.router.navigate([`profile`],{queryParams:{ID:this.ID}})
  }

  logOut(){
    this.store.dispatch(new fromAuthAction.LogoutStart({}))
  }

}
