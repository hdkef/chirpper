import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',loadChildren:()=>{
    return import('./login/login.module').then(m=>{return m.LoginModule})
  }},
  {path:'register',loadChildren:()=>{
    return import('./register/register.module').then(m=>{return m.RegisterModule})
  }},
  {path:'feed',loadChildren:()=>{
    return import('./feed/feed.module').then(m=>{return m.FeedModule})
  }},
  {path:'profile',loadChildren:()=>{
    return import('./profile/profile.module').then(m=>{return m.ProfileModule})
  }},
  {path:'about',loadChildren:()=>{
    return import('./about/about.module').then(m=>{return m.AboutModule})
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
