class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    
    init(data) {
        this.score = data.score;
    }
    preload() {
        this.load.image("btn", "images/btn.png");
        this.load.image("kalja", "images/kaljaParticle.png");
    }

    create() {

        var style = {
            color: "#fff",
            fontSize: 24
        };
        var pointText = this.add.text(game.config.width/2, 50, "Pisteet",
         style).setOrigin(0.5);

        var oldHighScore = localStorage.getItem("highScore");
        var currHighScore;
        if (this.score > oldHighScore ||  oldHighScore == null) {
            currHighScore = this.score;
            localStorage.setItem("highScore", this.score);
            this.highScoreAnimation();
        } else {
            currHighScore = oldHighScore
        }

        var highScoreText = this.add.text(game.config.width/2, pointText.y + 130,
            "High Score", style).setOrigin(0.5);
        var highScoreValueText = this.add.text(game.config.width/2,
            highScoreText.y + 30, currHighScore, style).setOrigin(0.5);

        //Pelaa uudestaan
        var button = this.add.image(game.config.width/2, game.config.height/2, "btn");
        var buttonText = this.add.text(button.x, button. y, "Pelaa uudestaan!", style).setOrigin(0.5);

        button.setInteractive();
        button.on("pointerdown", this.startGame, this);
    }
    startGame(){
        this.scene.start("SceneMain");
    }
    highScoreAnimation() {
        var particles = this.add.particles("kalja");
        var emitter = particles.createEmitter({
            x: game.config.width/2,
            y: 220,
            angle: {min: 0, max: 360},
            speedX: {min:-200, max:200},
            speedY: {min:-200, max:200},
            gravity: 0,
            lifespan: 5000,
            quantity: 100,
            scale: {min:0.1, max:1},
            frequency: 200
        })
        emitter.explode();
    }
}