class Comments {
  constructor() {
    this.localStorageKey = "Comments";
    this.localStorageInitialValue = [];
  }

  addComment(newComment) {
    const localStorageComments = localStorage.getItem(this.localStorageKey);

    if (!localStorageComments) {
      newComment.id = 1;
      localStorage.setItem(this.localStorageKey, JSON.stringify([newComment]));
    } else {
      const parsedComments = JSON.parse(localStorageComments);
      const count = parsedComments.length;
      newComment.id = count + 1;
      parsedComments.push(newComment);
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(parsedComments)
      );
    }
  }
  updateComment(updatedComment) {
    const localStorageComments = localStorage.getItem(this.localStorageKey);
    const commentsParsed = JSON.parse(localStorageComments);
    const commentIndex = commentsParsed.findIndex(
      (comment) => comment.id == updatedComment.id
    );
    commentsParsed[commentIndex] = updatedComment;
    localStorage.setItem(this.localStorageKey, JSON.stringify(commentsParsed));
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

  getCommentsByArtwork(id) {
    const localStorageComments = localStorage.getItem(this.localStorageKey);
    const commentsParsed = JSON.parse(localStorageComments);
    let commentsByArtwork = [];
    if (commentsParsed) {
      commentsByArtwork = commentsParsed.filter(
        (comment) => comment.id_artwork == id
      );
    }

    return commentsByArtwork;
  }
}

const commentsService = new Comments();
