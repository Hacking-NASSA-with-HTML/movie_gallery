export function renderFilmCard(film, targetContainer, i) {
    const { imgUrl, movieName, releaseYear, isFavorite } = film

    const btnImg = isFavorite ? 'favorite_48.png' : 'notFavorite48.png'

    targetContainer.insertAdjacentHTML('beforeend',
        `<div data-filmindex='${i}' class='film-card'>
            <img class='film-card-poster' src='${imgUrl}'>
            <div class='film-card-title'>${movieName}</div>
            <div class='film-card-year'>${releaseYear}</div>
            <button class='film-card-button'>
                <img class='film-card-button-img' src='assets/img/${btnImg}'>
            </button>
        </div>
    `)
}