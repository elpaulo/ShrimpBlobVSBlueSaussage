<html>
	<head>
		<title>LD32</title>
		<script type="text/javascript" src="phaser.js"></script>
        <script src="//code.jquery.com/jquery-1.10.2.js"></script>
        <script type="application/javascript" src="Boot.js"></script>
        <script type="application/javascript" src="SplashScreen.js"></script>
        <script type="application/javascript" src="Preloader.js"></script>
        <script type="application/javascript" src="Level.js"></script>
        <script type="application/javascript" src="Menu.js"></script>
        <script type="application/javascript" src="game.js"></script>

        <style>

            * {
                -webkit-user-select: none;  /* Chrome all / Safari all */
                -moz-user-select: none;     /* Firefox all */
                -ms-user-select: none;      /* IE 10+ */

                /* No support for these yet, use at own risk */
                -o-user-select: none;
                user-select: none;
            }

            body {
                background-color: #7192b7;
            }




        </style>
	</head>
	<body>
        <table>
            <tr>
                <td>
                    <div id="theGame" />
                </td>

                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                <center> <h3>Flappy Shrimp Ninja Blob VS Blue Water Saussage !</h3></center>
                                <br />
                                <br />
                                2049 AD. After his fight against the bubble hordes in the cave of darkness,
                                Flappy Shrimp Ninja Blob must defeat le Blue Water Saussage.
                                Problem! Flappy Shrimp Ninja Blob cannot swim! "That's not a problem, people"
                                says Ninja Blob, "I'll send my best Shrimp bullet in the water and guide it
                                using TELEPATHY!". What an unconventional weapon !
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr />
                                Goal :
                                <br /><br />
                                Hit the Blue Water Saussage with the Shrimp bullet !
                                <br /><br />
                                Controls :
                                <br /><br />
                                <b>SpaceBar</b> : Release the Shrimp !
                                <br />
                                <b>Left - Right</b> : Orientation of the Shrimp
                                <br />
                                <b>Up</b> : Shrimp go go go !
                                <br />
                                <b>Down</b> : Shrimp wait wait wait ! !
                                <br /><br />
                                <b>The shrimp cannot move out of water, remember !</b>
                                <br /><br />
                                If you're stuck, press <b>R</b> to restart the level
                                <br />
                                Press <b>M</b> to return to the map selection screen
                                <hr />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                Created by Paul Fournier (<a href="http://papelou.fr">blog</a> - <a href="https://soundcloud.com/papelou">Soundcloud</a>) for Ludum Dare 32.
                            </td>
                        </tr>
                   </table>
                </td>

        </table>


	</body>
</html>