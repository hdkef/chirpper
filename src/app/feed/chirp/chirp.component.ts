import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Chirp } from 'src/app/models/chirp';
import * as fromEndpointsAction from '../../redux/actions/endpoints-action'

@Component({
  selector: 'app-chirp',
  templateUrl: './chirp.component.html',
  styleUrls: ['./chirp.component.css']
})
export class ChirpComponent implements OnInit {

  @Input()chirp:Chirp

  constructor(private router:Router, private store:Store) { }

  ngOnInit(): void {
  }

  goToProfile(){
    this.router.navigate([`profile`],{queryParams:{ID:this.chirp.ID}})
  }

  goComment(){
    this.store.dispatch(new fromEndpointsAction.CommentHeader(this.chirp))
    this.router.navigate([`comment`],{queryParams:{PostID:this.chirp.PostID}})
  }

}
