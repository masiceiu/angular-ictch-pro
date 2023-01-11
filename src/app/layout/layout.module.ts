import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule} from './layout.routing.module';
// Components
import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';

import { VideosListComponent } from './main/videos-list/videos-list.component';
import { VideosSearchComponent } from './main/videos-search/videos-search.component';
import { VideosPlaylistComponent } from './main/videos-playlist/videos-playlist.component';
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
    LayoutComponent,
    MainComponent,
    VideosListComponent,
    VideosSearchComponent,
    VideosPlaylistComponent,
  ],
  providers: [
  ]
})
export class LayoutModule {
}