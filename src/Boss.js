class Boss extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        this.anchor.set(0.5, 0.5)
        this.health = 10

        this.animations.add('damage', [1,2,3], 8, true)
        this.animations.play('damage')

        this.game.physics.enable(this)
        this.body.gravity.y = 0
        // this.alive = false


        // this.body.collideWorldBounds = true
        this.body.velocity.x = config.ONE_EYED_VELOCITY

        // this.varAux = 0
    }

    // hit() {
    //     this.damage(1)
    //     this.
    // }

    update() {
        // if (this.body.velocity.x != 0) {
        //     this.varAux = this.body.velocity.x
        // }
        // if (this.body.onWall()) {
        //     this.body.velocity.x = this.varAux * (-1)
        // }


        // console.log(this.body.blocked.right)
    }
}