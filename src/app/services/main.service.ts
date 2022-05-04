import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {AvaOfUser} from "../classes/user-ava";
import {StoriesResponse} from "../classes/StoriesResponse";
import {StoriesLikeDislike} from "../classes/stories-like-dislike";
import {StoriesEmoji} from "../classes/stories-emoji";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private hostUrl: string = environment.apiUrl
  private usersUrl: string = "/users"
  private storiesUrl: string = "/stories"
  private emojisUrl: string = "/emojis"
  private likeDislikesUrl: string = "/likesDislikes"
  private likeDislikeUrl: string = "/likesDislike"

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<Array<AvaOfUser>>(this.hostUrl + this.usersUrl)
  }

  getStories(login: string) {
    return this.http.get<Array<StoriesResponse>>(this.hostUrl + this.storiesUrl + '?login=' + login)
  }

  setLikeOrDislike(storiesStatus: StoriesLikeDislike) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem("login") + ":" + localStorage.getItem("password"))
    });
    return this.http.post<HttpStatusCode>(this.hostUrl + this.likeDislikeUrl, storiesStatus, {headers})
  }

  setEmoji(storiesEmoji: StoriesEmoji) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem("login") + ":" + localStorage.getItem("password"))
    });
    return this.http.post<HttpStatusCode>(this.hostUrl + this.emojisUrl, storiesEmoji, {headers})
  }

  getLikeDislike() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem("login") + ":" + localStorage.getItem("password"))
    });
    return this.http.get<Array<StoriesLikeDislike>>(this.hostUrl + this.likeDislikesUrl, {headers})
  }
}
