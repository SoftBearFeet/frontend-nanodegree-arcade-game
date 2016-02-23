// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
};

//Trying to get the enemies box to move across the screen with the sprite. But not able to still get a collision when the "player's box" is hardcoded and stationary.
Enemy.prototype.checkCollisions = function(dt) {
 this.eDim = {x: this.x = this.x + this.speed*dt, y: this.y, w: 100, h: 74};
 var pDim = {x: 200, y: 400, w: 100, h: 83};
 if (pDim.x < this.eDim.x + this.eDim.w &&
        pDim.x + pDim.w > this.eDim.x &&
        pDim.y < this.eDim.y + this.eDim.h &&
        pDim.h + pDim.y > this.eDim.y) {
         alert("**test** you died!")
        };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



var Player = function(x, y, speed) {

 this.x = x;
 this.y = y;
 this.speed = speed
 this.sprite = 'images/char-boy.png';
 //I have the pDim as a place holder until I can get the collisions working.
 this.pDim = {x: this.x, y: this.y, w: 100, h: 83};
};

Player.prototype.update = function() {
   if (this.x < 0) {
    this.x = 0
   } else if (this.x > 400)
   {this.x = 400
   };
   if (this.y < 0) {
    this.y = 0
   } else if (this.y > 400) {
    this.y = 400
   };


};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
   switch (keyCode) {
    case 'left':
     this.x = this.x - 100;
     break;
    case 'right':
     this.x = this.x + 100;
     break;
    case 'up':
     this.y = this.y - 100;
     break;
    case 'down':
     this.y = this.y + 100;
     break;
    default:

   }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy(0, 400, 50);
var allEnemies = [enemyOne];
var player = new Player(200, 400, 100);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
