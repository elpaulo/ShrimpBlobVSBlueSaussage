
BasicGame.Level = function (game) {

    this.layerFond;
    this.layerSaussage;
    this.player;
    this.shrimp;
    this.saussage;
    this.shrimpFired = false;
    this.cursors;

    this.splash1Sound;
    this.splash2Sound;
    this.winSound;
    this.goSound;
    this.dieSound;
    this.gameMusic;
    this.bubbleSound;

    this.backgroundImage;

    this.emitter;

    this.inWater = false;
    this.win = false;
    this.levelNumber;
    this.maxLevelDone;

    this.RKey;
    this.SpaceKey;
    this.MKey;

    this.PressSpaceText;
    this.LevelText;



    this.particleBurst = function () {

        this.emitter.x = this.shrimp.x;
        this.emitter.y = this.shrimp.y;

        for (var i =0; i < 10; i++)
            this.emitter.start(true, 2000, null, 1);
    }

    this.oneParticle = function() {
        this.emitter.x = this.shrimp.x;
        this.emitter.y = this.shrimp.y;


        this.emitter.start(true, 500, null, 1);
    }


    this.fire = function() {

        if (!this.shrimpFired) {

            this.PressSpaceText.setText(" ");

            this.goSound.play();
            this.shrimpFired = true;
            this.shrimp = game.add.sprite(this.player.body.x + 20, this.player.body.y, 'shrimp');
            game.physics.p2.enable(this.shrimp);
            this.shrimp.body.force = 10;
            this.shrimp.body.velocity.x = 0;
            this.shrimp.body.velocity.y = 0;

            this.shrimp.body.onBeginContact.add(this.touche, this);
        }
    }

    this.restartLevel = function() {
        this.win = false;
        this.inWater = false;
        this.shrimpFired = false;

        if (this.shrimp != null) {
            this.shrimp.kill();
        }

        this.PressSpaceText.setText("Press space !");
    }

    this.backToMenu = function() {
        if (this.bubbleSound.isPlaying)
            this.bubbleSound.stop();

        this.game.state.start('Menu', true, false, this.levelNumber, this.win, this.maxLevelDone);
    }

    this.touche = function(body, shapeA, shapeB, equation) {
        if (body != null) {
            if (body.sprite != null) {
                if (body.sprite.key == 'saussage') {
                    console.log("Win !");
                    this.win = true;
                    this.winSound.play();
                    this.backToMenu();
                }

                if (body.sprite.key == 'droid') {
                    console.log("Loose !");
                    this.dieSound.play();

                    var explosion = game.add.sprite(this.shrimp.body.x - 64, this.shrimp.body.y - 64, 'explosion');
                    explosion.animations.add('explode', [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 10, true);
                    explosion.play('explode', 30, false, true);
                    this.particleBurst();

                    this.restartLevel();
                }
            }
        }
    }

    this.newTween = function(droid) {

    }


}

BasicGame.Level.prototype = {
    preload: function () {
        game.load.tilemap('level','assets/levels/' + this.levelNumber + '.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Map', 'assets/sprites/tiles.png');
    },

    init: function(levelNumber, maxLevelDone) {
        this.levelNumber = levelNumber;
        this.maxLevelDone = maxLevelDone;


    },

    create: function() {

        this.splash1Sound = game.add.audio('splash1');
        this.splash2Sound = game.add.audio('splash2');
        this.winSound = game.add.audio('win');
        this.goSound = game.add.audio('go');
        this.dieSound = game.add.audio('die');
        this.bubbleSound= game.add.audio('bubbles');

        this.backgroundImage = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        this.backgroundImage.anchor.setTo(0.5, 0.5);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);

        game.stage.backgroundColor = '#008080';

        this.map = game.add.tilemap("level");
        this.map.addTilesetImage('Map');
        this.map.addTilesetImage('saussage');

        this.layerFond = this.map.createLayer('Calque de Tile 1');
        this.layerSaussage =  this.map.createLayer('Calque d objets');

        this.map.setCollisionByExclusion([ 7, 8 ]);

        game.physics.p2.convertTilemap(this.map, this.layerFond);
        game.physics.p2.convertTilemap(this.map, this.layerSaussage);


        $.ajax({
            context: this,
            type: "GET",
            url: "assets/levels/" + this.levelNumber + ".xml",
            dataType: "xml",
            async: false,
            success: function (xml) {
                var playerX;
                var playerY;

                $(xml).find('player').each( function() {
                    playerX = parseInt($(this).attr('x'));
                    playerY = parseInt($(this).attr('y'));
                });

                this.player = game.add.sprite(playerX, playerY, 'dude');
                game.physics.p2.enable(this.player);
                this.player.body.static = true;
                this.player.animations.add('jiggle', [ 0,1,2,3,4,5,6,7,8], 10, true);
                this.player.play('jiggle');

                var saussageX;
                var saussageY;

                $(xml).find('saussage').each( function() {

                    saussageX = parseInt($(this).attr('x'));
                    saussageY = parseInt($(this).attr('y'));
                });

                this.saussage = game.add.sprite(saussageX, saussageY, 'saussage');
                game.physics.p2.enable(this.saussage);
                this.saussage.body.static = true;
                this.saussage.animations.add('wriggle', [ 0, 1], 10, true);
                this.saussage.play('wriggle');


                $(xml).find('enemy').each( function() {

                    var startx = parseInt($(this).attr('startx'));
                    var starty = parseInt($(this).attr('starty'));
                    var duration = parseInt($(this).attr('duration'));



                    var enemy = game.add.sprite(startx, starty, 'droid');
                    game.physics.p2.enable(enemy);
                    enemy.body.static = false;
                    enemy.animations.add('twerk', [ 0, 1,2,3], 10, true);
                    enemy.play('twerk');

                    var endx = parseInt($(this).attr('endx'));
                    var endy = parseInt($(this).attr('endy'));
                    var tween = game.add.tween(enemy.body).to( { x:endx, y:endy  }, duration, Phaser.Easing.Linear.None, true, 0, -1, true);
                    tween.yoyo(true, 0);
                });
            }
        });

        this.cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(this.player);
        this.layerFond.resizeWorld();
        this.layerSaussage.resizeWorld();

        this.emitter = game.add.emitter(0, 0, 200);

        this.emitter.makeParticles('chunk');
        this.emitter.minRotation = 0;
        this.emitter.maxRotation = 0;
        this.emitter.gravity = 150;
        this.emitter.bounce.setTo(0.5, 0.5);

        this.RKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.RKey.onDown.add(this.restartLevel, this);

        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.SpaceKey.onDown.add(this.fire, this);

        this.MKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.MKey.onDown.addOnce(this.backToMenu, this);

        this.PressSpaceText = game.add.bitmapText(this.player.body.x + 50, this.player.body.y - 50,"oldschool_font", "Press space !", 12);

        this.LevelText = game.add.bitmapText(670, 20,"oldschool_font", "Level " + this.levelNumber, 12);;

        this.restartLevel();
    },

    update: function() {

        if (!this.win) {

            if (this.shrimpFired) {
                var tile = this.map.getTileWorldXY(this.shrimp.x, this.shrimp.y, 16, 16, this.layerFond);

                if (tile != null) {
                    if (tile.index == 7 || tile.index == 8) {

                        if (this.inWater == false) {
                            this.splash1Sound.play();
                            this.particleBurst();
                            this.shrimp.body.velocity = this.shrimp.body.velocity - 500;
                        }

                        this.inWater = true;
                        game.physics.p2.gravity.y = 0;
                    }
                    else {
                        this.inWater = false;
                        game.physics.p2.gravity.y = 100;
                    }

                    if (this.inWater) {
                        if (this.cursors.left.isDown)
                        {
                            this.shrimp.body.rotateLeft(100);
                        }
                        else if (this.cursors.right.isDown)
                        {
                            this.shrimp.body.rotateRight(100);
                        }
                        else
                        {
                            this.shrimp.body.setZeroRotation();
                        }

                        if (this.cursors.up.isDown)
                        {
                            this.shrimp.body.thrust(200);
                            if (!this.bubbleSound.isPlaying)
                                this.bubbleSound.play();
                            this.oneParticle();

                        }

                        else if (this.cursors.down.isDown)
                        {
                            this.shrimp.body.reverse(200);
                        }

                        else if (this.cursors.up.isUp)
                        {
                            if (this.bubbleSound.isPlaying)
                                this.bubbleSound.stop();
                        }
                    }
                }
                else {
                    game.physics.p2.gravity.y = 100;

                    if (this.inWater == true) {
                        this.splash2Sound.play();
                        this.particleBurst();
                    }
                    this.inWater = false;
                }
            }
        }
    },

    render: function () {

    }

}




