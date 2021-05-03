import { Component, OnInit } from '@angular/core';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WSService } from 'src/app/ws-service/ws-service';
import { MsgPayload } from 'src/app/models/msgpayload';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private store:Store<fromAppReducer.AppState>, private ws:WSService) { }

  authSubs:Subscription
  postForm:FormGroup

  ngOnInit(): void {

    this.authSubs = this.store.select("auth").subscribe((data)=>{

    })

    this.store.dispatch(new fromEndpointsAction.VerifyToken())

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
  }

}
