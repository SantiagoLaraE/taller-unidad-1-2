const URL_API = "https://api.artic.edu/api/v1";

async function fetchArtworks() {
  const res = await fetch(`${URL_API}/artworks?limit=50`);
  const data = await res.json();
  createArtworks(data.data);
}

fetchArtworks();

function createArtworks(artworks) {
  const artworksWrapper = document.querySelector(".artworks__wrapper");

  const fragment = new DocumentFragment();
  artworks.forEach((artwork) => {
    const div = document.createElement("div");
    div.classList.add("artwork");
    div.addEventListener("click", () => {
      location.hash = `obra?id=${artwork.id}`;
    });

    const img = document.createElement("img");
    img.classList.add("artwork__img");
    img.setAttribute("alt", artwork.title);
    img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`;

    img.addEventListener("error", () => {
      img.src = "../src/assets/JPG/ImagenNoEncontrada.jpg";
    });

    const title = document.createElement("p");
    title.classList.add("artwork__title");
    title.innerHTML = artwork.title;

    const artist = document.createElement("p");
    artist.classList.add("artwork__artist");
    artist.innerHTML = artwork.artist_title;

    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(artist);

    fragment.appendChild(div);
  });
  artworksWrapper.innerHTML = "";
  artworksWrapper.appendChild(fragment);
}

async function fetchArtwork(id) {
  const res = await fetch(`${URL_API}/artworks/${id}/manifest.json`);
  const data = await res.json();
  createArtworkPreview(data);
}

function createArtworkPreview(artwork) {
  const imgContainer = document.querySelector(".artwork-preview__img");
  imgContainer.style.backgroundImage = `url(${artwork.sequences[0].canvases[0]["@id"]}/full/843,/0/default.jpg)`;

  const img = document.querySelector(".artwork-preview__img img");
  img.src = `${artwork.sequences[0].canvases[0]["@id"]}/full/843,/0/default.jpg`;

  const container = document.querySelector(".artwork-preview__info");
  container.innerHTML = "";
  const fragment = new DocumentFragment();

  const title = document.createElement("h2");
  title.classList.add("artwork-preview__title");
  title.innerHTML = artwork.label;

  const description = document.createElement("p");
  description.classList.add("artwork-preview__description");
  description.innerHTML = artwork.description[0].value;

  const table = document.createElement("table");
  table.classList.add("artwork-preview__data-table");

  artwork.metadata.forEach((data) => {
    const row = table.insertRow();
    const col1 = row.insertCell(0);
    const col2 = row.insertCell(1);
    col1.innerHTML = data.label;
    col2.innerHTML = data.value;
  });

  fragment.appendChild(title);
  if (artwork.description[0].value != "") {
    fragment.appendChild(description);
  }
  fragment.appendChild(table);

  container.appendChild(fragment);
}

function getComments(artworkId) {
  const commentsWrapper = document.querySelector(".comments__wrapper");
  commentsWrapper.innerHTML = "";
  const comments = commentsService.getCommentsByArtwork(artworkId);
  if (!comments.length) {
    commentsWrapper.innerHTML = "<p>No hay comentarios aún</p";
  } else {
    createComments(artworkId, commentsWrapper, comments);
  }
}

function createComments(artworkId, container, comments) {
  const fragment = new DocumentFragment();
  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentIcon = document.createElement("span");
    commentIcon.classList.add("comment__icon");
    commentIcon.innerHTML = '"';

    const commentText = document.createElement("p");
    commentText.classList.add("comment__text");
    commentText.innerHTML = comment.comment;

    const commentUser = document.createElement("span");
    commentUser.classList.add("comment__name");
    commentUser.innerHTML = `${comment.name} ${comment.lastname}`;

    const commentDate = document.createElement("span");
    commentDate.classList.add("comment__date");
    commentDate.innerHTML = comment.publish_date;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("comment__btn-delete");
    deleteBtn.addEventListener("click", () => {
      commentsService.deleteComment(comment.id);
      getComments(artworkId);
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("comment__btn-edit");
    editBtn.addEventListener("click", () => {

    });

    commentDiv.appendChild(editBtn);
    commentDiv.appendChild(deleteBtn);
    commentDiv.appendChild(commentIcon);
    commentDiv.appendChild(commentText);
    commentDiv.appendChild(commentUser);
    commentDiv.appendChild(commentDate);
    fragment.appendChild(commentDiv);
  });

  container.appendChild(fragment);
}

