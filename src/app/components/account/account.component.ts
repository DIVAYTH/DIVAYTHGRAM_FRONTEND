import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @ViewChild('textStories') declare element: ElementRef;
  @ViewChild('block') declare block: ElementRef;
  @ViewChild('file') declare fileInput: ElementRef;
  declare avaUrl: any
  declare storiesUrl: any

  declare file: File
  declare ready: boolean

  text: string = ""
  style: string = "Times New Roman, serif"
  color: string = "white"

  infoRequest: string = ""
  colorRequest: string = "red"

  constructor(private loginService: LoginService, @Inject(DOCUMENT) private document: HTMLDocument) {
  }

  ngOnInit(): void {
    this.ready = true
    this.loginService.getInfo().subscribe((res) => {
        this.createImageFromBlob(res)
      }
    )
  }

  setColor(color: string) {
    this.color = color
  }

  createStories() {
    if (!this.ready) {
      const fd = new FormData()
      fd.append("picture", this.file, this.file.name)
      if (this.text == "") {
        this.downloadStories(fd)
      } else {
        fd.append('login', <string>localStorage.getItem('login'))
        fd.append('text', this.text)
        fd.append('color', this.color)
        fd.append('style', this.style)
        const y = this.element.nativeElement.getBoundingClientRect().y - this.block.nativeElement.getBoundingClientRect().y
        const x = this.element.nativeElement.getBoundingClientRect().x - this.block.nativeElement.getBoundingClientRect().x
        const yPercent: string = String(Math.round(y / this.block.nativeElement.getBoundingClientRect().height * 100))
        const xPercent: string = String(Math.round(x / this.block.nativeElement.getBoundingClientRect().width * 100))
        fd.append('y', yPercent + '%')
        fd.append('x', xPercent + '%')
        this.downloadStories(fd)
      }
    } else {
      this.infoRequest = "Picture is not load"
      this.colorRequest = "red"
    }
  }

  downloadStories(fd: FormData) {
    this.loginService.createStories(fd).subscribe(() => {
      this.infoRequest = "Stories add successfully"
      this.colorRequest = "green"
      this.storiesUrl = undefined
      this.text = ""
      this.fileInput.nativeElement.value = ""
    }, () => {
      this.infoRequest = "Error from server"
      this.colorRequest = "red"
    })
  }

  getLogin(): string {
    return <string>localStorage.getItem("login")
  }

  changePhoto(files: any) {
    if (files.length === 0)
      return;
    var reader = new FileReader()
    this.file = <File>files[0]
    reader.readAsDataURL(files[0])
    reader.onload = (_event) => {
      this.storiesUrl = reader.result;
    }
    this.ready = false
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.avaUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
