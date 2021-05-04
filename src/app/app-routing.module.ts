import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { LoginGuard } from './login.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',canActivate:[LoginGuard],loadChildren:()=>{
    return import('./login/login.module').then(m=>{return m.LoginModule})
  }},
  {path:'register',canActivate:[LoginGuard],loadChildren:()=>{
    return import('./register/register.module').then(m=>{return m.RegisterModule})
  }},
  {path:'feed',canActivate:[AuthGuard], component:MainComponent,loadChildren:()=>{
    return import('./feed/feed.module').then(m=>{return m.FeedModule})
  }},
  {path:'profile',canActivate:[AuthGuard],component:MainComponent,loadChildren:()=>{
    return import('./profile/profile.module').then(m=>{return m.ProfileModule})
  }},
  {path:'find',canActivate:[AuthGuard], component:MainComponent,loadChildren:()=>{
    return import('./find/find.module').then(m=>{return m.FindModule})
  }},
  {path:'about',canActivate:[AuthGuard], component:MainComponent,loadChildren:()=>{
    return import('./about/about.module').then(m=>{return m.AboutModule})
  }},
  {path:'settings',canActivate:[AuthGuard], component:MainComponent,loadChildren:()=>{
    return import('./settings/settings.module').then(m=>{return m.SettingsModule})
  }},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
