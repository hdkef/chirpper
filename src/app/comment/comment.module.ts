import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { ChirpComponent } from './chirp/chirp.component';
import { CommentWS } from './comment-ws';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CommentComponent,
    ChirpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:CommentComponent}
    ]),
    SharedModule
  ]
})
export class CommentModule { }
