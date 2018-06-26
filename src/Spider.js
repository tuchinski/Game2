class Spider extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        this.anchor.set(0.5, 0.5)

        this.animations.add('crawl', [0, 1, 2], 8, true)
        this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12)
        // this.animations.add('die', [0,3], 4)
        this.animations.play('crawl')

        this.game.physics.enable(this)
        this.body.gravity.y = 700

        this.body.collideWorldBounds = true
        this.body.velocity.x = config.SPIDER_VELOCITY
        // this.varAux = 0
    }

    die(){
        // this.body.velocity.y = -300
        this.body.enable = false
        this.animations.play('die').onComplete.addOnce(function () {
            this.kill();
        }, this);
    }

    update() {
        // if (this.body.velocity.x != 0) {
        //     this.varAux = this.body.velocity.x
        // }
        // if (this.body.onWall()) {
        //     this.body.velocity.x = this.varAux * (-1)
        // }

        if(this.body.blocked.right){
            this.body.velocity.x = -config.SPIDER_VELOCITY
        }else if(this.body.blocked.left){
            this.body.velocity.x = config.SPIDER_VELOCITY
        }

        // console.log(this.body.blocked.right)

        console.log(this.body.velocity.y)
    }
}