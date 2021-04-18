import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { ChirpComponent } from './chirp/chirp.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    FeedComponent,
    ChirpComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:MainComponent}
    ]),
    SharedModule
  ]
})
export class FeedModule { }
