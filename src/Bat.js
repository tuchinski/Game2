class Bat extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        this.anchor.set(0.5, 0.5)

        this.animations.add('fly', [0, 1, 2, 3], 8, true)
        this.animations.play('fly')

        this.game.physics.enable(this)
        this.body.gravity.y = 0

        this.body.collideWorldBounds = true
        this.body.velocity.x = config.BAT_VELOCITY
        // this.varAux = 0
    }

    die(){
        // this.body.velocity.y = -300
        this.body.enable = false
    }

    update() {
        // if (this.body.velocity.x != 0) {
        //     this.varAux = this.body.velocity.x
        // }
        // if (this.body.onWall()) {
        //     this.body.velocity.x = this.varAux * (-1)
        // }

        if(this.body.blocked.right){
            this.body.velocity.x = -config.BAT_VELOCITY
        }else if(this.body.blocked.left){
            this.body.velocity.x = config.BAT_VELOCITY
        }

        // console.log(this.body.blocked.right)
        //  console.log(this.body.touching.left)
        // console.log(this.body.wasTouching.down)
        // console.log(this.body.wasTouching.left)
        // console.log(this.body.wasTouching.right)
    }
    
    render(){
    }
}