import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { ChirpComponent } from './chirp/chirp.component';
import { SharedModule } from '../shared/shared.module';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'


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
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
})
export class FeedModule { }
