import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private hostUrl: string = environment.apiUrl
  private avatarsUrl: string = "/avatars"
  private storiesUrl: string = "/stories"

  constructor(private http: HttpClient) {
  }

  getInfo(): Observable<Blob> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem("login") + ":" + localStorage.getItem("password"))
    });
    return this.http.get(this.hostUrl + this.avatarsUrl + "?login=" + <string>localStorage.getItem("login"), {
      headers,
      responseType: 'blob'
    })
  }

  createStories(fd: FormData) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem("login") + ":" + localStorage.getItem("password"))
    });
    return this.http.post<HttpStatusCode>(this.hostUrl + this.storiesUrl, fd, {headers})
  }
}
