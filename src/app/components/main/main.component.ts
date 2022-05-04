import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AvaOfUser} from "../../classes/user-ava";
import {MainService} from "../../services/main.service";
import {StoriesResponse} from "../../classes/StoriesResponse";
import {StoriesLikeDislike} from "../../classes/stories-like-dislike";
import {StoriesEmoji} from "../../classes/stories-emoji";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {
  @ViewChild('listStories') declare sCont: ElementRef;
  @ViewChild('list') declare hScroll: ElementRef;
  @ViewChild('img') declare img: ElementRef;
  @ViewChild('text') declare text: ElementRef;
  declare storiesLikeDislike: StoriesLikeDislike[]
  declare users: Array<AvaOfUser>
  declare stories: Array<StoriesResponse>

  currentScrollPosition = 0;
  scrollAmount = 320;

  index: number = 0

  constructor(private mainService: MainService) {
  }

  scroll(val: number) {
    this.currentScrollPosition += (val * this.scrollAmount)
    if (this.currentScrollPosition < 0) {
      this.currentScrollPosition = 0
    } else if (this.sCont.nativeElement.offsetWidth < this.hScroll.nativeElement.offsetWidth) {
      this.currentScrollPosition = 0
    } else if (this.currentScrollPosition > this.sCont.nativeElement.offsetWidth - this.hScroll.nativeElement.offsetWidth) {
      this.currentScrollPosition = this.sCont.nativeElement.offsetWidth - this.hScroll.nativeElement.offsetWidth
    }
    this.sCont.nativeElement.style.left = -this.currentScrollPosition + "px"
  }

  ngOnInit(): void {
    this.getUsers()
    if (localStorage.getItem('login') != null && localStorage.getItem('password') != null) {
      this.getLikeDislike()
    }
  }

  getLikeDislike() {
    this.mainService.getLikeDislike().subscribe((res) => {
      this.storiesLikeDislike = res
    })
  }

  checkLike(): string {
    if (localStorage.getItem('login') == null && localStorage.getItem('password') == null) {
      return "assets/likeFalse.png"
    } else {
      let val = this.storiesLikeDislike.find(el => el.Id == this.stories[this.index].Id)
      if (val == undefined) {
        return "assets/likeFalse.png"
      } else {
        if (val.Like) {
          return "assets/likeTrue.png"
        } else {
          return "assets/likeFalse.png"
        }
      }
    }
  }

  checkDislike(): string {
    if (localStorage.getItem('login') == null && localStorage.getItem('password') == null) {
      return "assets/dislikeFalse.png"
    } else {
      let val = this.storiesLikeDislike.find(el => el.Id == this.stories[this.index].Id)
      if (val == undefined) {
        return "assets/dislikeFalse.png"
      } else {
        if (val.Dislike) {
          return "assets/dislikeTrue.png"
        } else {
          return "assets/dislikeFalse.png"
        }
      }
    }
  }

  setLikeOrDislike(like: boolean, dislike: boolean) {
    this.mainService.setLikeOrDislike(new StoriesLikeDislike(this.stories[this.index].Id, <string>localStorage.getItem("login"),
      like, dislike)).subscribe(() => {
      if (like) {
        this.stories[this.index].Like++
      } else {
        this.stories[this.index].Dislike++
      }
      this.getLikeDislike()
    })
  }

  setEmoji(emojiHaha: boolean, emojiZzz: boolean, emojiWho: boolean, emojiRvota: boolean) {
    this.mainService.setEmoji(new StoriesEmoji(this.stories[this.index].Id, <string>localStorage.getItem("login"), emojiHaha,
      emojiZzz, emojiWho, emojiRvota)).subscribe(() => {
      if (emojiHaha) {
        this.stories[this.index].EmojiHaha++
      }
      if (emojiZzz) {
        this.stories[this.index].EmojiZzz++
      }
      if (emojiWho) {
        this.stories[this.index].EmojiWho++
      }
      if (emojiRvota) {
        this.stories[this.index].EmojiRvota++
      }
    })
  }

  getUsers() {
    this.mainService.getUsers().subscribe((res) => {
      this.users = res
    })
  }

  getStories(login: string) {
    this.mainService.getStories(login).subscribe((res) => {
      this.stories = res
      this.stories.sort(function (a, b) {
        if (a.Id > b.Id) {
          return 1;
        }
        if (a.Id < b.Id) {
          return -1;
        }
        return 0;
      })
      this.index = 0
    })
  }

  animationOpacity = [
    {opacity: '0'},
    {opacity: '1'}
  ];

  animationTransform = [
    {transform: 'rotate(0deg)'},
    {transform: 'rotate(360deg)'}
  ]

  animationTiming = {
    duration: 1000,
    iterations: 1,
  }


  animation() {
    this.img.nativeElement.animate(this.animationOpacity, this.animationTiming)
    this.text.nativeElement.animate(this.animationTransform, this.animationTiming)
  }

  swapRight() {
    if (this.index < this.stories.length - 1) {
      this.index++
      this.animation()
    }
  }

  swapLeft() {
    if (this.index != 0) {
      this.index--
      this.animation()
    }
  }
}
