import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromAppReducer from '../../redux/reducers/app-reducer'
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WSService } from 'src/app/ws-service/ws-service';
import { Chirp } from 'src/app/models/chirp';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {

  constructor(private store:Store<fromAppReducer.AppState>, private ws:WSService, private sanitizer:DomSanitizer) { }
  
  ngOnDestroy(): void {
    if (this.endpointsSubs){
      this.endpointsSubs.unsubscribe()
    }
  }

  endpointsSubs:Subscription
  postForm:FormGroup
  feed:Chirp[]
  fileHolder:File | null
  preview:SafeUrl | null

  ngOnInit(): void {

    this.endpointsSubs = this.store.select("endpoints").subscribe((data)=>{
      this.feed = data["feed"]
    })

    this.store.dispatch(new fromEndpointsAction.VerifyToken({}))
    this.initiatePostForm()
  }

  initiatePostForm(){
    this.postForm = new FormGroup({
      'Text':new FormControl(null,Validators.required),
      'Image':new FormControl(null),
    })
  }

  onFileChange(event){
    if (event.target.files && event.target.files.length) {
      this.fileHolder = event.target.files[0];
      this.preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.fileHolder))
    }
  }

  sendChirp(){
    this.ws.postWithImage(this.postForm.value.Text, this.fileHolder)
    this.postForm.setValue({'Text':null, 'Image':null})
    this.postForm.markAsPristine()
    this.postForm.markAsUntouched()
    this.postForm.controls.Text.setErrors(null)
    this.preview = null
  }

}
