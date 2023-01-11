import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule} from './layout.routing.module';
// Components
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutRoutingModule
  ],
  exports: [
    LayoutComponent
  ],
  declarations: [
    LayoutComponent
  ],
  providers: [
  ]
})
export class LayoutModule {
}