import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {User} from "../../classes/user";

@Component({
  selector: 'app-modal-autorization',
  templateUrl: './modal-authorization.component.html',
  styleUrls: ['./modal-authorization.component.css']
})
export class ModalAuthorizationComponent implements OnInit {
  declare login: string
  declare password: string

  declare info: string

  validate: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, private dialog: MatDialogRef<ModalAuthorizationComponent>,
              private authService: AuthorizationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  authorization(form: NgForm) {
    if (form.valid) {
      this.authService.authorization(new User(this.login, this.password)).subscribe(() => {
        localStorage.setItem("login", this.login)
        localStorage.setItem("password", this.password)
        window.location.reload()
      }, () => {
        this.info = "Invalid login or password"
      })
    } else {
      this.info = "Invalid forms"
    }
  }
}
