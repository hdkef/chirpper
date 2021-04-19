import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',loadChildren:()=>{
    return import('./login/login.module').then(m=>{return m.LoginModule})
  }},
  {path:'register',loadChildren:()=>{
    return import('./register/register.module').then(m=>{return m.RegisterModule})
  }},
  {path:'feed', component:MainComponent,loadChildren:()=>{
    return import('./feed/feed.module').then(m=>{return m.FeedModule})
  }},
  {path:'profile', component:MainComponent,loadChildren:()=>{
    return import('./profile/profile.module').then(m=>{return m.ProfileModule})
  }},
  {path:'find', component:MainComponent,loadChildren:()=>{
    return import('./find/find.module').then(m=>{return m.FindModule})
  }},
  {path:'about', component:MainComponent,loadChildren:()=>{
    return import('./about/about.module').then(m=>{return m.AboutModule})
  }},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
