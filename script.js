import { filmsArray } from "./filmsArray.js";
import { ALL_FILMS } from "./assets/js/constants.js";
import { FAVORITE_FILMS } from "./assets/js/constants.js";
import { fromStorage } from "./assets/js/fromStorage.js";
import { toStorage } from "./assets/js/toStorage.js";
import { renderFilmCard } from "./assets/js/renderFilmCard.js";
import { sortAllFilmsByIsFavorite } from "./assets/js/sortAllFilmsByIsFavorite.js";
import { sortFavoriteFilms } from "./assets/js/sortFavoriteFilms.js";
import { renderFilmModal } from "./assets/js/renderFilmModal.js";

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

    if (filmsList.length) {
        filmsList.forEach((film, i) => renderFilmCard(film, filmsContainerHTML, i))
    } else {
        filmsContainerHTML.innerHTML = `<div class='film-card-year'>Films list is empty! Add movie</div>`
    }

    // Listener for add/remove movie to Favorite List
    filmsContainerHTML.addEventListener('click', (event) =>
        handleLikeButtonClick(listType, event))

    // Listener for open/close Modal window
    filmsContainerHTML.addEventListener('click', (event) =>
        handleOpenModal(filmsList, filmsContainerHTML, event))
}

let ordinaryFavoriteListSwitcher = false
function handleFilmListSwitch(switchButton) {
    const filmsContainerHTML = document.querySelector('.film-cards-container')
    const filmsCardContainerTitle = document.querySelector('.film-cards-container-title')
    const favoriteFilms = fromStorage(ALL_FILMS).filter(({ isFavorite }) => isFavorite)

    if (!ordinaryFavoriteListSwitcher) {
        filmsCardContainerTitle.innerText = 'Favorite Films'
        switchButton.innerText = 'Click me to See All Films'
        filmsContainerHTML.remove()
        renderFilmsList(favoriteFilms, FAVORITE_FILMS)
        ordinaryFavoriteListSwitcher = true
    } else {
        filmsCardContainerTitle.innerText = 'All Films'
        switchButton.innerText = 'Click me to See Favorite Films'
        filmsContainerHTML.remove()
        renderFilmsList(fromStorage(ALL_FILMS), ALL_FILMS)
        ordinaryFavoriteListSwitcher = false
    }
}

function handleLikeButtonClick(listType, event) {
    const allFilms = fromStorage(ALL_FILMS)
    const likeButtonHtml = event.target.closest('button')

    if (likeButtonHtml) {
        const filmIndex = event.target.closest('div').dataset.filmindex

        allFilms[filmIndex].isFavorite = !allFilms[filmIndex].isFavorite

        const sortedFilms = sortAllFilmsByIsFavorite(allFilms)
        toStorage(ALL_FILMS, sortedFilms)

        const filmsListContainerHtml = document.getElementById(listType)
        filmsListContainerHtml.remove()

        switch (listType) {
            case ALL_FILMS:
                renderFilmsList(sortedFilms, listType)
                return
            case FAVORITE_FILMS:
                renderFilmsList(sortFavoriteFilms(allFilms, listType))
                return
            default:
                return
        }
    }
}

// Function to open/close Modal
function handleOpenModal(filmsList, targetContainer, event) {
    if (event.target.className === 'film-card-title') {
        const filmIndex = event.target.parentNode.dataset.filmindex
        const clickedFilm = filmsList[filmIndex]

        renderFilmModal(clickedFilm, targetContainer)

        const closeModalButton = document.querySelector('.close-modal')
        closeModalButton.addEventListener('click', () => {
            const modal = document.querySelector('.modal')
            modal.remove()
        }, { once: true })
    }
}