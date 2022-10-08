const movieList = document.querySelector(".container-movies");
const scrollToTop = document.querySelector(".arrowUp");
async function callApi() {
  const response = await fetch(`https://ghibliapi.herokuapp.com/films`);
  const data = await response.json();
  console.log(data);
  createCard(data);
}
callApi();

function createCard(data) {
  data.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie");
    card.setAttribute("data-id", movie.id);

    const AlreadySeen = document.createElement("div");
    const AlreadySeenBtn = document.createElement("button");
    AlreadySeen.classList.add("alreadySeen-container");
    AlreadySeenBtn.classList.add("alreadySeen-btn");
    AlreadySeenBtn.textContent = "Déjà vue";

    const containerTitle = document.createElement("div");
    containerTitle.classList.add("container-title");

    const titleMovie = document.createElement("h3");
    titleMovie.classList.add("title-movie");
    titleMovie.textContent = `${movie.title}`;

    const imgMovie = document.createElement("img");
    imgMovie.setAttribute("src", `${movie.image}`);
    imgMovie.setAttribute("alt", `Affiche du film ${movie.title}`);
    imgMovie.classList.add("imgMovie");

    containerTitle.appendChild(titleMovie);
    AlreadySeen.appendChild(AlreadySeenBtn);
    card.appendChild(AlreadySeen);
    card.appendChild(containerTitle);
    card.appendChild(imgMovie);
    movieList.appendChild(card);
  });
}

scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* const observer = new IntersectionObserver(showArrow, {
  rootMargin: "50%",
});
observer.observe(document.querySelector(".container-movies :nth-child(5)"));
function showArrow() {}
 */
