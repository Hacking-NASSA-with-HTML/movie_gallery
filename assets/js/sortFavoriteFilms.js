export function sortFavoriteFilms(filmsList) {
    return filmsList.filter(({ isFavorite }) => isFavorite).sort((a, b) => b.id - a.id)
}