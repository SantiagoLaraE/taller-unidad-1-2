window.addEventListener("DOMContentLoaded", navigation);
window.addEventListener("hashchange", navigation);

function navigation() {
  window.scroll(0, 0);
  location.hash.startsWith("#obras-de-arte")
    ? artworksPage()
    : location.hash.startsWith("#obra")
    ? artworkPage()
    : homePage();
}

function homePage() {
  header.classList.add("header--white");
  home.style.display = "block";
  artworks.style.display = "none";
  artworkPreview.style.display = "none";
}

function artworksPage() {
  header.classList.remove("header--white");
  home.style.display = "none";
  artworks.style.display = "block";
  artworkPreview.style.display = "none";
  fetchArtworks(`${URL_API}/artworks?page=1&limit=${pagination.limit}`);
}

function artworkPage() {
  header.classList.remove("header--white");
  home.style.display = "none";
  artworks.style.display = "none";
  artworkPreview.style.display = "block";

  const [, id] = location.hash.split("=");
  fetchArtwork(id);
  getComments(id);
}
