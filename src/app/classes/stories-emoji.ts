export class StoriesEmoji {
  Id:number
  Login:string
  EmojiHaha:boolean
  EmojiZzz:boolean
  EmojiWho:boolean
  EmojiRvota:boolean

  constructor(Id: number, Login: string, EmojiHaha: boolean, EmojiZzz: boolean, EmojiWho: boolean, EmojiRvota: boolean) {
    this.Id = Id;
    this.Login = Login;
    this.EmojiHaha = EmojiHaha;
    this.EmojiZzz = EmojiZzz;
    this.EmojiWho = EmojiWho;
    this.EmojiRvota = EmojiRvota;
  }
}
