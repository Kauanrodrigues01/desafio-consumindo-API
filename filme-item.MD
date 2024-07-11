<li class="lista__filme-item">
    <img src="${IMAGE_BASE_URL}${IMAGE_SIZE}${filme.poster_path}" alt="" class="filme-imagem">
    <div class="filme__container-info">
        <h2 class="filme-titulo">${filme.title}</h2>

        <!-- <div class="container__avaliacao-favoritos">
            <span class="filme-avaliacao">
                <i class="bi bi-star-fill"></i>
                ${filme.vote_average}
            </span>
            <span class="filme-favorito">
                <i class="bi bi-heart"></i>
                Favoritar
            </span>
        </div> -->
    </div>
    <p class="filme-descricao">${filme.overview}</p>
</li>