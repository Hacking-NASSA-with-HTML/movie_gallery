import { filmsArray } from "./filmsArray.js";
import { ALL_FILMS } from "./assets/js/constants.js";
import { FAVORITE_FILMS } from "./assets/js/constants.js";
import { fromStorage } from "./assets/js/fromStorage.js";
import { toStorage } from "./assets/js/toStorage.js";
import { renderFilmCard } from "./assets/js/renderFilmCard.js";

if (!fromStorage(ALL_FILMS)) {
    toStorage(ALL_FILMS, filmsArray)
}

renderFilmsList(fromStorage(ALL_FILMS), ALL_FILMS)

const favoriteFilmsButton = document.querySelector('.film-cards-container-favorite-films')
favoriteFilmsButton.addEventListener('click', () => handleFilmListSwitch(favoriteFilmsButton))

function renderFilmsList(filmsList, listType) {
    const favoriteFilmsButton = document.querySelector('.film-cards-container-favorite-films')

    favoriteFilmsButton.insertAdjacentHTML('afterend', `
    <div id='${listType}' class='film-cards-container'></div>
    `)

    const filmsContainerHTML = document.querySelector('.film-cards-container')

    filmsList.forEach((film, i) => renderFilmCard(film, filmsContainerHTML, i))
}

function handleFilmListSwitch(switchButton) {
    const filmsContainerHTML = document.querySelector('.film-cards-container')
    const filmsCardContainerTitle = document.querySelector('.film-cards-container-title')

    const favoriteFilms = fromStorage(ALL_FILMS).filter(({ isFavorite }) => isFavorite)

    switch (filmsContainerHTML.id) {
        case ALL_FILMS:
            filmsCardContainerTitle.innerText = 'Favorite Films'
            switchButton.innerText = 'Click to See All Films'
            filmsContainerHTML.remove()
            renderFilmsList(favoriteFilms, FAVORITE_FILMS)
    }
}