import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'main-list',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class MainComponent implements AfterViewInit {
  public videoList = [];
  public videoPlaylist = [];
  public loadingInProgress = false;
  public playlistToggle = false;
  public playlistNames = false;
  public repeat = false;
  public shuffle = false;
  public playlistElement: any;
  private pageLoadingFinished = false;

  constructor(
  ) {
  }

  ngAfterViewInit() {
    this.playlistElement = document.getElementById('playlist');
  }

  playFirstInPlaylist(): void {
    if (this.videoPlaylist[0]) {
      this.playlistElement.scrollTop = 0;
    }
  }

  handleSearchVideo(videos: Array<any>): void {
    this.videoList = videos;
  }

  checkAddToPlaylist(video: any): void {
    if (!this.videoPlaylist.some((e) => e.id === video.id)) {
      this.videoPlaylist.push(video);

      let inPlaylist = this.videoPlaylist.length - 1;

      setTimeout(() => {
        let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
        this.playlistElement.scrollTop = topPos - 100;
      });
    }
  }

  repeatActive(val: boolean): void {
    this.repeat = val;
    this.shuffle = false;
  }

  shuffleActive(val: boolean): void {
    this.shuffle = val;
    this.repeat = false;
  }

  togglePlaylist(): void {
    this.playlistToggle = !this.playlistToggle;
    setTimeout(() => {
      this.playlistNames = !this.playlistNames;
    }, 200);
  }

  searchMore(): void {
    if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) {
      return;
    }
  }

  nextVideo(): void {
    this.playPrevNext(true);
  }

  prevVideo(): void {
    this.playPrevNext(false);
  }

  playPrevNext(value): void {
    let current = '';
    //let current = this.youtubePlayer.getCurrentVideo();
    let inPlaylist;

    this.videoPlaylist.forEach((video, index) => {
      if (video.id === current) {
        inPlaylist = index;
      }
    });

    // if-else hell
    if (inPlaylist !== undefined) {
      let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
      if (this.shuffle) {
        let shuffled = {id:'',snippet:{title:''}};
        this.playlistElement.scrollTop = document.getElementById(shuffled.id).offsetTop - 100;
      } else {
        if (value) {
          if (this.videoPlaylist.length - 1 === inPlaylist) {
            this.playlistElement.scrollTop = 0;
          } else {
            this.playlistElement.scrollTop = topPos - 100;
          }
        } else {
          if (inPlaylist === 0) {
            this.playlistElement.scrollTop = this.playlistElement.offsetHeight;
          } else {
            this.playlistElement.scrollTop = topPos - 230;
          }
        }
      }
    } else {
      this.playFirstInPlaylist();
    }
  }

  closePlaylist(): void {
    this.playlistToggle = false;
    this.playlistNames = false;
  }

  clearPlaylist(): void {
    this.videoPlaylist = [];
  }

  exportPlaylist(): void {
    if (this.videoPlaylist.length < 1) {
      return;
    }
    let data = JSON.stringify(this.videoPlaylist);
    let a = document.createElement('a');
    let file = new Blob([data], { type: 'text/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'playlist.json';
    a.click();
  }

  importPlaylist(playlist: any): void {
    this.videoPlaylist = playlist;
  }
}
