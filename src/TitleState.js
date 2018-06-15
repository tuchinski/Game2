'use strict'

class TitleState extends BaseState {

    create() {
        let skyWidth = this.game.cache.getImage('sky').width
        let skyHeight = this.game.cache.getImage('sky').height
        this.sky = this.game.add.tileSprite(
            0, 0, skyWidth, skyHeight, 'sky')
        this.sky.scale.x = this.game.width / this.sky.width
        this.sky.scale.y = this.game.height / this.sky.height

        this.title = this.game.add.sprite(this.game.width/2, this.game.height*1/3, 'title')
        this.title.anchor.setTo(0.5, 0.5)
        this.title.scale.setTo(1.5, 1.5)

        this.pressStart = this.createText(this.game.width/2, this.game.height*2/3, 'Touch to Start', 24)
        this.info = this.createText(this.game.width/2, this.game.height-50, 'UTFPR-CM  /  2018', 18)

        let startButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        startButton.onDown.add(this.startGame, this)    

        this.initFullScreenButtons()    
    }

    startGame() {
        this.state.start('Game')
    }

    update() {
        this.sky.tilePosition.x += 0.5
    }

    render() {
        //obstacles.forEach(function(obj) { game.debug.body(obj) })
        //game.debug.body(player1)
        //game.debug.body(player2)
    }
}