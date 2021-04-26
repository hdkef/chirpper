import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorComponent } from './error/error.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAppReducer from './redux/reducers/app-reducer'
import { HttpClientModule } from '@angular/common/http';
import {AuthEffect} from './redux/effects/auth-effect'
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideBarComponent,
    NavbarComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([AuthEffect])
  ],
  providers: [AuthGuard,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
