/**
 * Created by paul on 18/04/15.
 */
/**
 * Created by paul on 09/05/14.
 */
BasicGame.Preloader = function (game) {


};

BasicGame.Preloader.prototype = {

    preload: function () {
        console.log('Preloader is alive');

        game.load.image('saussage', 'assets/sprites/saussage.png');
        game.load.image('dude', 'assets/sprites/perso.png', 32, 32);
        game.load.image('shrimp', 'assets/sprites/shrimp.png');
        game.load.image('background', 'assets/sprites/background.jpg');
        game.load.image('backgroundSplashScreen', 'assets/sprites/backgroundSplashScreen.png');
        game.load.image('chunk', 'assets/sprites/chunk.png');

        game.load.audio('splash1', [ 'assets/sounds/splash1.wav' ]);
        game.load.audio('splash2', [ 'assets/sounds/splash2.wav' ]);
        game.load.audio('gameMusic', ['assets/sounds/gameMusic.mp3','assets/sounds/gameMusic.ogg']);

        game.load.bitmapFont('oldschool_font', 'assets/fonts/oldschool.png', 'assets/fonts/oldschool.xml');
    },

    create: function () {
        console.log('Preloader create');
        this.game.state.start('SplashScreen', true, false);
    },

    update: function() {

    }

};