
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, tint, bullets, keys) {
        super(game, x, y, img)
        //this.tint = tint
        this.health = config.PLAYER_HEALTH
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.maxVelocity.set(config.PLAYER_MAX_VELOCITY)
        this.body.mass = 0.1
        this.body.friction.setTo(0,0)
        //this.body.bounce.setTo(1,1)
        this.body.setSize(32, 32, 16, 16)
        // this.body.isCircle = true
        this.nextFire = 0
        this.body.collideWorldBounds = true
        this.body.allowRotation = false
    
        this.cursors = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            up: game.input.keyboard.addKey(keys.up),
            down: game.input.keyboard.addKey(keys.down),        
            fire: game.input.keyboard.addKey(keys.fire)
        }
    
        this.bullets = bullets

        // particulas de fumaça
        this.emitter = game.add.emitter(0, 0, 40);
        this.emitter.makeParticles( [ 'smoke' ] );
        this.emitter.setXSpeed(0, 0)
        this.emitter.setYSpeed(0, 0)
        this.emitter.setAlpha(1, 0, 1000);
        this.emitter.setScale(0.7, 0, 0.7, 0, 1000);
        this.emitter.start(false, 1000, 50);
    }        

    angleByAtan() {
        if ((this.body.velocity.x != 0) || (this.body.velocity.y != 0)) {
            this.angle = 
                Math.atan2(this.body.velocity.y, this.body.velocity.x) * 180/Math.PI
        }
    }    

    // move e rotaciona, como em Asteroids
    moveAndTurn() {
        if (!this.alive)
            return

        //  mouse ou touch
        if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
            let x = this.game.input.mousePointer.x + this.game.input.pointer1.x
            let y = this.game.input.mousePointer.y + this.game.input.pointer1.y

            if (!Phaser.Rectangle.contains(this.body, this.game.input.x, this.game.input.y)) {
                //this.game.physics.arcade.moveToPointer(this, config.PLAYER_MAX_VELOCITY);
                this.rotation = this.game.physics.arcade.moveToPointer(this, 60, 
                    this.game.input.activePointer, config.PLAYER_MAX_VELOCITY);
            }
        }
        //this.angleByAtan()
    }   
    
    fireBullet() {
        if (!this.alive)
            return;
    
        if (this.cursors.fire.isDown) {
            if (this.game.time.time > this.nextFire) {
                var bullet = this.bullets.getFirstExists(false)
                if (bullet) {
                    bullet.reset(this.x, this.y)
                    bullet.lifespan = config.BULLET_LIFE_SPAN
                    bullet.rotation = this.rotation
                    bullet.body.bounce.setTo(1,1)
                    bullet.body.friction.setTo(0,0)
                    this.game.physics.arcade.velocityFromRotation(
                        bullet.rotation + this.game.rnd.realInRange(-config.BULLET_ANGLE_ERROR, config.BULLET_ANGLE_ERROR), 
                        config.BULLET_VELOCITY, bullet.body.velocity
                    )
                    // fire rate
                    this.nextFire = this.game.time.time + config.BULLET_FIRE_RATE
                }
            }
        }    
    } 
    
    update() {
        this.moveAndTurn()
        this.fireBullet()
        //this.emitter.emitParticle()

        this.emitter.emitX = this.x;
        this.emitter.emitY = this.y;    
    }
}
