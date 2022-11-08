export function sortAllFilmsByIsFavorite(films) {
    return films.sort((a, b) => a.id - b.id).sort((a) => (a.isFavorite ? -1 : 1))
}