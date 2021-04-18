import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { ChirpComponent } from './chirp/chirp.component';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'


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
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ]
})
export class FeedModule { }
