import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChirpComponent } from './chirp/chirp.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ChirpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ProfileComponent}
    ]),
    SharedModule
  ],
})
export class ProfileModule { }