document.addEventListener('DOMContentLoaded', () => {
    const btnFiltrar = document.querySelector('.container__filtrar-text')

    btnFiltrar.addEventListener('click', () => {
        const menuOpcoesFiltrar = document.querySelector('.menu-suspenso')
        const computedStyle = window.getComputedStyle(menuOpcoesFiltrar)
        const maxHeight = computedStyle.maxHeight

        if (maxHeight === '0px') {
            menuOpcoesFiltrar.style.maxHeight = '200px'
        } else {
            menuOpcoesFiltrar.style.maxHeight = '0'
        }
    })
})
