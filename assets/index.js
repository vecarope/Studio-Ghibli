
const select = document.querySelector("#movies-select");
const url = "https://studio-ghibli-films-api.herokuapp.com/api";
const movieInfo = document.querySelector("#movie-info");

fetch(url, { method: "GET" })
  .then((res) => res.json())
  .then((data) => {
    const movies = data
    for(let movie of Object.keys(movies) ){
      const option = document.createElement("option");
      option.value = movie; 
      option.text = movie;
      select.appendChild(option);
    }
    });

    select.addEventListener("change", (event) => {
      const movieId = event.target.value; 
      if(movieId) {
        getMovieInfo(movieId);
      } else {
        movieInfo.innerHTML = "";
      }
      console.log(movieId)
    })

function getMovieInfo(movieId){
  fetch(`${url}/${movieId}`)
  .then((res) => res.json())
  .then((movie) => [
    movieInfo.innerHTML =
    `
    <div class="card mb-3" style="max-width: 500px;" id="movie-card">
      <div class="row g-0">
        <div class="col-md-5 text-center">
          <img src=${movie.poster} class="img-fluid rounded-start my-5 max-auto " alt=${movie.title}>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text ">${movie.hepburn}</p>
            <p class="card-text text-sm mx-1">${movie.synopsis}</p>
            <p class="card-text">Estreno: ${movie.release}</p>
            <p class="card-text mb-2"><small class="text-body-secondary">Director: ${movie.director}</small></p>
          </div>
        </div>
      </div>
    </div>
    `,
    console.log(movieInfo)
  ])
}
