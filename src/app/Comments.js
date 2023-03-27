class Comments {
  constructor() {
    this.localStorageKey = "Comments";
    this.localStorageInitialValue = [];
  }

  addComment(objectComment) {
    const localStorageComments = localStorage.getItem(this.localStorageKey);

    if (!localStorageComments) {
      objectComment.id = 1;
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify([objectComment])
      );
    } else {
      const parsedComments = JSON.parse(localStorageComments);
      const count = parsedComments.length;
      objectComment.id = count + 1;
      parsedComments.push(objectComment);
      console.log(parsedComments);
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(parsedComments)
      );
    }
  }

  deleteComment(id) {
    const localStorageComments = localStorage.getItem(this.localStorageKey);
    const commentsParsed = JSON.parse(localStorageComments);
    const commentIndex = commentsParsed.findIndex(
      (comment) => comment.id == id
    );
    commentsParsed.splice(commentIndex, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(commentsParsed));
  }

  getCommentsByArtwork(id){
    const localStorageComments = localStorage.getItem(this.localStorageKey);
    const commentsParsed = JSON.parse(localStorageComments);
    let commentsByArtwork = [];
    if(!commentsParsed.length){
      commentsByArtwork = commentsParsed.filter(comment => comment.id_artwork == id);
    }

    return commentsByArtwork;
  }

}

const commentsService = new Comments();
