import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NotificationService } from './notification.service';
import { YOUTUBE_API_KEY } from '../constants';

@Injectable()
export class YoutubeApiService {
  base_url = 'https://www.googleapis.com/youtube/v3/';
  max_results = 50;

  public nextToken: string;
  public lastQuery: string;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  searchVideos(query: string): Promise<any> {

    const url = this.base_url + 'search?q=' + query + '&maxResults=' + this.max_results +
      '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';
      /* test-mas results['items'];*/
      console.log(url);
      return Promise.resolve(this.res.items);
      
    return this.http.get(url)
      .map(response => {
        let jsonRes = response;//.json()
        let res = jsonRes['items'];
        this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        let ids = [];
        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError)
  }

  searchNext(): Promise<any> {
    const url = this.base_url + 'search?q=' + this.lastQuery + '&pageToken=' + this.nextToken +
      '&maxResults=' + this.max_results + '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';
      /*mas 
      //return Promise.resolve(res);
      return this.getVideos(['DiBpbVig5iU']);
      */
    return this.http.get(url)
      .map(response => {
        let jsonRes = response;//.json()
        let res = jsonRes['items'];
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError)
      
  }
  getVideos(ids): Promise<any> {
    const url = this.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + this.max_results +
      '&type=video&part=snippet,contentDetails,statistics&key=' + YOUTUBE_API_KEY;

    return this.http.get(url)
      .map(results => {
        return results['items'];//.json()
      })
      .toPromise()
      .catch(this.handleError)
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof HttpResponse) {
      const body = error || '';//.json()
      const err = JSON.stringify(body);// body.error || 
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.log(this.notificationService);
    //this.notificationService.showNotification(errMsg);
    return Promise.reject(errMsg);
  }
  res = {
        "kind": "youtube#searchListResponse",
        "etag": "\"q5k97EMVGxODeKcDgp8gnMu79wM/EkP6ScMYfT4xPyx9BIwzJc1IcsM\"",
        "nextPageToken": "CBQQAA",
        "regionCode": "DE",
        "pageInfo": {
         "totalResults": 1000000,
         "resultsPerPage": 20
        },
        "items": [
         {
          "kind": "youtube#searchResult",
          "etag": "\"q5k97EMVGxODeKcDgp8gnMu79wM/gWwm8abtbKoWg-uMt7NUmwSLzbA\"",
          "id": {
           "kind": "youtube#video",
           "videoId": "iVIjckwltkk"
          },
          "snippet": {
           "publishedAt": "2014-02-25T18:22:56.000Z",
           "channelId": "UChl6CG-V7LgqhfwkvbHH67Q",
           "title": "Kids At The Zoo: Compilation",
           "description": "In this funny animal video, tune in to see an awesome compilation of kids interacting with their favorite animals at the zoo. SUBSCRIBE TO PETSAMI: ...",
           "thumbnails": {
            "default": {
             "url": "https://i.ytimg.com/vi/iVIjckwltkk/default.jpg",
             "width": 120,
             "height": 90
            },
            "medium": {
             "url": "https://i.ytimg.com/vi/iVIjckwltkk/mqdefault.jpg",
             "width": 320,
             "height": 180
            },
            "high": {
             "url": "https://i.ytimg.com/vi/iVIjckwltkk/hqdefault.jpg",
             "width": 480,
             "height": 360
            }
           },
           "channelTitle": "Kyoot Animals",
           "liveBroadcastContent": "none"
          }
         }
        ]
       };
  res1 = {
    "video_results": [
      {
        "position_on_page": 10,
        "title": "BOBA FETT IS OFFICIALLY BACK, CAPTAIN REX ENDING! - Mandalorian S2 EP1 Explained",
        "link": "https://www.youtube.com/watch?v=4uhaMCaZOiY",
        "channel": {
          "name": "Star Wars Comics",
          "link": "https://www.youtube.com/user/BesY24",
          "verified": true,
          "thumbnail": "https://yt3.ggpht.com/a-/AOh14GgRxHciuEwu6q3DqPomfS9wIzQLXyMnnkclUg=s68-c-k-c0x00ffffff-no-rj-mo"
        },
        "published_date": "20 hours ago",
        "views": 82216,
        "length": "11:25",
        "description": "HE IS BACK, The Mandalorian Season 2 Episode 1 Review is here and we talk about no only Baby Yoda and Mando but the ...",
        "extensions": [
          "New"
        ],
        "thumbnail": {
          "static": "https://i.ytimg.com/vi/4uhaMCaZOiY/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDnIbp5F2PGsxHyUC8KlP4Ghm5DFQ",
          "rich": "https://i.ytimg.com/an_webp/4uhaMCaZOiY/mqdefault_6s.webp?du=3000&sqp=CJby9PwF&rs=AOn4CLDY8NHADZolp-fnsv1DCAfuYUA_Eg"
        }
      },
      {
        "position_on_page": 11,
        "title": "2020 Portrayed by Star Wars",
        "link": "https://www.youtube.com/watch?v=L8Sezzl7_zU",
        "channel": {
          "name": "Supercuts Delight",
          "link": "https://www.youtube.com/channel/UCg_s1VNrLoV4cFsH9TKXnuw",
          "thumbnail": "https://yt3.ggpht.com/a-/AOh14GhpsylVb0S_fngM7KPSLXTsrSPIMdLMn3JEyA=s68-c-k-c0x00ffffff-no-rj-mo"
        },
        "published_date": "1 month ago",
        "views": 1488270,
        "length": "7:04",
        "description": "A Parody of Star Wars in which I relate events that have happened in 2020 to scenes and clips from Star Wars. Basically a recap ...",
        "thumbnail": {
          "static": "https://i.ytimg.com/vi/L8Sezzl7_zU/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB1L30hsaHnNpdPrDpEQ31VVwnW4w",
          "rich": "https://i.ytimg.com/an_webp/L8Sezzl7_zU/mqdefault_6s.webp?du=3000&sqp=CMzk9PwF&rs=AOn4CLCOipXxYpZjKuyaNVpBvEToV8tFdQ"
        }
      },
      {
        "position_on_page": 12,
        "title": "STAR WARS THE OLD REPUBLIC Full Movie Cinematic 4K ULTRA HD All Cinematics Trailers",
        "link": "https://www.youtube.com/watch?v=DCboJ2GizmM",
        "channel": {
          "name": "GameClips",
          "link": "https://www.youtube.com/user/MKIceVsFire",
          "thumbnail": "https://yt3.ggpht.com/a-/AOh14GiaoOuDpAhg9nn5u1XnzTWaKzFbKbFvoc7UuA=s68-c-k-c0x00ffffff-no-rj-mo"
        },
        "published_date": "2 months ago",
        "views": 2060231,
        "length": "23:20",
        "description": "STAR WARS THE OLD REPUBLIC Full Movie Cinematic 4K ULTRA HD All Cinematics Trailers Protected by the legendary Jedi ...",
        "extensions": [
          "4K"
        ],
        "thumbnail": {
          "static": "https://i.ytimg.com/vi/DCboJ2GizmM/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDkMCAaUzMhPRBwHP1np7QHGTtOzA",
          "rich": "https://i.ytimg.com/an_webp/DCboJ2GizmM/mqdefault_6s.webp?du=3000&sqp=CJyO9fwF&rs=AOn4CLAnoaxqwOcQPj2L9ehUC87mgASLCA"
        }
      },
      {
        "position_on_page": 13,
        "title": "Every Lightsaber Duel from Star Wars (Episodes 1-6)",
        "link": "https://www.youtube.com/watch?v=esnMDtMysHo",
        "channel": {
          "name": "G",
          "link": "https://www.youtube.com/channel/UC-iQfm48s_9f0-2jz_J5KeA",
          "thumbnail": "https://yt3.ggpht.com/a-/AOh14GjGptRYkEfWpQC1dLh2lqvsngvjkC4HgZJIaQ=s68-c-k-c0x00ffffff-no-rj-mo"
        },
        "published_date": "5 years ago",
        "views": 20950776,
        "length": "22:08",
        "description": "TL;DR - Every lightsaber duel in all first 6 major Star Wars films. YouTube is blocking me from adding EP 7] A long time ago in a ...",
        "thumbnail": {
          "static": "https://i.ytimg.com/vi/esnMDtMysHo/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB7OyomBuarjFzmnhwm47bmZjuhbQ",
          "rich": "https://i.ytimg.com/an_webp/esnMDtMysHo/mqdefault_6s.webp?du=3000&sqp=CMyd9fwF&rs=AOn4CLBKG9h-kgYKl0o9IHHLFdHhNpN52w"
        }
      },
    ],
  };
}
