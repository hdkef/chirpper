import { Component, OnInit } from '@angular/core';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private store:Store<fromAppReducer.AppState>) { }

  authSubs:Subscription

  ngOnInit(): void {

    this.authSubs = this.store.select("auth").subscribe((data)=>{

    })

    this.store.dispatch(new fromEndpointsAction.FeedStart())
  }

}
