/**
 * Created by paul on 18/04/15.
 */
/**
 * Created by paul on 18/04/15.
 */

BasicGame.Menu = function (game) {

    this.lastLevelDone = 1;
    this.lastLevelDoneWin = false;
    this.maxLevelDone = 0;

    this.congratulationsText;

    this.SpaceKey;

    this.actionOnClick = function(button) {
        this.game.state.start('Level', true, false, button.name, this.maxLevelDone);
    }

    this.noAccess = function(button) {

    }

    this.congratulationsBlink = function() {
        if (this.congratulationsText.text == " ") {
            this.congratulationsText.setText("CONGRATULATIONS !");
        }
        else {
            this.congratulationsText.setText(" ");
        }
    }

    this.nextLevel = function() {
        if (this.maxLevelDone + 1 <= 12)
            this.game.state.start('Level', true, false, this.maxLevelDone + 1, this.maxLevelDone);
    }
};

BasicGame.Menu.prototype = {

    init: function (lastLevelDone, win, maxLevelDone) {
        this.lastLevelDone = lastLevelDone;
        this.lastLevelDoneWin = win;
        this.maxLevelDone = maxLevelDone;

        if (this.lastLevelDone > this.maxLevelDone && this.lastLevelDoneWin == true) {
            this.maxLevelDone++;
        }
    },

    preload: function () {

    },

    create: function () {
        game.stage.backgroundColor = '#182d3b';

        // Ligne 1

        if (this.maxLevelDone + 1 >= 1) {
            var button1 = game.add.button(10, 20, 'button', this.actionOnClick, this);
            button1.name = 1;
            game.add.bitmapText(90, 45,"oldschool_font", "1", 20);
        }

        if (this.maxLevelDone + 1 >= 2) {
            var button2 = game.add.button(210, 20, 'button', this.actionOnClick, this);
            button2.name = 2;
            game.add.bitmapText(290, 45,"oldschool_font", "2", 20);
        }
        else {
            var button2 = game.add.button(210, 20, 'button', this.noAccess, this);
            button2.name = 2;
            game.add.bitmapText(235, 45,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 3) {
            var button3 = game.add.button(410, 20, 'button', this.actionOnClick, this);
            button3.name = 3;
            game.add.bitmapText(490, 45,"oldschool_font", "3", 20);
        }
        else {
            var button3 = game.add.button(410, 20, 'button', this.noAccess, this);
            button3.name = 3;
            game.add.bitmapText(435, 45,"oldschool_font", "LOCKED", 20);
        }


        if (this.maxLevelDone + 1 >= 4) {
            var button4 = game.add.button(610, 20, 'button', this.actionOnClick, this);
            button4.name = 4;
            game.add.bitmapText(690, 45,"oldschool_font", "4", 20);
        }
        else {
            var button4 = game.add.button(610, 20, 'button', this.noAccess, this);
            button4.name = 4;
            game.add.bitmapText(635, 45,"oldschool_font", "LOCKED", 20);
        }


        // Ligne 2

        if (this.maxLevelDone + 1 >= 5) {
            var button4 = game.add.button(10, 150, 'button', this.actionOnClick, this);
            button4.name = 5;
            game.add.bitmapText(90, 175,"oldschool_font", "5", 20);
        }
        else {
            var button4 = game.add.button(10, 150, 'button', this.noAccess, this);
            button4.name = 5;
            game.add.bitmapText(35, 175,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 6) {
            var button4 = game.add.button(210, 150, 'button', this.actionOnClick, this);
            button4.name = 6;
            game.add.bitmapText(290, 175,"oldschool_font", "6", 20);
        }
        else {
            var button4 = game.add.button(210, 150, 'button', this.noAccess, this);
            button4.name = 6;
            game.add.bitmapText(235, 175,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 7) {
            var button4 = game.add.button(410, 150, 'button', this.actionOnClick, this);
            button4.name = 7;
            game.add.bitmapText(490, 175,"oldschool_font", "7", 20);
        }
        else {
            var button4 = game.add.button(410, 150, 'button', this.noAccess, this);
            button4.name = 7;
            game.add.bitmapText(435, 175,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 8) {
            var button4 = game.add.button(610, 150, 'button', this.actionOnClick, this);
            button4.name = 8;
            game.add.bitmapText(690, 175,"oldschool_font", "8", 20);
        }
        else {
            var button4 = game.add.button(610, 150, 'button', this.noAccess, this);
            button4.name = 8;
            game.add.bitmapText(635, 175,"oldschool_font", "LOCKED", 20);
        }

        // Ligne 3

        if (this.maxLevelDone + 1 >= 9) {
            var button4 = game.add.button(10, 280, 'button', this.actionOnClick, this);
            button4.name = 9;
            game.add.bitmapText(90, 305,"oldschool_font", "9", 20);
        }
        else {
            var button4 = game.add.button(10, 280, 'button', this.noAccess, this);
            button4.name = 9;
            game.add.bitmapText(35, 305,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 10) {
            var button4 = game.add.button(210, 280, 'button', this.actionOnClick, this);
            button4.name = 10;
            game.add.bitmapText(280, 305,"oldschool_font", "10", 20);
        }
        else {
            var button4 = game.add.button(210, 280, 'button', this.noAccess, this);
            button4.name = 10;
            game.add.bitmapText(235, 305,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 11) {
            var button4 = game.add.button(410, 280, 'button', this.actionOnClick, this);
            button4.name = 11;
            game.add.bitmapText(480, 305,"oldschool_font", "11", 20);
        }
        else {
            var button4 = game.add.button(410, 280, 'button', this.noAccess, this);
            button4.name = 11;
            game.add.bitmapText(435, 305,"oldschool_font", "LOCKED", 20);
        }

        if (this.maxLevelDone + 1 >= 12) {
            var button4 = game.add.button(610, 280, 'button', this.actionOnClick, this);
            button4.name = 12;
            game.add.bitmapText(680, 305,"oldschool_font", "12", 20);
        }
         else {
            var button4 = game.add.button(610, 280, 'button', this.noAccess, this);
            button4.name = 12;
            game.add.bitmapText(635, 305,"oldschool_font", "LOCKED", 20);
        }

        if (this.lastLevelDone == 12 && this.lastLevelDoneWin == true) {
            this.congratulationsText = game.add.bitmapText(30, 500,"oldschool_font", "CONGRATULATIONS !", 38);
            game.time.events.loop(Phaser.Timer.SECOND, this.congratulationsBlink, this);
        }
        else {
            game.add.bitmapText(30, 500,"oldschool_font", "SELECT A LEVEL !", 40);
            game.add.bitmapText(20, 600,"oldschool_font", "(Press SpaceBar to start the next level)", 16);
        }

        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.SpaceKey.onDown.addOnce(this.nextLevel, this);
    }

};