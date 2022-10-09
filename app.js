const howManySeen = document.querySelector(".howManySeen");

callApi();
async function callApi() {
  const response = await fetch(`https://ghibliapi.herokuapp.com/films`);
  const data = await response.json();
  console.log(data);
  createCard(data);
  numberMoviesSeen();

  const seenBtn = document.querySelectorAll(".alreadySeen-btn");
  seenBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btnParent = btn.closest(".movie");
      const idMovie = btnParent.getAttribute("data-id");
      saveToLocalStorage(idMovie);
      numberMoviesSeen();
      btnParent.classList.toggle("seen");
      btnParent.classList.contains("seen")
        ? (btn.textContent = "Déjà vue")
        : (btn.textContent = "A voir");

      console.log(idMovie);
    });
  });
}
const movieList = document.querySelector(".container-movies");
const scrollToTop = document.querySelector(".arrowUp");

function createCard(data) {
  let localStorageArray = JSON.parse(localStorage.getItem("movie"));
  if (!localStorageArray) localStorageArray = [];
  console.log(localStorageArray);
  data.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie");
    card.setAttribute("data-id", movie.id);
    if (localStorageArray.includes(movie.id)) {
      card.classList.add("seen");
    }

    const AlreadySeen = document.createElement("div");
    const AlreadySeenBtn = document.createElement("button");
    AlreadySeen.classList.add("alreadySeen-container");
    AlreadySeenBtn.classList.add("alreadySeen-btn");
    AlreadySeenBtn.textContent = localStorageArray.includes(movie.id)
      ? "Déja vue"
      : "A voir";

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

function saveToLocalStorage(id) {
  let IdArrays;
  if (!localStorage.getItem("movie")) {
    IdArrays = [];
  } else {
    IdArrays = JSON.parse(localStorage.getItem("movie"));
  }
  if (IdArrays.includes(id)) {
    const newIdArray = IdArrays.filter((el) => el != id);
    localStorage.setItem("movie", JSON.stringify(newIdArray));
  } else {
    IdArrays.push(id);
    localStorage.setItem("movie", JSON.stringify(IdArrays));
  }
}

function numberMoviesSeen() {
  let howManyInLs = JSON.parse(localStorage.getItem("movie"));
  if (!howManyInLs) {
    howManySeen.textContent = `Film(s) vu(s) : 0`;
  } else {
    howManySeen.textContent = `Film(s) vu(s) : ${howManyInLs.length}`;
  }
}
