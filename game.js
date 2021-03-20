// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 230;
var winningScore = 310;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(20, 467, 'coin1');
  createItem(464, 520, 'letter');
  createItem(534, 520, 'letter');
  createItem(604, 520, 'letter');
  createItem(760, 350, 'letter');
  createItem(550, 50, 'letter');
  createItem(600, 50, 'letter');
  createItem(240, 50, 'letter');
  createItem(290, 50, 'letter');
}

function addletters() {
  items = game.add.physicsGroup();
  createItem(464, 520, 'blue');
  createItem(534, 520, 'violet');
  createItem(604, 520, 'green');
  createItem(760, 350, 'red');
  createItem(550, 50, 'yellow');
  createItem(600, 50, 'orange');
  createItem(240, 50, 'orange');
  createItem(290, 50, 'yellow');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();

  platforms.create(0, 565, 'platform1');
  platforms.create(538, 103, 'platform2');
  platforms.create(220, 103, 'platform2');
  //
  platforms.create(747, 510, 'box');
  platforms.create(747, 455, 'box');
  platforms.create(747, 400, 'box');
  platforms.create(692, 510, 'box');
  platforms.create(455, 309, 'box2');
  platforms.create(357, 215, 'box3');

  platforms.setAll('body.immovable', true);
}


// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(88, 457, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
   if (item.key === 'coin1') {
     game.add.sprite(20, 467, 'openbox');
     addletters();
  }else if (item.key === 'letter') {
     currentScore = currentScore + 10;
  }else if (item.key === 'coin4') {
     currentScore = currentScore - 45;
     game.add.sprite(385, 250, 'meatbasket');
  }
  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

  // before the game begins
  function preload() {

    game.load.image('background', 'background.png');

    //Load images
    game.load.image('platform1', 'platform.png');
    game.load.image('platform2', 'platform2.png');
    game.load.image('box', 'box2.png');
    game.load.image('box2', 'box5.png');
    game.load.image('box3', 'box6.png');



    //Load spritesheets
    game.load.spritesheet('player', 'chalkers.png',  48, 62 );
    game.load.spritesheet('coin1', 'coin.png', 36, 44);
    game.load.spritesheet('openbox', 'box3.png', { frameWidth: 50, frameHeight: 50 });
    game.load.spritesheet('letter', 'envelope/letter1.png', 36, 44);
    game.load.spritesheet('blue', 'envelope/blue.png', 36, 44);
    game.load.spritesheet('yellow', 'envelope/yellow.png', 36, 44);
    game.load.spritesheet('green', 'envelope/green.png', 36, 44);
    game.load.spritesheet('red', 'envelope/red.png', 36, 44);
    game.load.spritesheet('violet', 'envelope/violet.png', 36, 44);
    game.load.spritesheet('orange', 'envelope/orange.png', 36, 44);




    game.load.spritesheet('fruitbasket', 'fruitbasket.png', { frameWidth: 40, frameHeight: 40 });
    game.load.spritesheet('meatbasket', 'meatbasket.png', { frameWidth: 40, frameHeight: 40 });
    game.load.spritesheet('giftbasket', 'giftbasket.png', { frameWidth: 40, frameHeight: 40 });
    game.load.spritesheet('butterbasket', 'butterbasket.png', { frameWidth: 40, frameHeight: 40 });
    // game.load.spritesheet('birth', 'booklets/birth.png', 36, 44);
    // game.load.spritesheet('2021', 'booklets/2021.png', 36, 44);
    // game.load.spritesheet('news', 'booklets/news.png', 36, 44);




    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('star', 'star.png', 32, 32);
  }

  //timer
    var sec1 = 0;
    function timer1() {
       sec1++;
       var timer = document.querySelector(".timer");
       var m = (Math.trunc(sec1/60)<10? "0":"") + Math.trunc(sec1/60);
       var s = (sec1%60<10? "0":"") + sec1%60;
       timer.value = m + " : " + s;
  }
  setInterval(timer1, 1000);


  // initial game set up
  function create() {
    // alert("Прочитайте завдання, закрийте його на хрестик і грайте!");
    timer1();
    this.add.image(0, 0, 'background');
    // game.add.sprite(266, 467, 'grandma');
    // game.add.sprite(470, 467, 'grandpa');
    //
    // game.add.sprite(167, 214, 'grandma2');
    // game.add.sprite(370, 215, 'grandpa2');

    // game.add.sprite(275, 510, 'fruitbasket');
    // game.add.sprite(480, 510, 'butterbasket');
    // game.add.sprite(180, 250, 'giftbasket');
    // game.add.sprite(385, 250, 'meatbasket');
    player = game.add.sprite(200, 457, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(5, 16, "SCORE: " + currentScore, { font: "bold 19px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 340, "", { font: "bold 47px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -340;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "GREAT WORK!";

    }

  }

  function render() {

  }

};
