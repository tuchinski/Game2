class Player2 extends Phaser.Sprite {
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
        // this.body.setSize(32, 32, 16, 16)
        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.coins = 0

        this.cursors = {
            left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
            down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            //fire: game.input.keyboard.addKey(keys.fire)
        }

    }

    move() {
        if (!this.alive) {
            return
        }
        if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
            let x = this.game.input.mousePointer.x + this.game.input.pointer1.x
            let y = this.game.input.mousePointer.y + this.game.input.pointer1.y

            if (!Phaser.Rectangle.contains(this.body, x, y)) {
                this.rotation = this.game.physics.arcade.moveToPointer(this, 60,
                    this.game.input.activePointer, config.PLAYER_MAX_VELOCITY)
            }
        }

    }

    bounce() {
        this.body.velocity.y = -config.BOUNCE_SPEED
    }

    jump() {
        if (!this.alive) {
            return
        }
        if (this.body.touching.down || this.body.onFloor()) {
            //if(this.cursors.up.isDown && this.body.onFloor()){
            this.body.velocity.y = -config.PLAYER_JUMP
            // console.log(config.PLAYER_JUMP)
        }
        
    }
    
    moveKeyboard() {
        if (!this.alive) {
            return
        }
        
        this.body.velocity.x = 0
        
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -config.PLAYER_ACCELERATION
        }
        else if (this.cursors.right.isDown) {
            this.body.velocity.x = config.PLAYER_ACCELERATION
        }
        
        if(this.cursors.up.isDown && this.body.onFloor()){
            this.body.velocity.y = -config.PLAYER_JUMP
        }


    }

    update() {
        // this.move()
        this.moveKeyboard()
        // console.log(this.body.onFloor())
        // console.log(this.body.blocked.right)

        // console.log(this.body.touching.down)


    }

}