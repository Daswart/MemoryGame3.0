let movesMade = 0;
let flippedCards = [];
let flippedCardsArray = [];
let aantalBeurten = 0;
let matchFound = 0;

//putting DOM-elements in variables
const playercontainer = document.getElementById('playercontainer')
const refreshButton = document.getElementById('refreshbutton')
const punten = document.getElementById('punten');


//knop om de pagina te refreshen.
refreshButton.addEventListener('click', restartGame);

//functie om het spel opnieuw te starten
function restartGame() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    const jaButton = document.getElementById('ja-button');

    jaButton.addEventListener('click', function () {
        popup.style.display = 'none';
        document.getElementById('nieuwspel').style.display = 'block';
        let allItems = document.getElementsByClassName('item');
        for (i = 0; i < allItems.length; i++) {
            allItems[i].style.display = 'none';
        }

        setTimeout(function () {

            location.reload();

        }, 2000);

    })

    const doorgaanButton = document.getElementById('doorgaan-button')
    doorgaanButton.addEventListener('click', function () {
        popup.style.display = 'none';
    })

}





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
        imageHolder.style.border = 'none';
        imageHolder.style.borderRadius = '10px';
        imageHolder.style.boxShadow = '5px 8px 6px #888888';
        imageHolder.style.cursor = 'pointer';
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
        checkForMatch();
        movesMade = 0;
        setTimeout(function () {
            aantalBeurten++
            punten.innerHTML = aantalBeurten;
        }, 1000)

    }

}



function flipcard(id) {
    document.getElementById(id).style.background = 'url("img/kat' + catArray[id] + '.jpg")';
    document.getElementById(id).style.backgroundSize = 'cover';
    if (movesMade === 1) {
        flippedCards[0] = catArray[id];
    } else {
        flippedCards[1] = catArray[id]
    }


}

function checkForMatch() {

    let allItems = document.getElementsByClassName('item');

    //wanneer de kaarten gelijk aan elkaar zijn
    if (flippedCards[0] === flippedCards[1]) {

        setTimeout(function () {
            for (let i = 0; i < catArray.length; i++) {
                if (catArray[i] === flippedCards[0]) {
                    allItems[i].style.background = "none";
                    allItems[i].style.border = "none";
                    allItems[i].style.boxShadow = "none";
                    allItems[i].removeEventListener('click', reactToCardClick);
                    catArray[i] = null;
                    console.log(catArray);
                }




            }
            flippedCardsArray.push(flippedCards[0]);
            flippedCardsArray.push(flippedCards[1]);

            console.log(flippedCardsArray);
            // console.log(allItems);



            for (i = 0; i < allItems.length; i++) {
                if (catArray[i] != null) {
                    allItems[i].addEventListener('click', reactToCardClick);
                }
            }
            if (matchFound === catArray.length / 2) {
                popup.style.display = 'block';
                let popupContent = document.getElementById('popup-content');

                popupContent.innerHTML = 'Gefeliciteerd! je hebt alle kaarten weggespeeld.<br><br>Jouw score is ' + aantalBeurten + '<br><br>';
                popupContent.appendChild(refreshButton);
                refreshButton.removeEventListener('click', restartGame)
                refreshButton.addEventListener('click', function () {
                    document.getElementById('nieuwspel').style.display = 'block';
                    popup.style.display = 'none';
                    setTimeout(function () {
                        location.reload();

                    }, 2000);
                })

            }

        }, 1000);
        matchFound++;
        console.log('Match found = ' +
            matchFound);


    }
    //Wanneer de plaatjes niet gelijk zijn. 
    else {
        let Cat1 = flippedCards[0];
        let Cat2 = flippedCards[1];

        setTimeout(function () {
            for (let i = 0; i < catArray.length; i++) {

                if (catArray[i] === Cat1) {
                    allItems[i].style.background = 'url("img/cartooncat.png")';
                    allItems[i].style.backgroundSize = 'cover';

                }
                if (catArray[i] === Cat2) {
                    allItems[i].style.background = 'url("img/cartooncat.png")';
                    allItems[i].style.backgroundSize = 'cover';
                }

                if (catArray[i] != null) {
                    allItems[i].addEventListener('click', reactToCardClick);
                }

            }
        }, 1000);

    }
    for (i = 0; i < allItems.length; i++) {
        allItems[i].removeEventListener('click', reactToCardClick);
    }


}