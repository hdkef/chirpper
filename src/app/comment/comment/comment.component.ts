import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'
import { ActivatedRoute } from '@angular/router';
import { Chirp } from 'src/app/models/chirp';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentWS } from '../comment-ws';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  constructor(private store:Store<fromAppReducer.AppState>,private route:ActivatedRoute, private wscomment:CommentWS) { }
  
  ngOnDestroy(): void {
    if (this.commentSubs){
      this.commentSubs.unsubscribe()
    }
    this.store.dispatch(new fromEndpointsAction.DestroyComment({}))
  }

  PostID:string
  comment:Chirp[]
  commentSubs:Subscription
  commentHeader:Chirp
  commentForm:FormGroup

  ngOnInit(): void {
    this.commentSubs = this.store.select("endpoints").subscribe((data)=>{
      this.commentHeader = data["commentHeader"]
      this.comment = data["comment"]
    })
    this.PostID = this.route.snapshot.queryParamMap.get("PostID")
    this.store.dispatch(new fromEndpointsAction.InitComment(this.PostID))
    this.commentForm = new FormGroup({
      'Text':new FormControl(null,Validators.required)
    })
  }

  sendComment(){
    this.wscomment.sendMsgPayload(this.commentForm.value.Text)
    this.commentForm.setValue({'Text':null})
    this.commentForm.markAsPristine()
    this.commentForm.markAsUntouched()
    this.commentForm.controls.Text.setErrors(null)
  }

}
