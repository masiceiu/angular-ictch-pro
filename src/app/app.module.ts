import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayerModule } from './player/player.module';
import {AppRoutingModule} from './app.routing.module';
// Components
import { AppComponent } from './app.component';
// Services
// Pipes

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PlayerModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [

  ]
})
export class AppModule {
}
