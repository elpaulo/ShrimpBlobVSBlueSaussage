/**
 * Created by paul on 18/04/15.
 */

var MAP_HEIGHT = 640;
var MAP_WIDTH = 800;

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'theGame');

game.state.add('SplashScreen', BasicGame.SplashScreen);
game.state.add('Preloader', BasicGame.Preloader);
game.state.add('Level', BasicGame.Level);

game.state.start('Preloader', true, false);