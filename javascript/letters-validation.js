const guess = document.getElementById('guess')
const replay = document.getElementById('replay')
let gameover_screen = document.querySelector('.gameover-wrapper')

const inputWord = []

let questWord;
let allWord;
let lengthCondition = Math.floor(Math.random() * (8 - 4)) + 4
// let playCondition = ["字串長度?", 5, "全英", true];
const wordText = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"

let life_count = lengthCondition + 1
document.getElementById('life-count').innerHTML = life_count

// generate random list of letters
for (let i = 0; i < lengthCondition; i++) {
    inputWord.push('_')

    function setAttributes(element, attributes) {
        // attributes - object key
        // attr - object key value
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr, attributes[attr])
            // console.log(attributes[attr])
        })
    }

    const attributes = {
        id: 'id-' + i,
        'data-id': i,
        type: 'text',
        maxlength: 1
    }

    const letters_list = document.querySelector('.letters-list')
    const letter = document.createElement('div')
    const letter_box = document.createElement('input')

    letters_list.style['grid-template-columns'] = 'repeat(' + (i + 1) + ', 1fr)'

    letter.setAttribute('id', 'letter-' + i)

    letter_box.classList = "letter-input"  // set class name
    setAttributes(letter_box, attributes)  // set attributes

    // add child element to parent element
    letter.appendChild(letter_box)
    letters_list.appendChild(letter)
}

fetch(wordText).then(response => response.text()).then(text => {
    allWord = text.split('\n');
    // console.log(allWord);
}).then((start));

function start() {
    setCondition();
}

function setCondition() {
    let regExp = /^[A-Za-z]+$/;
    allWord = allWord.filter(word => word.length == lengthCondition); //set 字數
    allWord = allWord.map(word => word.toUpperCase()); // set 全大階
    console.log("字串長度為" + lengthCondition + "字量：" + allWord.length); //check字數

    allWord = allWord.filter(word => {
        if (regExp.test(word)) {
            return true;
        } else {
            return false;
        }
    });//set all eng

    console.log("全英字量: " + allWord.length); //check字數

    // generate a random word
    questWord = Math.floor(Math.random() * allWord.length);
    console.log("random result: " + allWord[questWord]);
}

const letters_input = document.querySelectorAll('.letter-input')
letters_input.forEach(letter => {
    let id = parseInt(letter.dataset.id)

    // set input value to inputValue array
    letter.addEventListener('input', e => {
        let inputValue = e.target.value.toUpperCase()
        if (inputValue.match(/[A-Z]{1}/)) {
            inputWord.splice(id, 1, inputValue)
            console.log(inputWord)
        }
    })

    // remove input value and set "_" to inputValue array
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
        // check which input has matched letter
        let letter_pos = document.getElementById("id-" + i)
        if (OriginalValue[i] === inputWord[i]) {
            letter_pos.disabled = true
        } else {
            letter_pos.disabled = false
        }
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
            let hints = []
            let hasHint = false
            for (let i = 0; i < OriginalValue.length; i++) {
                for (let j = 0; j < inputWord.length; j++) {

                    // check the some letter of input word is match to origin value
                    if (OriginalValue[i] === inputWord[j] && i !== j) {
                        let result = inputWord.every(word => hints.includes(word))
                        // identify to add new hint without repeat hintr
                        result ? console.log(`Include ${OriginalValue[i]} in hints array, not need to add`) : hints.push(inputWord[j])
                        hasHint = true
                    }

                }
            }

            if (hasHint) {
                alert('Some letter guess wrong! And some letter includes: ' + hints.join(', '))
                console.log(hints)
            } else {
                alert("Some letter guess wrong! ")
            }
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