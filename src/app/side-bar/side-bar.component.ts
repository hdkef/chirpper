import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../redux/reducers/app-reducer'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  authSubs:Subscription
  Username:string
  AvatarURL:string

  ngOnInit(): void {
    let parsedJSON = JSON.parse(localStorage.getItem("BEARER"))
    this.Username = parsedJSON["Username"]
    this.AvatarURL = parsedJSON["AvatarURL"]
  }

  logOut(){
    alert("logged out")
  }

}
