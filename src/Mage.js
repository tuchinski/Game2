class Mage extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        this.health = config.PLAYER_HEALTH
        game.physics.arcade.enable(this)
        this.anchor.setTo(0.5, 0.5)
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.maxVelocity.set(config.PLAYER_MAX_VELOCITY)
        this.body.mass = 0.1
        this.body.gravity.y = 750
        // this.body.allowGravity = true
        this.body.friction.setTo(0, 0)
        this.body.setSize(23, 34, 20, 15)
        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.coins = 0
        var isAlive = 1
        this.scale.x = config.PLAYER_SCALE
        this.scale.y = config.PLAYER_SCALE
        
        this.cursors = {
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            //fire: game.input.keyboard.addKey(keys.fire)
        }
        
        this.animations.add('walk', [12,13,13,15,16,17,18,19], 20, true)
        this.animations.add('die', [1,2,3,4,5], 4, false)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        this.animations.add('jump', [8,9,10,11], 1, false)                                                                                                                                       
        this.animations.add('idle', [0], 8, true)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        

        this.sfx = {
            jump: this.game.add.audio('sfx:jump')
        }

        this.events.onKilled.addOnce(function () {
            this.body.velocity.x = 0
            this.visible = true
            this.exists = true
            this.animations.play('die')
        },this)
    }

    
    
    // die(){
    //     // this.body.enable = false
    //     // console.log("aeho")
    //     this.animations.play('die',4, false, true)       
        
    // }

    bounce() {
        this.body.velocity.x = -config.BOUNCE_SPEED
    }

    jump() {
        if (!this.alive) {
            return
        }
        if (this.body.touching.down || this.body.onFloor()) {
            //if(this.cursors.up.isDown && this.body.onFloor()){
                this.body.velocity.y = -config.PLAYER_JUMP
                this.sfx.jump.play()
                this.animations.play('die', 1, false)

                // console.log(config.PLAYER_JUMP)
        }
        
    }
    
    moveKeyboard() {
        if (!this.alive) {
            return
        }
        
        this.body.velocity.x = 0
        
        if (this.cursors.left.isDown) {
            this.scale.x = -config.PLAYER_SCALE
            this.scale.y = config.PLAYER_SCALE
            this.animations.play('walk')
            this.body.velocity.x = -config.PLAYER_ACCELERATION
        }
        else if (this.cursors.right.isDown) {
            this.scale.x = config.PLAYER_SCALE
            this.scale.y = config.PLAYER_SCALE
            this.animations.play('walk')
            this.body.velocity.x = config.PLAYER_ACCELERATION
        }
        else{
            this.animations.play('idle')
        }
        
        if(this.cursors.up.isDown && this.body.onFloor()){
            this.animations.play('jump', 1, true)
            this.body.velocity.y = -config.PLAYER_JUMP
            this.sfx.jump.play()

        }
        
        
    }
    
    // move() {
    //     if (!this.alive) {
    //         return
    //     }
    //     if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
    //         let x = this.game.input.mousePointer.x + this.game.input.pointer1.x
    //         let y = this.game.input.mousePointer.y + this.game.input.pointer1.y

    //         if (!Phaser.Rectangle.contains(this.body, x, y)) {
    //             this.rotation = this.game.physics.arcade.moveToPointer(this, 60,
    //                 this.game.input.activePointer, config.PLAYER_MAX_VELOCITY)
    //         }
    //     }

    // }


    update() {
        // this.move()
        this.moveKeyboard()
        // console.log(this.body.onFloor())
        // console.log(this.body.blocked.right)
        
        // console.log(this.body.touching.down)

        
    }
    
}