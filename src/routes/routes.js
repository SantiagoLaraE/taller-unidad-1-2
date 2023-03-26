window.addEventListener("DOMContentLoaded", navigation);
window.addEventListener("hashchange", navigation);

function navigation() {
  location.hash.startsWith("#obras-de-arte")
    ? artworksPage()
    : location.hash.startsWith("#obra")
    ? artworkPage()
    : location.hash.startsWith("#registrate")
    ? registerPage()
    : homePage();
}

function homePage() {
  header.classList.add("header--white");
  home.style.display = "block";
  artworks.style.display = "none";
  oneArtwork.style.display = "none";
  register.style.display = "none";
}

function artworksPage() {
  header.classList.remove("header--white");
  home.style.display = "none";
  artworks.style.display = "block";
  oneArtwork.style.display = "none";
  register.style.display = "none";
}

function artworkPage() {
  header.classList.remove("header--white");
  home.style.display = "none";
  artworks.style.display = "none";
  oneArtwork.style.display = "block";
  register.style.display = "none";
  
  const [, id] = location.hash.split("=");
  console.log(id);
}

function registerPage() {
  header.classList.remove("header--white");
  home.style.display = "none";
  artworks.style.display = "none";
  oneArtwork.style.display = "none";
  register.style.display = "block";
}
