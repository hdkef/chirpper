import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'
import { ActivatedRoute } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private store:Store<fromAppReducer.AppState>,private route:ActivatedRoute) { }

  PostID:string
  comment:Chirp[]
  commentSubs:Subscription

  ngOnInit(): void {
    this.commentSubs = this.store.select("endpoints").subscribe((data)=>{
      this.comment = data["comment"]
    })
    this.PostID = this.route.snapshot.queryParamMap.get("PostID")
    this.store.dispatch(new fromEndpointsAction.InitComment(this.PostID))
  }

}
