const apiKey = 'fa301c088cb970fc7b6370a1a421cd99'
const apiUrl = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w500';

// Função para buscar filmes populares
async function fetchPopularMovies() {
    try {
        const responseAPI = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
        if (!responseAPI.ok) {
            throw new Error('Não foi possível obter os dados dos filmes populares')
        }
        const dataFilmes = await responseAPI.json()
        console.log(dataFilmes.results)
        return dataFilmes.results
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error)
        return null
    }
}

fetchPopularMovies()

const renderMovies = async () => {
    const filmes = await fetchPopularMovies()
    if (!filmes) return

    const container = document.querySelector('.lista__filme')
    container.innerHTML = ''

    filmes.forEach(filme => {
        container.innerHTML += `
            <li class="lista__filme-item">
                <img src="${IMAGE_BASE_URL}${IMAGE_SIZE}${filme.poster_path}" alt="" class="filme-imagem">
                <div class="filme__container-info">
                    <h2 class="filme-titulo">${filme.title}</h2>
                    <div class="container__avaliacao-favoritos">
                        <span class="filme-avaliacao">
                            <i class="bi bi-star-fill"></i>
                            ${filme.vote_average}
                        </span>
                        <span class="filme-favorito">
                            <i class="bi bi-heart"></i>
                            Favoritar
                        </span>
                    </div>
                </div>
                <p class="filme-descricao">${filme.overview}</p>
            </li>
        `
    })
}

renderMovies()