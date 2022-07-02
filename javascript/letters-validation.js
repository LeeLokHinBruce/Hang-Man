const gameover_btn = document.getElementById('guess')
const replay = document.getElementById('replay')
let gameover_screen = document.querySelector('.gameover-wrapper')

// open gameover screen
gameover_btn.addEventListener('click', () => {
    gameover_screen.style.display = 'flex'
    gameover_btn.style.display = 'none'
})

// close gameover screen
replay.addEventListener('click', () => {
    gameover_screen.style.display = 'none'
    gameover_btn.style.display = 'block'
})

// disable behind the gameover screen
gameover_screen.addEventListener('click', e => {
    e.stopPropagation()
})