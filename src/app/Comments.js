class Comments {
  constructor() {
    this.localStorageKey = "Comments";
    this.localStorageInitialValue = [];
  }

  getParsedCommentsLS() {
    const localStorageComments = localStorage.getItem(this.localStorageKey);

    if (!localStorageComments) {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.localStorageInitialValue)
      );
      return this.localStorageInitialValue;
    } else {
      return JSON.parse(localStorageComments);
    }
  }

  createCommentId(commentsArr) {
    const biggestId = commentsArr.map(c => parseInt(c.id)).reduce(
      (a, b) => (a > b ? a : b),
      0
    );
    return biggestId + 1;
  }

  addComment(newComment) {
    const parsedComments = this.getParsedCommentsLS();

    newComment.id = this.createCommentId(parsedComments);

    parsedComments.push(newComment);
    localStorage.setItem(this.localStorageKey, JSON.stringify(parsedComments));
  }

  updateComment(updatedComment) {
    const parsedComments = this.getParsedCommentsLS();

    const commentIndex = parsedComments.findIndex(
      (comment) => comment.id == updatedComment.id
    );

    parsedComments[commentIndex] = updatedComment;
    localStorage.setItem(this.localStorageKey, JSON.stringify(parsedComments));
  }

  deleteComment(id) {
    const parsedComments = this.getParsedCommentsLS();
    const commentIndex = parsedComments.findIndex(
      (comment) => comment.id == id
    );
    parsedComments.splice(commentIndex, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(parsedComments));
  }

  getCommentsByArtwork(id) {
    const parsedComments = this.getParsedCommentsLS();
    let commentsByArtwork = [];

    if (parsedComments) {
      commentsByArtwork = parsedComments.filter(
        (comment) => comment.id_artwork == id
      );
    }

    return commentsByArtwork;
  }
}

const commentsService = new Comments();
