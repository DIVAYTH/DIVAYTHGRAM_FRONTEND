import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalRegistrationComponent} from "../modal-registration/modal-registration.component";
import {ModalAuthorizationComponent} from "../modal-autorization/modal-authorization.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'DIVAYTHGRAM';

  constructor(private dialog: MatDialog, private router: Router) {
  }

  home() {
    this.router.navigate(['/'])
  }

  logout() {
    localStorage.clear()
    this.router.navigate(["/"])
    window.location.reload()
  }

  getUserStatus(): boolean {
    return (localStorage.getItem("login") == null && localStorage.getItem("password") == null);
  }

  navigate() {
    if (this.router.url == '/') {
      this.router.navigate(['/account'])
    } else {
      this.router.navigate(['/'])
    }
  }

  getButton(): string {
    if (this.router.url == '/') {
      return "Account"
    } else {
      return "Back"
    }
  }

  openModalRegistration() {
    this.dialog.open(ModalRegistrationComponent, {
      width: '750px',
      height: '550px',
      panelClass: 'custom-dialog-container',
    })
  }

  openModalAuthorization() {
    this.dialog.open(ModalAuthorizationComponent, {
      width: '750px',
      height: '550px',
      panelClass: 'custom-dialog-container',
    })
  }
}
