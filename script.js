import { filmsArray } from "./filmsArray.js";
import { ALL_FILMS } from "./assets/js/constants.js";
import { fromStorage } from "./assets/js/fromStorage.js";
import { toStorage } from "./assets/js/toStorage.js";
import { renderFilmCard } from "./assets/js/renderFilmCard.js";

if (!fromStorage(ALL_FILMS)) {
    toStorage(ALL_FILMS, filmsArray)
}

renderFilmsList(fromStorage(ALL_FILMS), ALL_FILMS)

function renderFilmsList(filmsList, listType) {
    const favoriteFilmsButton = document.querySelector('.film-cards-container-favorite-films')

    favoriteFilmsButton.insertAdjacentHTML('afterend', `
    <div id='${listType}' class='film-cards-container'></div>
    `)

    const filmsContainerHTML = document.querySelector('.film-cards-container')

    filmsList.forEach((film, i) => renderFilmCard(film, filmsContainerHTML, i))
}