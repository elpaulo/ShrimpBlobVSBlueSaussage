/**
 * Created by paul on 18/04/15.
 */
/**
 * Created by paul on 09/05/14.
 */
BasicGame.Preloader = function (game) {
    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {
        console.log('Preloader is alive');

        var loading = game.add.bitmapText(20, 20,"oldschool_font", "LOADING...", 25);

        game.load.spritesheet('saussage', 'assets/sprites/saussage.png', 32,32);
        game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48,9);
        game.load.spritesheet('droid', 'assets/sprites/droid.png', 32, 32,4);
        game.load.spritesheet('explosion', 'assets/sprites/explode.png', 128, 128, 16);
        game.load.image('shrimp', 'assets/sprites/shrimp.png');
        game.load.image('background', 'assets/sprites/background.png');
        game.load.image('backgroundSplashScreen', 'assets/sprites/backgroundSplashScreen.png');
        game.load.image('chunk', 'assets/sprites/chunk.png');
        game.load.image('button','assets/sprites/boutonLevel.png');
        game.load.image('lock', 'assets/sprites/lock.png');

        game.load.audio('splash1', [ 'assets/sounds/splash1.wav' ]);
        game.load.audio('splash2', [ 'assets/sounds/splash2.wav' ]);
        game.load.audio('win', [ 'assets/sounds/win.wav' ]);
        game.load.audio('go', [ 'assets/sounds/go.wav' ]);
        game.load.audio('die', [ 'assets/sounds/die.wav' ]);
        game.load.audio('bubbles', [ 'assets/sounds/bubbles.wav' ]);
        game.load.audio('gameMusic', ['assets/sounds/gameMusic.mp3','assets/sounds/gameMusic.ogg']);


    },

    create: function () {
        console.log('Preloader create');
    },

    update: function() {
        if (this.cache.isSoundDecoded('gameMusic') && this.ready == false)
        {
            this.ready = true;
            this.state.start('SplashScreen');
        }
    }

};