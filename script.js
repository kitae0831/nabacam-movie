const gridContainer = document.querySelector(".grid-container");

// 카드의 레이아웃을 구성하여 Grid container에 자식 추가
const createCard = (payload) => {
  const poster_path = payload.poster_path;
  const title = payload.title;
  const overview = payload.overview;
  const vote_average = payload.vote_average;
  const movieID = payload.id;

  const card = document.createElement("div");

  card.addEventListener("click", () => {
    alert(`영화 ID : ${movieID}`);
  });

  card.className = "card-container";
  card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" width="350" height="500"/>
        <div class="card-title">${title}</div>
        <p class="card-rating">★ ${vote_average} / 10</p>
        <p class="card-overview">${overview}</p>
        `;

  gridContainer.appendChild(card);
};

// TMDB에서 fetch 가져오기
const getMovieList = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmI2YTJmMmZkNjk4NDM0YjExMjM1NTdkZGI4YzQ4OSIsInN1YiI6IjY0NzA4ODUyNTQzN2Y1MDEyNjNhOWQ5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w4IT6mJfHRwfdtZ6Jf79tUuKs4N4pIYdNK5flerGaf8",
    },
  };
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
  return data.results;
};

// 불러온 데이터를 반복 시키기
const makeCardList = async () => {
  const movieList = await getMovieList();

  movieList.forEach((movie) =>
    createCard({
      poster_path: movie.poster_path,
      title: movie.title,
      overview: movie.overview,
      vote_average: movie.vote_average,
      id: movie.id,
    })
  );
};

makeCardList();
