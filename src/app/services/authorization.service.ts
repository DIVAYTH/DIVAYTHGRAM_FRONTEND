import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {User} from "../classes/user";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private hostUrl: string = environment.apiUrl
  private authorizationUrl: string = "/authorization"
  private registrationUrl: string = "/users"

  constructor(private http: HttpClient) {
  }

  registration(fd: FormData) {
    return this.http.post<HttpStatusCode>(this.hostUrl + this.registrationUrl, fd)
  }

  authorization(user: User) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user.login + ":" + user.password)
    });
    return this.http.get<HttpStatusCode>(this.hostUrl + this.authorizationUrl, {headers})
  }
}
