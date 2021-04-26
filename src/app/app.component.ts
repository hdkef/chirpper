import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from './redux/reducers/app-reducer'
import * as fromAuthAction from './redux/actions/auth-action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chirpper';

  constructor(private store:Store<fromAppReducer.AppState>){}

  ngOnInit(): void {
    console.log("appcomponent on init")
    this.store.dispatch(new fromAuthAction.AutoLoginStart)
  }
}
