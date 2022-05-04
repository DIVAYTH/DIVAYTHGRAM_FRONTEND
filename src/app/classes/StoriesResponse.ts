export class StoriesResponse {
  Id: number
  Story: any
  Like: number
  Dislike: number
  EmojiHaha: number
  EmojiZzz: number
  EmojiWho: number
  EmojiRvota: number
  Text: string
  Y: string
  X: string
  Color: string
  Style: string

  constructor(Id: number, Story: any, Like: number, Dislike: number, EmojiHaha: number, EmojiZzz: number, EmojiWho: number, EmojiRvota: number, Text: string, Y: string, X: string, Color: string, Style: string) {
    this.Id = Id;
    this.Story = Story;
    this.Like = Like;
    this.Dislike = Dislike;
    this.EmojiHaha = EmojiHaha;
    this.EmojiZzz = EmojiZzz;
    this.EmojiWho = EmojiWho;
    this.EmojiRvota = EmojiRvota;
    this.Text = Text;
    this.Y = Y;
    this.X = X;
    this.Color = Color;
    this.Style = Style;
  }
}

