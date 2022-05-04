export class StoriesLikeDislike {
  Id: number
  Login: string
  Like: boolean
  Dislike: boolean

  constructor(Id: number, Login: string, Like: boolean, Dislike: boolean) {
    this.Id = Id;
    this.Login = Login;
    this.Like = Like;
    this.Dislike = Dislike;
  }
}
