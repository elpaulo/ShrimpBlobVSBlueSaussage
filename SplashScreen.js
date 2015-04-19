/**
 * Created by paul on 18/04/15.
 */
/**
 * Created by paul on 09/05/14.
 */
BasicGame.SplashScreen = function (game) {
    this.Music;
    this.Background;
    this.PressStartText;
    this.EnterKey;


    this.pressStartBlink = function() {
        if (this.PressStartText.text == " ") {
            this.PressStartText.setText("CLICK TO START");
        }
        else {
            this.PressStartText.setText(" ");
        }
    }

    this.startGame = function(sprite) {
        this.game.state.start('Menu', true, false, 1, false, 0);
    }
};

BasicGame.SplashScreen.prototype = {

    preload: function () {
        console.log('SplashScreen is alive');
        this.Background = game.add.sprite(0, 0, "backgroundSplashScreen");


        this.PressStartText = game.add.bitmapText(325, 540,"oldschool_font", "CLICK TO START", 25);
        game.time.events.loop(Phaser.Timer.SECOND, this.pressStartBlink, this);

        this.Background.inputEnabled = true;
        this.Background.events.onInputDown.add(this.startGame, this);



    },

    create: function () {
        console.log('Main Menu create');
        this.Music = game.add.audio('gameMusic');

        this.Music.play('',0,1,true);

    },

    update: function() {

    },

    render: function() {

    }
};
