import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorizationService} from "../../services/authorization.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-modal-registration',
  templateUrl: './modal-registration.component.html',
  styleUrls: ['./modal-registration.component.css']
})
export class ModalRegistrationComponent {
  declare login: string
  declare password: string
  declare imgURL: any
  declare file: File
  declare color: string

  info: string = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, private dialog: MatDialogRef<ModalRegistrationComponent>,
              private authService: AuthorizationService) {
  }

  changePhoto(files: any) {
    if (files.length === 0)
      return;
    var reader = new FileReader()
    this.file = <File>files[0]
    reader.readAsDataURL(files[0])
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  registration(form: NgForm) {
    if (form.valid) {
      let fd = new FormData()
      fd.append("ava", this.file, this.file.name)
      fd.append("login", this.login)
      fd.append("password", this.password)
      this.authService.registration(fd).subscribe(() => {
        this.info = "Successfully"
        this.color = "green"
        window.location.reload()
      }, () => {
        this.info = "This user already exits"
        this.color = "red"
      })
    } else {
      this.info = "Invalid forms"
      this.color = "red"
    }
  }
}
