class SceneMain extends Phaser.Scene {
    constructor() {
        super("SceneMain");
    }
    
    preload() {
        this.load.image("toni", "images/toni.png");
        this.load.image("tausta", "images/bg.png");
        this.load.image("seinä", "images/wall.png");

    }

    create() {
        //Tausta
        this.tausta = this.add.tileSprite(0, 0, 480, 640, "tausta");
        this.tausta.setOrigin(0);
        this.tausta.displayHeight = game.config.height;
        this.tausta.displayWidth = game.config.width;
        

        //Toni
        this.toni = this.physics.add.sprite(70, game.config.height/2,"toni");
        this.toni.setScale(0.5);
        this.toni.body.collideWorldBounds = true;

        //Hypähdys
        this.input.on("pointerdown", this.toniJump, this);

        //Seinät
        this.seinä = this.physics.add.group({
            defaultKey: "seinä",
            velocityX: -200,
            allowGravity: false
        })
        // Kun toni ja ryhmän jäsen menevät päällekkäin
        this.isGameOver = false;
        this.physics.add.overlap(this.toni, this.seinä, this.wallCollide, null, this);

        
       
        this.wallTimer = this.time.addEvent({
            delay: 1750,
            loop: true,
            callback: this.createWall,
            callbackScope: this,
            timeScale: 1 //Kiihdytysajastimelle
        })
        this.createWall();

        //Score
        this.score = 0;
        this.scoreText = this.add.text(game.config.width/2, 110, this.score, {
            color: "white",
            fontSize: 80,
            stroke: '#000',
            strokeThickness: 10
        });
        this.scoreText.setDepth(1).setOrigin(0.5);
    }
    update() {
        //Tonin suoristuminen
        if (this.toni.angle < 0) {
        this.toni.angle += 1;
        }

        //Taustan liike
        this.tausta.tilePositionX += 1;

        //Pisteenlasku kun seinä pois ruudulta

        this.seinä.children.iterate(function(seinät){
            if (seinät != null) {
            if (seinät.x < -100) {
                this.seinä.remove(seinät, true, true);
                this.score += 1/2;
                this.updateScore();
            }
        }
        }, this);
        
    }
    updateScore() {
        this.scoreText.setText(Math.round(this.score));
    }

    gameOver() {
        console.log("GameOver");
        this.isGameOver = true;
        this.wallTimer.destroy();
        this.seinä.setVelocityX(0);
        this.toni.velocityY = 0;
       

        this.tweens.add ({
            targets: this.toni,
            angle: 90,
            ease: 'Cubic',
            duration: 550
        })
        //Tärähdys
        this.cameras.main.shake(500, 0.01);
        this.time.addEvent({
            delay: 1500,
            callback: function() {
                this.scene.launch("SceneOver", {score: this.score});
            },
            callbackScope: this,
            loop: false
        })
    }

    toniJump() {
        if (this.isGameOver == true) {
            return
        }
        this.toni.setVelocityY(-280);
        //Tonin kääntöanimaatio
        this.tweens.add({
            targets: this.toni,
            angle: -30,
            ease: "Cubic",
            duration: 150,
            repeat: 0
        })

    }
    createWall() {
        var topWall = this.seinä.create(game.config.width + 100, 0);
        topWall.setOrigin(0.5, 1);
        topWall.setDepth(0);

        var bottomWall = this.seinä.create(game.config.width + 100, 0);
        bottomWall.setOrigin(0.5, 0);

        var upperWallY = Phaser.Math.Between(0, game.config.height - 200);
        topWall.y = upperWallY;
        bottomWall.y = topWall.y + 200;

        
    }
    wallCollide() {
         if (this.isGameOver == false) {
        this.gameOver(); }
}
}
