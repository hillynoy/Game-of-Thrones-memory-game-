//global variables
var easyGameActive = false;
var medGameActive = false;
var advGameActive = false;
var gameIsOn = true;
var card1 = new Image();
var card2 = new Image();
var count = 0;
var wrongGuess = 0;


var createBoard = function (imgArray) {
    console.log("im in create board");

    var board = document.getElementById("container");
    var doubleArray = new Array(imgArray.length * 2);
    for (var i = 0; i < doubleArray.length; i++) {
        doubleArray[i] = imgArray[i % imgArray.length]
    }
    console.log("im in  create board2");

    doubleArray = shuffle(doubleArray);
    board.innerHTML = "";
    for (var i = 0; i < doubleArray.length; i++) {
        var card = document.createElement('div');
        card.className = "card";
        card.addEventListener("click", flipCard);
        var img = createImage(doubleArray[i]);
        card.appendChild(img);
        board.appendChild(card);
        console.log("im in  create board3 after shuffle");

    }
};


var startAdvancedGame = function () {
    gameIsOn = true;
    advGameActive = true;
    document.getElementById("container").style.display = "block";
    $("#title").click (function () {
        $("#title").fade(3000);
    });
    var imgArray = ["arya1.jpg", "cersi1.jpg", "drogo1.jpg", "joffry1.jpg", "snow1.jpg", "merg1.jpg", "calisi1.jpg", "half1.jpg", "briene1.jpg", "rob1.jpg", "dorn1.jpg", "hound1.jpg"];
    createBoard(imgArray);

};

var startMediumGame = function (click) {
    gameIsOn = true;
    document.getElementById("container").style.display = "block";
    medGameActive = true;
    $("#title").click (function () {
        $("#title").hide(3000);
    });
    var imgArray = ["arya1.jpg", "cersi1.jpg", "drogo1.jpg", "joffry1.jpg", "snow1.jpg", "merg1.jpg", "calisi1.jpg", "half1.jpg", "briene1.jpg"];
    createBoard(imgArray);
};

var startEasyGame = function () {
    gameIsOn = true;
    easyGameActive = true;
    document.getElementById("container").style.display = "block";
    $("#title").click (function () {
        $("#title").hide(3000);
    });
    var imgArray = ["arya1.jpg", "cersi1.jpg", "drogo1.jpg", "joffry1.jpg", "snow1.jpg", "merg1.jpg"];
    createBoard(imgArray);
};


//creating an array of the hidden images so I can shuffle them before assigning them to each card
var createImage = function (src) {
    var img = document.createElement('img');
    img.src = "./pics/" + src;
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
                    wrongGuess++
                }, 800);
            }
            else {
                card1 = new Image();
                card2 = new Image();
                count = count + 2;
            }
        }

        if ((easyGameActive === true) && (count === 12)) {
            resetGame();
        }
        else if ((medGameActive === true) && (count === 18)) {
            resetGame();
        }
        else if ((advGameActive === true) && (count === 24)) {
            resetGame();
        }
    }
};

var resetGame = function () {
    easyGameActive = false;
    medGameActive = false;
    advGameActive = false;
    count = 0;
    youHaveWon(wrongGuess);
    var title = document.getElementById("title");
    title.style.display = "block";
};

var chooseLevel = function () {
    var title = document.getElementById('title');
    title.className = "title";

    var easyBtn = document.getElementById('easyBtn');
    easyBtn.className = "btn";
    easyBtn.addEventListener('click', startEasyGame);

    var medBtn = document.getElementById('medBtn');
    medBtn.className = "btn";
    medBtn.addEventListener('click', startMediumGame);
    
    var advBtn = document.getElementById('advBtn');
    advBtn.className = 'btn';
    advBtn.addEventListener('click', startAdvancedGame);
};

var youHaveWon = function() {

    setTimeout(function () {
        // document.getElementsById("container").style.display = "none";
        var msg = "The Iron Throne is yours! <br/> You had " + wrongGuess + " wrong guesses";

        document.getElementById("message").innerHTML = msg;
        document.body.style.opacity = "0.8";

        document.getElementById("lightbox").style.display = "block";
        document.getElementById("lightbox").style.backgroundImage = "url('../pics/throne.jpg')";
        document.getElementById("newGame").onclick = function () {
            var msg = "";
            document.getElementById("message").innerHTML = msg;
            document.getElementById("lightbox").style.display = "none";
            document.getElementById("container").style.display = "none";
            chooseLevel();
        };
    }, 100);
};

chooseLevel();