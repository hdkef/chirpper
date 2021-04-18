import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    ProfileComponent,
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
export class ProfileModule { }
