var level = document.querySelector('.level');
var highest = document.querySelector('.highest');


// x and y are coodinates of the enemies position & speed is for the movement of the enemies
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; // enemy image
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt
    if (this.x > 580) {
        this.x = -90
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    // coordinates set up for collision between player and enemies
    if (this.x + 60 > player.x &&
        this.x < player.x + 60 &&
        this.y + 60 > player.y &&
        this.y < player.y + 60) {
        player.x = 200, player.y = 400
        level.innerHTML = 1 // level gets 1 after collision 
        enemy1.speed = 168 // initial speeds of enemies 
        enemy2.speed = 220
        enemy3.speed = 180
    }
};


// to bring the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function () {
    if (this.x > 580) { // brings enemies back to canvas
        this.x = -90
    }
    if (this.y < 50) { // water collision resets player position, increases game level and enemy speed
        this.x = 200, this.y = 400
        level.innerHTML++
            enemy1.speed = enemy1.speed + 50
        enemy2.speed = enemy2.speed + 50
        enemy3.speed = enemy3.speed + 50
    }
    if (level.innerHTML > highest.innerHTML) { // highest level increases only if current level if higher than it
        highest.innerHTML++
    }
};


// to bring the playerr on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//conditions for player movements
Player.prototype.handleInput = function (direction) {
    if (direction == 'left' && this.x > 0) {
        this.x = this.x - 100
    }
    if (direction == 'right' && this.x < 400) {
        this.x = this.x + 100
    }
    if (direction == 'up' && this.y > 0) {
        this.y = this.y - 85
    }
    if (direction == 'down' && this.y < 400) {
        this.y = this.y + 85
    }
};


// enemy positions and speeds
const enemy1 = new Enemy(-40, 65, 168);
const enemy2 = new Enemy(-0, 145, 220);
const enemy3 = new Enemy(-200, 230, 160);

const allEnemies = [enemy1, enemy2, enemy3]

// player position
const player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});