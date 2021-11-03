let movesMade = 0;
let flippedCards = [];
let flippedCardsArray = [];

//putting DOM-elements in variables
const playercontainer = document.getElementById('playercontainer')



//


let catArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]

//function to shuffle deck
function shuffleDeck(array) {
    for (let i = 0; i < array.length; i++) {
        let random = Math.floor(Math.random() * array.length);
        let temp = array[i];
        array[i] = array[random]
        array[random] = temp



    }
}

//Deck gets shuffled
shuffleDeck(catArray)
console.log(catArray);


//Create imageholders
function createImageholders() {
    for (let i = 0; i < catArray.length; i++) {
        let imageHolder = document.createElement('div');
        imageHolder.id = i;
        imageHolder.className = 'item';
        imageHolder.style.width = '150px';
        imageHolder.addEventListener("click", reactToCardClick)
        imageHolder.style.backgroundImage = 'url("img/cartooncat.png")'
        playercontainer.appendChild(imageHolder)

    }
}

createImageholders()

function reactToCardClick() {


    movesMade++;
    console.log('movesMade = ' + movesMade);
    flipcard(this.id);





    let thisID = document.getElementById(this.id);
    thisID.removeEventListener('click', reactToCardClick);





    if (movesMade === 2) {
        let allItems = document.getElementsByClassName('item');
        checkForMatch();
        movesMade = 0;

    }

}



function flipcard(id) {
    document.getElementById(id).style.background = 'url("img/kat' + catArray[id] + '.jpg")';

    if (movesMade === 1) {
        flippedCards[0] = catArray[id];
    } else {
        flippedCards[1] = catArray[id]
    }


}

function checkForMatch() {

    let allItems = document.getElementsByClassName('item');
    for (i = 0; i < allItems.length; i++) {
        allItems[i].removeEventListener('click', reactToCardClick);
    }
    //wanneer de kaarten gelijk aan elkaar zijn
    if (flippedCards[0] === flippedCards[1]) {

        setTimeout(function () {
            for (let i = 0; i < catArray.length; i++) {
                if (catArray[i] === flippedCards[0]) {
                    allItems[i].style.background = "none";
                    allItems[i].style.border = "none";
                    allItems[i].removeEventListener('click', reactToCardClick);
                    catArray[i] = null;
                    console.log(catArray);
                }




            }
            flippedCardsArray.push(flippedCards[0]);
            flippedCardsArray.push(flippedCards[1]);

            console.log(flippedCardsArray);
            console.log(allItems);

        }, 1500);

        for (i = 0; i < allItems.length; i++) {
            allItems[i].addEventListener('click', reactToCardClick);
        }

    } //Wanneer de plaatjes niet gelijk zijn. 
    else {
        let Cat1 = flippedCards[0];
        let Cat2 = flippedCards[1];

        setTimeout(function () {
            for (let i = 0; i < catArray.length; i++) {

                if (catArray[i] === Cat1) {
                    allItems[i].style.background = 'url("img/cartooncat.png")';
                }
                if (catArray[i] === Cat2) {
                    allItems[i].style.background = 'url("img/cartooncat.png")';
                }

                allItems[i].addEventListener('click', reactToCardClick)


            }
        }, 1000);

    }

}