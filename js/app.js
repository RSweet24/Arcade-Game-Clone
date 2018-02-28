// Enemies our player must avoid

let row1 = false;
let row2 = false;
let row3 = false;

var Enemy = function () {
    const firstRow = 60;
    const secondRow = 145;
    const thirdRow = 230;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    function getRandomXCoordinate(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomYCoordinate(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function speed() {
        return 100 + Math.floor(Math.random() * 512);
    }


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = speed();
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomXCoordinate(-110, -200);
    this.y = getRandomYCoordinate(1, 3);
    if (this.y === 1 && row1 === false) {
        this.y = firstRow;
        row1 = true;
    } else if (this.y === 2 && row2 === false) {
        this.y = secondRow;
        row2 = true;
    } else if (this.y === 3 && row3 === false) {
        this.y = thirdRow;
        row3 = true;
    } else {
        this.y = -300;
    }

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.speed = speed;
}

Player.prototype.update = function (dt) {
    
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keyPress) {
    
}

// Now instantiate your objects.
var firstEnemy = new Enemy();
var secondEnemy = new Enemy();
var thirdEnemy = new Enemy();
var player = new Player(200, 380, 50);


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [firstEnemy, secondEnemy, thirdEnemy];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});