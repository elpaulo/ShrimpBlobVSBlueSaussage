var game = new Phaser.Game(800, 640, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var layerFond;
var layerSaussage;
var player;
var shrimp;
var shrimpFired = false;
var cursors;

var splash1Sound;
var splash2Sound;
var gameMusic;

var backgroundImage;

function preload() {

    game.load.tilemap('level','assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('Map', 'assets/sprites/tiles.png');
    game.load.image('saussage', 'assets/sprites/saussage.png');

    game.load.image('dude', 'assets/sprites/perso.png', 32, 32);
    game.load.image('shrimp', 'assets/sprites/shrimp.png');

    game.load.image('background', 'assets/sprites/background.jpg');

    game.load.audio('splash1', [ 'assets/sounds/splash1.wav' ]);
    game.load.audio('splash2', [ 'assets/sounds/splash2.wav' ]);

    game.load.audio('gameMusic', ['assets/sounds/gameMusic.mp3','assets/sounds/gameMusic.ogg']);

    game.load.image('chunk', 'assets/sprites/chunk.png');
}



function create() {

    splash1Sound = game.add.audio('splash1');
    splash2Sound = game.add.audio('splash2');

    gameMusic = game.add.audio('gameMusic');
    gameMusic.play('',0,1,true);

    backgroundImage = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    backgroundImage.anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.stage.backgroundColor = '#DADADA';

    map = game.add.tilemap("level");
    map.addTilesetImage('Map');
    map.addTilesetImage('saussage');

    layerFond = map.createLayer('Calque de Tile 1');
    layerSaussage =  map.createLayer('Calque d objets');


    map.setCollisionByExclusion([ 7, 8 ]);



    game.physics.p2.convertTilemap(map, layerFond);
    game.physics.p2.convertTilemap(map, layerSaussage);




    player = game.add.sprite(64, 160, 'dude');
    game.physics.p2.enable(player);
    player.body.static = true;



    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
    layerFond.resizeWorld();
    layerSaussage.resizeWorld();

    emitter = game.add.emitter(0, 0, 200);

    emitter.makeParticles('chunk');
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.gravity = 150;
    emitter.bounce.setTo(0.5, 0.5);
}

function particleBurst() {

    emitter.x = shrimp.x;
    emitter.y = shrimp.y;

    for (var i =0; i < 10; i++)
    emitter.start(true, 2000, null, 1);

}

var emitter;

var inWater = false;

function update() {


    if (shrimpFired) {
        var tile = map.getTileWorldXY(shrimp.x, shrimp.y, 16, 16, layerFond);
        var tileSaussage = map.getTileWorldXY(shrimp.x, shrimp.y, 16, 16, layerSaussage);

        if (tileSaussage != null) {
            console.log("EDERTDF")
        }

        if (tile != null) {
            if (tile.index == 7 || tile.index == 8) {

                if (inWater == false) {
                    splash1Sound.play();
                    particleBurst();
                }

                inWater = true;
                game.physics.p2.gravity.y = 0;
            }
            else {
                inWater = false;
                game.physics.p2.gravity.y = 100;
            }

            if (inWater) {
                if (cursors.left.isDown)
                {
                    shrimp.body.rotateLeft(100);
                }
                else if (cursors.right.isDown)
                {
                    shrimp.body.rotateRight(100);
                }
                else
                {
                    shrimp.body.setZeroRotation();
                }

                if (cursors.up.isDown)
                {
                    shrimp.body.thrust(200);

                }
                else if (cursors.down.isDown)
                {
                    shrimp.body.reverse(200);
                }
            }
        }
        else {
            game.physics.p2.gravity.y = 100;

            if (inWater == true) {
                splash2Sound.play();
                particleBurst();
            }
            inWater = false;
        }




    }



    if (game.input.activePointer.isDown)
    {
        //  Boom!
        fire();
    }

}

function fire() {

    if (!shrimpFired) {
        shrimpFired = true;
        shrimp = game.add.sprite(player.body.x + 20, player.body.y, 'shrimp');
        game.physics.p2.enable(shrimp);
        shrimp.body.force = 10;
        shrimp.body.velocity.x = 0;
        shrimp.body.velocity.y = 0;


        shrimp.body.onBeginContact.add(touche, this);


    }

}

function touche(body, shapeA, shapeB, equation){
    console.log(body);
}

function render() {
    if (shrimpFired)
        game.debug.body(shrimp);


}