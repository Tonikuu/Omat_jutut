var game;

window.onload = function() {
    
    var isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    var config;

    if (isMobile == -1) { //Työpöytä
        config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneMain, SceneOver],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 800},
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                parent: "phaser-example",
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 480,
                height: 640
            }
        };
    } else { //Mobiili
        config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneMain, SceneOver],
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 800},
                    debug: false
                }
            },
            scale: {
                mode: Phaser.Scale.FIT,
                parent: "phaser-example",
                autoCenter: Phaser.Scale.CENTER_BOTH,
            }
        
        };
    }
    game = new Phaser.Game(config);
    
   
}