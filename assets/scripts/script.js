const apiKey = 'fa301c088cb970fc7b6370a1a421cd99'
const apiUrl = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
const IMAGE_SIZE = 'w200'

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

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function loadFavorites() {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
}

function criarContainerAvalicaoFavorito(filme) {
    const containerAvalicaoFavorito = document.createElement('div')
    containerAvalicaoFavorito.classList.add('container__avaliacao-favoritos')

    const spanAvaliacao = document.createElement('span')
    spanAvaliacao.classList.add('filme-avaliacao')
    const iAvaliacao = document.createElement('i')
    iAvaliacao.classList.add('bi', 'bi-star-fill')
    spanAvaliacao.appendChild(iAvaliacao)
    spanAvaliacao.appendChild(document.createTextNode(filme.vote_average.toFixed(2)))

    const spanFavorito = document.createElement('span')
    spanFavorito.classList.add('filme-favorito')
    const iFavorito = document.createElement('i')
    iFavorito.classList.add('bi', 'bi-heart')
    spanFavorito.appendChild(iFavorito)
    spanFavorito.appendChild(document.createTextNode(" Favoritar"))

    const favorites = loadFavorites()
    if (favorites.includes(filme.id)) {
        iFavorito.classList.remove('bi-heart')
        iFavorito.classList.add('bi-heart-fill')
    }

    spanFavorito.addEventListener('click', () => {
        const favorites = loadFavorites() // Carrega novamente a lista dos ids dos favoritos para não sobrescrever os favoritos já existentes

        if (iFavorito.classList.contains('bi-heart')) {
            iFavorito.classList.remove('bi-heart')
            iFavorito.classList.add('bi-heart-fill')
            favorites.push(filme.id)
        } else {
            iFavorito.classList.remove('bi-heart-fill')
            iFavorito.classList.add('bi-heart')
            const index = favorites.indexOf(filme.id)
            if (index > -1) {
                favorites.splice(index, 1)
            }
        }
        saveFavorites(favorites)
    })

    containerAvalicaoFavorito.appendChild(spanAvaliacao)
    containerAvalicaoFavorito.appendChild(spanFavorito)
    return containerAvalicaoFavorito
}

function criarFilmeContainerInfo(filme, containerAvaliacaoFavorito) {
    const containerInfo = document.createElement('div')
    containerInfo.classList.add('filme__container-info')

    const titulo = document.createElement('h2')
    titulo.classList.add('filme-titulo')
    titulo.textContent = filme.title

    containerInfo.appendChild(titulo)
    containerInfo.appendChild(containerAvaliacaoFavorito)

    return containerInfo
}

function criarFilmeItem(filme, containerInfo) {
    const filmeItem = document.createElement('li')
    filmeItem.classList.add('lista__filme-item')

    const imagem = document.createElement('img')
    imagem.classList.add('filme-imagem')
    imagem.src = `${IMAGE_BASE_URL}${IMAGE_SIZE}${filme.poster_path}`

    const descricao = document.createElement('p')
    descricao.classList.add('filme-descricao')
    descricao.textContent = `${filme.overview}`

    filmeItem.appendChild(imagem)
    filmeItem.appendChild(containerInfo)
    filmeItem.appendChild(descricao)

    return filmeItem
}

const renderMovies = async () => {
    const filmes = await fetchPopularMovies()
    if (!filmes) return

    const containerFilmes = document.querySelector('.lista__filme')
    containerFilmes.innerHTML = ''

    filmes.forEach(filme => {
        const containerAvaliacaoFavorito = criarContainerAvalicaoFavorito(filme)
        const containerInfo = criarFilmeContainerInfo(filme, containerAvaliacaoFavorito)
        const filmeItem = criarFilmeItem(filme, containerInfo)
        containerFilmes.appendChild(filmeItem)
    })
}

// Chama a renderização inicial dos filmes
renderMovies()

// FUNCIONALIDADE DE PESQUISAR
const inputSearch = document.querySelector('#search')

const debounce = (func, delay) => {
    let debounceTimer
    return () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(func, delay)
    }
}

inputSearch.addEventListener('input', debounce(() => {
    const valorPesquisa = inputSearch.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const filmes = document.querySelectorAll('.lista__filme-item')

    filmes.forEach(filme => {
        const titulo = filme.querySelector('.filme-titulo').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const descricao = filme.querySelector('.filme-descricao').textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (titulo.includes(valorPesquisa) || descricao.includes(valorPesquisa)) {
            filme.style.display = 'flex'
        } else {
            filme.style.display = 'none'
        }
    })
}, 200)) // milisegundos do setinterval

// FUNCIONALIDADE DE MOSTRAR APENAS FAVORITOS
const btnMostrarApenasFavoritos = document.querySelector('#favoritos')

btnMostrarApenasFavoritos.addEventListener('change', () => {
    const filmes = document.querySelectorAll('.lista__filme-item')

    if (btnMostrarApenasFavoritos.checked) {
        filmes.forEach(filme => {
            const spanFavorito = filme.querySelector('.filme-favorito')
            if (spanFavorito.querySelector('i').classList.contains('bi-heart-fill')) {
                filme.style.display = 'flex'
            } else {
                filme.style.display = 'none'
            }
        })
    } else {
        filmes.forEach(filme => {
            filme.style.display = 'flex'
        })
    }
})