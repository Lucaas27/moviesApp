(function () {
    // apikey = 8c375bd10903d08c3ee650757b8783e3
    const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8c375bd10903d08c3ee650757b8783e3&page=1"
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
    const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=8c375bd10903d08c3ee650757b8783e3&query='"
    const form = document.querySelector(".search")
    const search = document.querySelector(".search__input")
    const main = document.querySelector(".main")

    // Get initial movies
    getMovies(API_URL);

    // asynchronous function that calls the api and gets the movie data
    async function getMovies(url) {
        const res = await fetch(url);
        const data = await res.json()

        showMovies(data.results);
    }

    function showMovies(movies) {
        main.innerHTML = '';
        movies.forEach((movie) => {
            // destructuring movie object
            const { title, poster_path, vote_average, overview } = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <img class="movie__img" src="${IMG_PATH + poster_path}" alt="${title}" />
                <div class="movie__info">
                    <h3 class="movie__title">${title}</h3>
                    <span class="movie__rating ${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3 class="overview__title">Overview</h3>
                    <p class="overview__text">
                        ${overview}
                    </p>
                </div>
                    `
            main.appendChild(movieEl);
        })
    }

    // utility function to get class for the rating system
    function getClassByRate(vote) {
        if (vote >= 8) {
            return 'movie__rating--green'
        } else if (vote >= 5) {
            return 'movie__rating--orange'
        } else {
            return 'movie__rating--red'
        }
    };


    // attaching an event listener to the search form
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchTerm = search.value;


        // concatenate the search url with the search term if the search term exists
        if (searchTerm && searchTerm !== '') {
            getMovies(SEARCH_URL + searchTerm);
            search.value = '';
        }
        // reload the page if the search term is empty
        else {
            window.location.reload();
        }
    })
})();