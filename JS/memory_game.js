//global variables
var easyGameActive = false;
var medGameActive = false;
var advGameActive = false;
var gameIsOn = true;
var card1 = new Image();
var card2 = new Image();
var count = 0;

var createBoard = function (imgArray) {
    var board = document.getElementById("container");
    var doubleArray = new Array(imgArray.length * 2);
    for (var i = 0; i < doubleArray.length; i++) {
        doubleArray[i] = imgArray[i % imgArray.length]
    }
    doubleArray = shuffle(doubleArray);
    board.innerHTML = "";
    // var counter = 0;
    for (var i = 0; i < doubleArray.length; i++) {
        var card = document.createElement('div');
        card.className = "card";
        card.addEventListener("click", flipCard);
        var img = createImage(doubleArray[i]);
        card.appendChild(img);
        board.appendChild(card);
    }
};

var startAdvancedGame = function () {

    advGameActive = true;

    var imgArray = ["arya1.jpg", "cersi1.jpg", "drogo1.jpg", "joffry1.jpg", "snow1.jpg", "merg1.jpg", "calisi1.jpg", "half1.jpg", "briene1.jpg", "rob1.jpg", "dorn1.jpg", "hound1.jpg"];
    createBoard(imgArray);
};

var startMediumGame = function () {
    medGameActive = true;

    var imgArray = ["arya1.jpg", "cersi1.jpg", "drogo1.jpg", "joffry1.jpg", "snow1.jpg", "merg1.jpg", "calisi1.jpg", "half1.jpg", "briene1.jpg"];
    createBoard(imgArray);
};

var startEasyGame = function () {
    easyGameActive = true;

    var imgArray = ["arya1.jpg", "cersi1.jpg", "drogo1.jpg", "joffry1.jpg", "snow1.jpg", "merg1.jpg"];
    createBoard(imgArray);
};


//creating an array of the hidden images so I can shuffle them before assigning them to each card
var createImage = function (src) {
    var img = document.createElement('img');
    img.src = "./PICS/" + src;
    return img;
};

// shuffling the images on every new round
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a
}

//function flip a clicked card and store its source
var flipCard = function (click) {
    if (gameIsOn){
        var card = click.target;
        var flipped_img = card.getElementsByTagName('img')[0];
        console.log(flipped_img);//creating an array of the images
        flipped_img.style.display = "block";
        //setting the display of images from hidden to shown

        if (card1.src === "") {
            card1 = flipped_img;                          //check if the first global cardSrc is occupied with a previous code, if so- store the new image src in "card2Src"

        }
        else {
            card2 = flipped_img;
            //check if both have the same image src
            if (card1.src !== card2.src) {

                gameIsOn = false;

                setTimeout(function () {
                    card1.style.display = "none";
                    card1 = new Image();
                    card2.style.display = "none";
                    card2 = new Image();
                    gameIsOn = true;
                }, 800);
            }
            else {
                card1 = new Image();
                card2 = new Image();
                count = count + 2;
                console.log("counter: ", count );
            }

        }
        if ((easyGameActive === true) && (count === 12)) {
            count = 0;
            easyGameActive = false;
            youHaveWon();

        }
        if ((medGameActive === true) && (count === 18)) {
            count = 0;
            medGameActive = false;
            youHaveWon();


        }
        if ((advGameActive === true) && (count === 24)) {
            count = 0;
            advGameActive = false;
            youHaveWon();

        }
    }
};

var chooseLevel = function () {
    var title = document.createElement('div');
    title.className = "title";
    title.textContent = "Choose your memory capacity...";
    document.body.appendChild(title);

    var easyBtn = document.createElement('button');
    easyBtn.textContent = "Zombie brain";
    easyBtn.className = "btn";
    easyBtn.addEventListener('click', startEasyGame);
    title.appendChild(easyBtn);

    var medBtn = document.createElement('button');
    medBtn.textContent = "Wildling brain";
    medBtn.className = "btn";
    medBtn.addEventListener('click', startMediumGame);
    title.appendChild(medBtn);

    var advBtn = document.createElement('button');
    advBtn.textContent = "Dragon brain";
    advBtn.className = "btn";
    advBtn.addEventListener('click', startAdvancedGame);
    title.appendChild(advBtn);
};

var youHaveWon = function() {

var lightBox = document.createElement('div');

};

chooseLevel();
