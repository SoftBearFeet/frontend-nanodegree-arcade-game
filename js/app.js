// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Set enemy's "x" to start before the canvas, so that they roll across the screen.
    this.x = -10;

    //Set enemy's "y" to be randomly generated between the pixels of the road
    this.y = Math.floor(Math.random() * (205 - 35 + 1)) +35;

    //This.speed randomly determins how fast the bug will move.
    this.speed = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
    this.checkCollisions(dt);

    // Calls the function to start the enemies when the go off canvas.
    if (this.x > 500) {
     this.restart();
    }
};

//Collision dectection, if the enemy caught the player
Enemy.prototype.checkCollisions = function(dt) {
 this.eDim = {x: this.x = this.x + this.speed*dt, y: this.y, w: 73, h: 54};
 if (player.x < this.eDim.x + this.eDim.w &&
        player.x + player.w > this.eDim.x &&
        player.y < this.eDim.y + this.eDim.h &&
        player.h + player.y > this.eDim.y) {
         player.reset();
         alert("**test** you died!");
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This is the restart function for the Enemies when they go off the canvas.
Enemy.prototype.restart = function() {
 this.x = -10;
 this.y = this.y = Math.floor(Math.random() * (205 - 35 + 1)) +35;
 this.sprite = 'images/enemy-bug.png';
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



var Player = function(x, y) {

 this.x = x;
 this.y = y;
 this.sprite = 'images/char-boy.png';

 //The width and the height is for the Collision dectection
 this.w = 73;
 this.h = 54;

 //These start corrdiantes are for when the player needs to be rest.
 this.startX = x;
 this.startY = y;
};

Player.prototype.update = function() {
 //left and Right Boundry for player.
   if (this.x < 0) {
    this.x = 0;
   } else if (this.x > 400)
   {this.x = 400;
   }

   //Top boundry. If the player reaches top bounder, they win and reset the game.
   if (this.y < 44) {
    alert("You won!");
    this.reset();
   }

   //Bottom Boundry for the game.
   if (this.y > 376) {
    this.y = 376;
   }


};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
   switch (keyCode) {
    case 'left':
     this.x = this.x - 101;
     break;
    case 'right':
     this.x = this.x + 101;
     break;
    case 'up':
     this.y = this.y - 83;
     break;
    case 'down':
     this.y = this.y + 83;
     break;
    default:

   }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//Created for loop to create new Enemy class and push to allEnemies array.
for (e=0; e < 3; e++){
 var enemy = new Enemy();
 allEnemies.push(enemy);
}

//Creates player instance.
var player = new Player(202, 376);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//Reset function for when player get hit or reaches water.
Player.prototype.reset = function () {
 this.x = 202;
 this.y = 376;
};

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
