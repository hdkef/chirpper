import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WSService } from 'src/app/ws-service/ws-service';
import { MsgPayload } from 'src/app/models/msgpayload';
import { Chirp } from 'src/app/models/chirp';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {

  constructor(private store:Store<fromAppReducer.AppState>, private ws:WSService) { }
  
  ngOnDestroy(): void {
    if (this.endpointsSubs){
      this.endpointsSubs.unsubscribe()
    }
  }

  endpointsSubs:Subscription
  postForm:FormGroup
  feed:Chirp[]

  ngOnInit(): void {

    this.endpointsSubs = this.store.select("endpoints").subscribe((data)=>{
      this.feed = data["feed"]
    })

    this.store.dispatch(new fromEndpointsAction.VerifyToken({}))
    this.initiatePostForm()
  }

  initiatePostForm(){
    this.postForm = new FormGroup({
      'Text':new FormControl(null,Validators.required)
    })
  }

  sendChirp(){
    let Text = this.postForm.value.Text
    let payloadToBeSent = {
      Type:"postFromClient",
      ImageURL:null,
      Text:Text,
    }
    this.ws.sendMsgPayload(payloadToBeSent)
    this.postForm.setValue({'Text':null})
    this.postForm.markAsPristine()
    this.postForm.markAsUntouched()
    this.postForm.controls.Text.setErrors(null)
  }

}
