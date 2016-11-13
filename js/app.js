var BLOCK_HEIGHT = 80;

// Player vertically movements
var STEP_Y=80;
// Player horizaontally movements
var STEP_X=95;

var ENEMY_HEIGHT=70;
var ENEMY_WIDTH=101;
var PLAYER_HEIGHT=80;
var PLAYER_WIDTH=75;

var ENEMY_SPEED_EASY =[90,130,180]; // diferents types of speed and levels (Finally I did't get it :(
var ENEMY_SPEED_MEDIUM = [180,260,300];
var ENEMY_SPEED_EXPERT = [300,400,500];

var MAX_ENEMY=4;

var SLIDE_ENEMY_Y=75; // enemy image starts after 75 pixels down vertically in the this.sprite
var SLIDE_PLAYER_X=15;
var SLIDE_PLAYER_Y=60;

var INITIAL_X_PLAYER=200;
var INITIAL_Y_PLAYER=400;


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // reappearance of enemies
    if (this.x > 505) {
        this.x = 0;
        var enemynewPosition = Math.floor(Math.random()*3);
        if (enemynewPosition === 0) {
            this.y = 65;
        }
        if (enemynewPosition == 1) {
            this.y = 145;
        }
        if (enemynewPosition == 2) {
            this.y = 225;
        }
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(dt) {
    //player position
    var player1= {
        'top':   this.y+SLIDE_PLAYER_Y,
        'bottom': this.y+SLIDE_PLAYER_Y+PLAYER_HEIGHT,
        'right': this.x+SLIDE_PLAYER_X+PLAYER_WIDTH,
        'left': this.x+SLIDE_PLAYER_X
    };
    // enemy position
    for (var TheEnemy in allEnemies) {
        enemy={
             'top':   allEnemies[TheEnemy].y+SLIDE_ENEMY_Y,
             'bottom': allEnemies[TheEnemy].y+SLIDE_ENEMY_Y+ENEMY_HEIGHT,
             'right': allEnemies[TheEnemy].x+ENEMY_WIDTH-20,
             'left': allEnemies[TheEnemy].x+20
        };
        //collides
        if (!(player1.left>(enemy.right-10) || player1.right < (enemy.left+10) ||player1.top>=(enemy.bottom-10) || player1.bottom <=(enemy.top+10))) {
            this.handleEnemyCollision();
            break;
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// player movements
Player.prototype.handleInput = function(keycode) {
    var newPosition; //new position of player after key press
    switch (keycode) {
        case 'up':
            newPosition=this.y-STEP_Y;
            this.y= newPosition;
            break;
        case 'down':
            newPosition=this.y+STEP_Y;
            this.y= (newPosition<=INITIAL_Y_PLAYER) ? newPosition : INITIAL_Y_PLAYER;
            break;
        case 'left':
            newPosition=this.x-STEP_X;
            if(newPosition>=0) {
                this.x=newPosition;
                }
            break;
        case 'right':
            newPosition=this.x+STEP_X;
            //incorpotate for the point where the actual image starts
            if((newPosition+SLIDE_PLAYER_X +PLAYER_WIDTH)<=505) {
                this.x=newPosition;
            }
    }
    if (this.y < 50) {
        this.handleEnemyCollision();
    }
};
Player.prototype.handleEnemyCollision = function(){
    this.x=INITIAL_X_PLAYER;
    this.y=INITIAL_Y_PLAYER;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies= [];
var level;
var levelChosed;

//get the game level choosed for the user
function getLevel() {
    var levelOptions = document.levelForm.level;
    for (i=0; i<levelOptions.length; i++) {
        levelChosed = levelOptions[i].checked;
        if (levelChosed === true) {
            level = levelOptions[i];
        }
    }

    //depends the level choosed more or less speed
    switch (level.value) {
        case "easy":
            level = ENEMY_SPEED_EASY;
            break;
        case "medium":
            level = ENEMY_SPEED_MEDIUM;
            break;
        case "expert":
            level = ENEMY_SPEED_EXPERT;
            break;
        default: 
            window.alert("Please, choose a level for start")
    }
}

function instantiateEnemies() {
    getLevel();
    allEnemies = [];
    for (i=0; i<MAX_ENEMY;i++) {

        var positionEnemyX = 0; // enemy x position
        var speedRandom= Math.floor(Math.random() * 3); // random for choose on ENEMY_SPEED array

        var positionEnemyY= Math.floor(Math.random()*3);//enemy y position
        var y;
        if (positionEnemyY===0) { y=65; }
        if (positionEnemyY===1) { y=145; }
        if (positionEnemyY===2) { y=225; }

        var enemy1= new Enemy(0,y,level[speedRandom]);
        allEnemies.push(enemy1);
    }
}

// Place the player object in a variable called player
var player= new Player(INITIAL_X_PLAYER,INITIAL_Y_PLAYER);




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


