// apikey = 8c375bd10903d08c3ee650757b8783e3
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8c375bd10903d08c3ee650757b8783e3&page=1"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=8c375bd10903d08c3ee650757b8783e3&query='"
const form = document.querySelector(".search")
const search = document.querySelector(".search__input")

// Get initial movies
getMovies(API_URL)

// asynchronous function that calls the api and gets the movie data
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    console.table(data.results);
}

// attaching an event listener to the search form
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value


    // concatenate the search url with the search term if the search term exists
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    }
    // reload the page if the search term is empty
    else {
        window.location.reload()
    }
})
