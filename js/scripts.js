(function () {
    // apikey = 8c375bd10903d08c3ee650757b8783e3
    const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8c375bd10903d08c3ee650757b8783e3"
    const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
    const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=8c375bd10903d08c3ee650757b8783e3&query="
    const form = document.querySelector(".search");
    const search = document.querySelector(".search__input");
    const main = document.querySelector(".main");
    const body = document.querySelector("body");
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");
    const current = document.querySelector("#currPage");
    const firstPage = document.querySelector("#firstPage");
    const lastPage = document.querySelector("#lastPage");
    let currentPage = 1;
    let lastCall = '';
    let totalPages = "500";
    let searchTerm;

    // Get initial movies
    getMovies();


    // asynchronous function that calls the api and gets the movie data 
    async function getMovies(url = API_URL) {
        lastCall = url;
        // concatenate url with search term and page number
        const res = await fetch(`${url}`);
        const data = await res.json();

        // check if we get any results back
        if (data.results.length !== 0) {
            // render movies in the DOM
            showMovies(data.results);
            currentPage = data.page;
            current.innerText = currentPage;
            // if currentPage value less or equal to 1 do not display prev btn
            if (currentPage <= 1) {
                prevBtn.style.display = "none";
                firstPage.style.display = "none";
                nextBtn.style.display = "block";
                lastPage.style.display = "block";
            }
            // if page value is = total value hide next btn
            else if (currentPage >= totalPages) {
                nextBtn.style.display = "none";
                lastPage.style.display = "none";
                prevBtn.style.display = "block";
                firstPage.style.display = "block";

            }
            // display both buttons
            else {
                prevBtn.style.display = "block";
                firstPage.style.display = "block";
                nextBtn.style.display = "block";
                lastPage.style.display = "block";
            }
        }
        // Display feedback if there are no results
        else {
            main.innerHTML = `<h1>No Results Found</h1>`
        }
    };

    // attaching an event listener to the search form
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        searchTerm = search.value;

        // concatenate the search url with the search term if the search term exists
        if (searchTerm && searchTerm !== '') {
            getMovies(SEARCH_URL + searchTerm);
            search.value = '';
        }
        // reload the page if the search term is empty
        else {
            // window.location.reload();
            getMovies(API_URL);
        }
    });

    // Pagination - prev btn
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            getPage(--currentPage);
        }
    });

    // go back to the first page
    firstPage.addEventListener('click', () => {
        if (currentPage !== 1) {
            getPage("1");

        }
    });

    // Pagination -- next btn
    nextBtn.addEventListener('click', () => {
        if (currentPage <= totalPages) {
            getPage(++currentPage);
        }
    });

    // go to last page
    lastPage.addEventListener('click', () => {
        if (currentPage !== totalPages) {
            getPage(totalPages);
        }
    });

    // Split the API Url
    function getPage(pageNo) {
        // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8c375bd10903d08c3ee650757b8783e3&page=1
        let urlSplit = lastCall.split('?');
        // console.log(urlSplit);
        // https://api.themoviedb.org/3/discover/movie
        // sort_by = popularity.desc & api_key=8c375bd10903d08c3ee650757b8783e3&page=1
        let query = urlSplit[1].split('&');
        // console.log(query);
        // sort_by = popularity.desc 
        // api_key = 8c375bd10903d08c3ee650757b8783e3 
        // page=1
        let key = query[query.length - 1].split('=');
        // console.log(key);
        // page
        //1
        if (key[0] !== 'page') {
            let url = `${lastCall}&page=${pageNo}`
            getMovies(url);
            main.scrollIntoView({ behavior: 'smooth' })
        } else {
            key[1] = pageNo.toString();
            let a = key.join('=');
            query[query.length - 1] = a;
            let b = query.join('&');
            let url = `${urlSplit[0]}?${b}`
            getMovies(url);
            main.scrollIntoView({ behavior: 'smooth' });

        }
    };

    function showMovies(movies) {
        main.innerHTML = '';
        movies.forEach((movie) => {
            // destructuring movie object
            const { title, poster_path, vote_average, overview, id } = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <img class="movie__img" src="${poster_path ? IMG_PATH + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}" />
                <div class="movie__info">
                    <h3 class="movie__title">${title}</h3>
                    <span class="movie__rating ${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3 class="overview__title">Overview</h3>
                    <p class="overview__text">
                        ${overview}
                        <br/>
                        <button class="overview__button" id="${id}">Know More</button
                    </p>
                </div>
                    `
            main.appendChild(movieEl);
        })
    };

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



})();