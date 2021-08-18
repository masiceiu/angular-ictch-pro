import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {PlayerRoutingModule} from './player.routing.module';
// Components
import { PlayerComponent } from './player.component';
import { MainComponent } from './main/main.component';
import { VideosListComponent } from './main/videos-list/videos-list.component';
import { VideosPlaylistComponent } from './main/videos-playlist/videos-playlist.component';
import { VideosSearchComponent } from './main/videos-search/videos-search.component';
import { VideoPlayerComponent } from './main/video-player/video-player.component';
// Services
import { YoutubeApiService } from './shared/services/youtube-api.service';
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { PlaylistStoreService } from './shared/services/playlist-store.service';
import { NotificationService } from './shared/services/notification.service';
import { BrowserNotificationService } from './shared/services/browser-notification.service';
// Pipes
import { VideoDurationPipe } from './shared/pipes/video-duration.pipe';
import { VideoLikesPipe } from './shared/pipes/video-likes.pipe';
import { VideoViewsPipe } from './shared/pipes/video-views.pipe';
import { PlaylistItemNamePipe } from './shared/pipes/playlist-item-name.pipe';
import { NowPlayingNamePipe } from './shared/pipes/now-playing-name.pipe';
import { LazyScrollDirective } from './shared/directives/lazy-scroll/lazy-scroll.directive';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    PlayerRoutingModule
  ],
  exports: [
    PlayerComponent
  ],
  declarations: [
    PlayerComponent,
    MainComponent,

    VideosListComponent,
    VideosSearchComponent,
    VideoPlayerComponent,
    VideosPlaylistComponent,

    VideoDurationPipe,
    VideoLikesPipe,
    VideoViewsPipe,
    PlaylistItemNamePipe,
    NowPlayingNamePipe,

    LazyScrollDirective
  ],
  providers: [
    YoutubeApiService,
    YoutubePlayerService,
    PlaylistStoreService,
    NotificationService,
    BrowserNotificationService
  ]
})
export class PlayerModule {
}