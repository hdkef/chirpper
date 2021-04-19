import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { ChirpComponent } from './chirp/chirp.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FeedComponent,
    ChirpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:FeedComponent}
    ]),
    SharedModule
  ],
})
export class FeedModule { }
