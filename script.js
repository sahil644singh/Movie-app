const API_KEY = "api_key=7ec992b45a5588389bfc7fec84f4ae99";
const BASE_URL = "https://api.themoviedb.org/3"
const BASE_IMG = "https://image.tmdb.org/t/p/w500"

const SEARCH_URL = BASE_URL+"/search/movie?"+API_KEY
const TRENDING_MOVIE = BASE_URL + "/trending/movie/day?include_adult=false&sort_by=popularity.desc&"+API_KEY
const TRENDING_TV_SHOWS = BASE_URL + "/trending/tv/day?include_adult=false&sort_by=popularity.desc&"+API_KEY

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getMovies(TRENDING_TV_SHOWS)

function getMovies(url) {

    fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
        showMovies(data.results)
    })
    .catch((error)=> console.log(error))
}

function showMovies(data) {
    main.innerHTML=""
    data.forEach(movie => {
        const {poster_path,vote_average,overview,title,id} = movie;
        // console.log(BASE_IMG+poster_path);
        // console.log(title);
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.id=id
        movieEl.innerHTML = `<img src="${BASE_IMG+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3 id=>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span> 
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl)
    });
}

function getColor(vote) {
    if (vote>=8) {
        return "green"
    }
    else if(vote>=5)
    {
        return "orange"
    }
    else{
        return "red"
    }
}



form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const searchTerm= search.value
    console.log(SEARCH_URL+"&query="+searchTerm);
    console.log(searchTerm);
    if (searchTerm) {
        getMovies(SEARCH_URL+"&query="+searchTerm)
        console.log(SEARCH_URL+"&query="+searchTerm);
        
    }
    else{
        alert("Enter the movie name")
    }
})

// --------------------------------Trending section btn action handle----------------

const trending_movie = document.querySelector(".movie-btn")
const trending_tv = document.querySelector(".tv-btn")

trending_movie.addEventListener("click",()=>{
    getMovies(TRENDING_MOVIE)
})
trending_tv.addEventListener("click",()=>{
    getMovies(TRENDING_TV_SHOWS)
})

//----------------------------------HOME ICON--------------------------------------------

const home_icon = document.querySelector(".home-icon")
console.log(home_icon);

home_icon.addEventListener("click",()=>{
   getMovies(TRENDING_MOVIE)
})