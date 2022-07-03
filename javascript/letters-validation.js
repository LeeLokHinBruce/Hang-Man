const guess = document.getElementById('guess')
const replay = document.getElementById('replay')
let gameover_screen = document.querySelector('.gameover-wrapper')

const inputWord = ['_', '_', '_', '_', '_']
const letters_input = document.querySelectorAll('.letter-input')

let questWord;
let allWord;
let playCondition = ["字串長度?", 5, "全英", true];
const wordText = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"

let life_count = playCondition[1] + 1
document.getElementById('life-count').innerHTML = life_count

fetch(wordText).then(response => response.text()).then(text => {
    allWord = text.split('\n');
    console.log(allWord);
}).then((start));

function start() {
    setCondition();
}

function setCondition() {
    let regExp = /^[A-Za-z]+$/;
    allWord = allWord.filter(word => word.length == playCondition[1]); //set 字數
    allWord = allWord.map(word => word.toUpperCase()); // set 全大階
    console.log("字串長度為" + playCondition[1] + "字量：" + allWord.length); //check字數

    if (playCondition[3]) {
        allWord = allWord.filter(word => {
            if (regExp.test(word)) {
                return true;
            } else {
                return false;
            }
        });//set all eng
    } else if (playCondition[3]) {
        allWord = allWord.filter(word => {
            if (regExp.test(word)) {
                return false;
            } else {
                return true;
            }
        });//set !eng
    }
    console.log(playCondition[2] + " " + playCondition[3] + "字量: " + allWord.length); //check字數

    // generate a random word
    questWord = Math.floor(Math.random() * allWord.length);
    console.log("random result: " + allWord[questWord]);
}

letters_input.forEach(letter => {
    let id = parseInt(letter.dataset.id)

    // get input value
    letter.addEventListener('input', e => {
        let inputValue = e.target.value.toUpperCase()
        if (inputValue.match(/[A-Z]{1}/)) {
            inputWord.splice(id, 1, inputValue)
            console.log(inputWord)
        }
    })

    // remove input value
    letter.addEventListener('keydown', e => {
        if (e.key === "Backspace") {
            inputWord.splice(id, 1, "_")
            console.log(inputWord)
        }
    })
})

// open gameover screen
guess.addEventListener("click", () => {
    // Check whether the input word is filled or still remain "_"
    let letterFill = inputWord.every(word => word !== '_')
    if (letterFill == false) {  // Not Filled
        alert("Some list haven't included letter! Please fill the list of letters!")
        return
    }
    let result = document.getElementById('gameover-result')
    let OriginalValue = allWord[questWord]  // answer

    for (let i = 0; i < OriginalValue.length; i++) {
        let letter_pos = document.getElementById("id-" + i)
        if (OriginalValue[i] === inputWord[i]) {
            letter_pos.disabled = true
        } else {
            letter_pos.disabled = false
        }
        console.log(letter_pos)
    }

    if (OriginalValue === inputWord.join('')) {  // guess right
        gameover_screen.style.display = 'flex'
        guess.style.display = 'none'
        result.innerHTML = "YOU WIN"
        result.style.color = '#008000'  // green
    } else {  // guess wrong
        document.getElementById('life-count').innerHTML = --life_count
        if (life_count == 0) {
            gameover_screen.style.display = 'flex'
            guess.style.display = 'none'
            result.innerHTML = "YOU LOSE"
            result.style.color = '#AF0000'  // red
        } else {
            alert("Some letter guess wrong!")
        }
    }
})

// close gameover screen
replay.addEventListener('click', () => {
    window.location.reload()
})

// disable behind the gameover screen
gameover_screen.addEventListener('click', e => {
    e.stopPropagation()
})