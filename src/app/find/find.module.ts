import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindComponent } from './find/find.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';
import { FindService } from './find-service';



@NgModule({
  declarations: [
    FindComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:FindComponent}
    ]),
    SharedModule
  ],
  providers:[FindService]
})
export class FindModule { }
