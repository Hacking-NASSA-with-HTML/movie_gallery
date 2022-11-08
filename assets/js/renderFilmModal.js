export function renderFilmModal(clickedFilm, targetContainer) {
    const { imgUrl, movieName, releaseYear, isFavorite, description } = clickedFilm
    const btnImg = isFavorite ? 'favorite_48.png' : 'notFavorite48.png'

    targetContainer.insertAdjacentHTML(
        'afterend',
        `<div class='modal'>
            <div class='modal-content'>
                <div class='close-modal'>
                    <img class='close-modal-icon'
                    src='assets/img/close-button-normal-size.png'>
                </div>
                <img class='film-card-poster' src='${imgUrl}'>
                <div class='film-card-title'>${movieName}</div>
                <div class='film-card-year'>${releaseYear}</div>
                <div class='film-card-description'>${description}</div>
                <button class='film-card-button'>
                    <img class='film-card-button-img' src='assets/img/${btnImg}'>
                </button>
            </div>
        </div>`
    )
}