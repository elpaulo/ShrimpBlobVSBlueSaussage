
BasicGame.Level = function (game) {

    this.layerFond;
    this.layerSaussage;
    this.player;
    this.shrimp;
    this.shrimpFired = false;
    this.cursors;

    this.splash1Sound;
    this.splash2Sound;
    this.gameMusic;

    this.backgroundImage;

    this.emitter;

    this.inWater = false;

    this.particleBurst = function () {

        this.emitter.x = this.shrimp.x;
        this.emitter.y = this.shrimp.y;

        for (var i =0; i < 10; i++)
            this.emitter.start(true, 2000, null, 1);
    }


    this.fire = function() {

        if (!this.shrimpFired) {
            this.shrimpFired = true;
            this.shrimp = game.add.sprite(this.player.body.x + 20, this.player.body.y, 'shrimp');
            game.physics.p2.enable(this.shrimp);
            this.shrimp.body.force = 10;
            this.shrimp.body.velocity.x = 0;
            this.shrimp.body.velocity.y = 0;

            this.shrimp.body.onBeginContact.add(touche, this);


        }

    }

    function touche(body, shapeA, shapeB, equation){
        console.log(body);
    }
}

BasicGame.Level.prototype = {
    preload: function () {
        game.load.tilemap('level','assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Map', 'assets/sprites/tiles.png');
    },

    create: function() {

        this.splash1Sound = game.add.audio('splash1');
        this.splash2Sound = game.add.audio('splash2');

        this.backgroundImage = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
        this.backgroundImage.anchor.setTo(0.5, 0.5);

        game.physics.startSystem(Phaser.Physics.P2JS);

        game.stage.backgroundColor = '#DADADA';

        this.map = game.add.tilemap("level");
        this.map.addTilesetImage('Map');
        this.map.addTilesetImage('saussage');

        this.layerFond = this.map.createLayer('Calque de Tile 1');
        this.layerSaussage =  this.map.createLayer('Calque d objets');


        this.map.setCollisionByExclusion([ 7, 8 ]);



        game.physics.p2.convertTilemap(this.map, this.layerFond);
        game.physics.p2.convertTilemap(this.map, this.layerSaussage);




        this.player = game.add.sprite(64, 160, 'dude');
        game.physics.p2.enable(this.player);
        this.player.body.static = true;



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
    },

    update: function() {
        if (this.shrimpFired) {
            var tile = this.map.getTileWorldXY(this.shrimp.x, this.shrimp.y, 16, 16, this.layerFond);
            var tileSaussage = this.map.getTileWorldXY(this.shrimp.x, this.shrimp.y, 16, 16, this.layerSaussage);

            if (tileSaussage != null) {
                console.log("EDERTDF")
            }

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

                    }
                    else if (this.cursors.down.isDown)
                    {
                        this.shrimp.body.reverse(200);
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

        if (game.input.activePointer.isDown)
        {
            //  Boom!
            this.fire();
        }
    },

    render: function () {

    }

}




