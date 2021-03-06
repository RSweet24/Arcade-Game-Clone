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

    function bugSpeed() {
        return 100 + Math.floor(Math.random() * 512);
    }

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.bugSpeed = bugSpeed();
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
    // which will ensure the game runs at the same bugSpeed for
    // all computers.
    this.x += this.bugSpeed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.bugSpeed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        location.reload();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y, bugSpeed) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.bugSpeed = bugSpeed;
}

Player.prototype.update = function (dt) {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        location.reload();
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.bugSpeed + 50;
            break;
        case 'up':
            this.y -= this.bugSpeed + 30;
            break;
        case 'right':
            this.x += this.bugSpeed + 50;
            break;
        case 'down':
            this.y += this.bugSpeed + 30;
            break;
    }
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