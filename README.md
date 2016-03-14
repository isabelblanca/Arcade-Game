frontend-nanodegree-arcade-game  25/06/2015
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.

<b>HOW TO PLAY</b>
You control the player character with the arrow keys and can move up, down, left or right. The objective is jump in the water before the bugs catch you.
For start to play, just load the page opening the index.html in your browser.

name: Isabel Blanco
web: www.isabelblanco.com
mail: isabelblancodura@gmail.com



<b>NOTES FOR THE EVALUATOR<b>
This proyect take a lot of time for me, was the most difficult for me for now.
I nedeed to read 3 differents fogger codes that I found on Internet for understand what I nedeed to do.
Finally , I started for follow the instruccions in the code,first working with the enemy object, defining all the parameters , properties and methods I nedeed.
After that, I continued for the player object. This one was more easy for me.
The most difficult part was the collisions, and calculate the position of the enemies, I needed to read again differents codes and finally I decided to use a loop type "for in". I don't know if its the best way, but is working.

When my proyjects was finish, I tried to make it udacious adding differents speed levels, but I didn't get it :'(

I used this code, and I can't understand why is not working:

HTML:
	<div id="extras">
    	<h2>Choose your level</h2>
    	<form name="levelForm" action="#">
    		<p><input type="radio" name="level">Easy</p>
    		<p><input type="radio" name="level">Medium</p>
    		<p><input type="radio" name="level">Advanced</p>
    	</form>
    </div>

JAVASCRIPT:

var allEnemies= [];
function instantiateEnemies() {
    for (i=0; i<MAX_ENEMY;i++) {

        var positionEnemyX = 0; // enemy x position
        var speedRandom= Math.floor(Math.random() * 3); // random for choose on ENEMY_SPEED array

        var positionEnemyY= Math.floor(Math.random()*3);//enemy y position
        var y;
        if (positionEnemyY==0) { y=65 };
        if (positionEnemyY==1) { y=145 };
        if (positionEnemyY==2) { y=225 };
        chooseSpeed();

        var enemy1= new Enemy(0,y,mySpeed[speedRandom]);
        allEnemies.push(enemy1);
    }
};

function chooseSpeed() {
    var levels = document.forms[0].level;
    for (i=0; i<levels.length; i++) {
        var election = levels[i].checked;
        if (election == true) {
            var myLevel = levels[i];
        }
    }
    if (myLevel = levels[0]) {
        var mySpeed = ENEMY_SPEED_EASY;
    }
    if (myLevel = levels[1]) {
        var mySpeed = ENEMY_SPEED_MEDIUM;
    }
    if (myLevel = levels[2]) {
        var mySpeed = ENEMY_SPEED_EXPERT;
    }
    return mySpeed;
    console.log(myLevel);
};
