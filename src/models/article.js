export default class Article {
    constructor(data) {
      this.id = data?.id;
      this.title = data?.title;
      this.desc = data?.desc;
      this.author = data?.author;
      this.imgPath = data?.imgPath;
    }
  }
  