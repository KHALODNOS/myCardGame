
let games = document.querySelector(".game-blocks");
let gamesBlocks = document.querySelectorAll(".game-blocks");
let front = document.querySelector(".front");
let button = document.querySelector(".control-buttons span")
let timer = document.querySelector('.timmer span')
let win = document.querySelector(".win")
let lose = document.querySelector(".lose")
let wrongTries = document.querySelector('.win .box span')

document.querySelector(".control-buttons span").onclick = function () {


    let yourName = prompt("what's your name");
    console.log(yourName);
    let timming = prompt("how many seccond do you want in this game")

    timer.innerHTML = timming

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();

    durtionBeforeStart()

    timmerOfGame()

}

function durtionBeforeStart() {
    blocks.forEach((block) => {
        setTimeout(() => {
            block.classList.add('is-flipped')
        }, 0);
})
}

function timmerOfGame() {
    setInterval(() => {
        timer.innerHTML--;
        if(timer.innerHTML < 0) {
            timer.innerHTML = 0;
        } if(timer.innerHTML == 0) {
            stopCliking();
        }
    }, 1000);
}




button.addEventListener('click', () => backToFlipp())





function backToFlipp() {
    blocks.forEach((block) => {
        setInterval(() => {
            block.classList.remove('is-flipped')
        }, 8000);
    })
}












function stopCliking () {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {

    blocksContainer.classList.remove("no-clicking");

    }, duration);
}



let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-block");

let blocks = Array.from(blocksContainer.children);

// console.log(blocks)


// let orderRange = Array.from(Array(blocks.length).keys());
let orderRange = Array.from(Array(blocks.length).keys());
// console.log(orderRange)


shuffle(orderRange);






blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function (){
        flipBack(block);
    })

});

function flipBack(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    let allFlipedBlocks = blocks.filter(flipedBlocks => flipedBlocks.classList.contains('is-flipped'));

    if (allFlipedBlocks.length === 2) {
        
        stopCliking();

        checkMatchedBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
    }

    isAllFlipped()
}

function isAllFlipped() {
    let allFlipedBlocksLength = (blocks.filter(flipedBlocks => flipedBlocks.classList.contains('has-match'))).length
    if(allFlipedBlocksLength === blocks.length && timer.innerHTML > 0) {
        win.classList.add('active')
        wrongTries.innerHTML = parseInt(document.querySelector('.tries span').innerHTML)
    } if(allFlipedBlocksLength < blocks.length && timer.innerHTML == 0) {
        lose.classList.add("active")
    }
}


function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.set === secondBlock.dataset.set) {
        
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();
    }

    else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(()=>{

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

    } ,duration)

    document.getElementById("fail").play();

    }
}


console.log("#".repeat(10))
function shuffle(array) {

    let current = array.length,
    temp,
    random;

    while(current > 0) {

    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    // console.log(temp)

    array[current] = array[random];

    // console.log(array[random])


    array[random] = temp;

    // console.log(array[random])
    }

    return array;

}


// function durtionBeforeStart() {
//     for (let i = 0; i < games.length; i++) {

//         setInterval(() =>{

//             front.classList.add("show")

//         },duration)
//     }
// }






