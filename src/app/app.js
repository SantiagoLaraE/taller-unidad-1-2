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

  console.log(artworks);
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

//Funcionamiento Menu Mobile

const btnsMenuToggle = document.querySelectorAll(".header__menu-toggle");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__menu ul li a");
const closeMenu = () => {
  menu.classList.remove("opened");
};
const openMenu = () => {
  menu.classList.add("opened");
};

const toggleMenu = () => {
  if (menu.classList.contains("opened")) {
    closeMenu();
  } else {
    openMenu();
  }
};

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

btnsMenuToggle.forEach((btn) => btn.addEventListener("click", toggleMenu));
