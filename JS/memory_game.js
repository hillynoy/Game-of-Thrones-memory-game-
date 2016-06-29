//global variables
var card1 = new Image();
var card2 = new Image();

var allCards = document.getElementsByClassName('card');

//creating an array of the hidden images so I can shuffle them before assigning them to each card
var createImage = function(src, title) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    return img;
};

var imageArr = [];

imageArr[0] = createImage("./PICS/c_arya.jpg", 'Image1');
imageArr[1] = createImage("./PICS/c_cersi.jpg", 'Image2');
imageArr[2] = createImage("./PICS/c_drogo.jpg", 'Image3');
imageArr[3] = createImage("./PICS/c_joffry.jpg", 'Image4');
imageArr[4] = createImage("./PICS/c_snow.jpg", 'Image5');
imageArr[5] = createImage("./PICS/c_merg.jpg", 'Image6');
imageArr[6] = createImage("./PICS/c_arya.jpg", 'Image1');
imageArr[7] = createImage("./PICS/c_cersi.jpg", 'Image2');
imageArr[8] = createImage("./PICS/c_drogo.jpg", 'Image3');
imageArr[9] = createImage("./PICS/c_joffry.jpg", 'Image4');
imageArr[10] = createImage("./PICS/c_snow.jpg", 'Image5');
imageArr[11] = createImage("./PICS/c_merg.jpg", 'Image6');

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
imageArr = shuffle(imageArr);

// //looping through both the image array and the cards array and assigning them to each other, using their index
for (var i = 0; i < allCards.length; i++) {
    allCards[i].appendChild(imageArr[i]);
}

//function flip a clicked card and store its source
    var flipCard = function (click) {
        var card = click.target;
        var flipped_img = card.getElementsByTagName('img')[0];
        console.log(flipped_img);//creating an array of the images
        flipped_img.style.display = "block";
                         //setting the display of images from hidden to shown

        if (card1.src === "") {
            card1 = flipped_img;                          //check if the first global cardSrc is occupied with a previous code, if so- store the new image src in "card2Src"
            console.log("this is card 1 ", card1.src);
        }else{
            card2 = flipped_img;
            console.log("this is card 2 " ,card2.src);
            //todo check if both have the same image src
            if (card1.src !== card2.src) {
                console.log("i'm in!!!");
                setTimeout(function(){card1.style.display = "none";card1 = new Image();}, 1000);
                setTimeout(function(){card2.style.display = "none";card2 = new Image();}, 1000);


            }
        //     //else just leave the cards display:block
        }
};


var clickedCard = document.getElementsByClassName("card");      //setting every card the click functionality that sends it to the flip function.
for (var i = 0; i < clickedCard.length; i++) {
    clickedCard[i].addEventListener("click", flipCard);
}








//todo when click a card show its image -and wait for another input
//todo after second input-

//function check if equal
//todo -if src of pic1 and pic2 is equal, keep them with image display-block
// else- flip back (change back to image- display none- then we see only background)
// extra if- if all cards are matched- alert- "you have won!"


