
class Coin extends Phaser.Sprite{
    constructor(game,x,y,img){
        super(game, x, y, img)
        this.scale.setTo(1.5,1.5)
        this.anchor.setTo(0.5,0.5)
        game.physics.arcade.enable(this)
        this.body.isCircle = true

        this.animations.add('flip', [0,1,2,3], 10, true)
        this.animations.play('flip')
    }
}