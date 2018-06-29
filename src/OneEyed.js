class OneEyed extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        this.anchor.set(0.5, 0.5)
        this.health = 2

        this.animations.add('walk', [8,9,10,11], 8, true)
        this.animations.add('damage', [6], 8, true)

        this.animations.play('walk')

        this.game.physics.enable(this)
        this.body.gravity.y = 700

        this.body.collideWorldBounds = true
        this.body.velocity.x = config.GOBLIN_VELOCITY

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

        if (this.body.blocked.right) {
            this.body.velocity.x = -config.SPIDER_VELOCITY
            this.scale.x = -1
        } else if (this.body.blocked.left) {
            this.scale.x = 1
            this.body.velocity.x = config.SPIDER_VELOCITY
        }

        // console.log(this.body.blocked.right)
    }
}