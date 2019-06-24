

//Variable Lives, Score
let lives = 3;
let score = 0;
let liveboard = document.querySelector('.lives');
let scoreboard = document.querySelector('.score');
var modal = document.getElementsByClassName('modal')[0];


// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //Enemy goes off canvas
    if(this.x > 500){
        this.x = -75;
        this.ranSpeed();
    }

    //Enemies hits player
    if(player.x < this.x + 60 &&
       player.x + 37 > this.x &&
       player.y < this.y + 25 &&
       30 + player.y > this.y) {
       lives = lives - 1;
       liveboard.innerHTML = lives;
       if(lives === 0){
            openModal();
       }
       player.x = 200;
       player.y = 380;
    }
};


//Function that generates random speed
Enemy.prototype.ranSpeed = function(){
    var randSpeed = Math.floor(Math.random() * 10 + 3);
    this.speed = 70 * randSpeed;
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(initialX, initialY, speed){
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//Keeps player witin canvas- Checks if player makes it to water and adds to score
Player.prototype.update = function(){
    if(this.y > 380){
        this.y = 380;
    }
    if(this.x > 400){
        this.x = 400;
    }
    if(this.x < 0){
        this.x =0;
    }
    if(this.y < 0){
        this.x = 200;
        this.y = 380;
        score = score + 50;
        scoreboard.innerHTML = score;
        console.log(score);
    }

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Function for player move position
Player.prototype.handleInput = function(keyPress){
    switch(keyPress){
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;    
            break;
        case 'down':
            this.y += this.speed + 30;
            break;    

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(positionY) {
    enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random() * 520));
    allEnemies.push(enemy);



 });

//Open Modal Function - Game over
function openModal(){
    modal.style.display ='block';
    var modScore = document.querySelector('.final-score');
    modScore.innerHTML = score;

}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
