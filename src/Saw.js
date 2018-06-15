
class Saw extends Phaser.Sprite {
    constructor(game, x, y, img, type) {
        super(game, x, y, img)
        this.scale.setTo(1.5,1.5)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)

        this.body.setSize(32, 32, 16, 16)
        this.body.isCircle = true
        
        var left = 0
        var up  = 0
        var right = game.width
        var down  = game.height
        var hDelay = game.width/(config.SAW_VELOCITY/1000)
        var vDelay = game.height/(config.SAW_VELOCITY/1000)
        
        if (type == 'T') { // top
            game.add.tween(this)
                .to( { x: right, y: up }, hDelay/2 )
                .to( { x: right, y: down }, vDelay )
                .to( { x: left, y: down }, hDelay )
                .to( { x: left, y: up }, vDelay )
                .to( { x: x, y: y }, hDelay/2 )
                .loop(-1)
                .start()
        } else
        if (type == 'R') { // right
            game.add.tween(this)
                .to( { x: right, y: down }, vDelay/2 )
                .to( { x: left, y: down }, hDelay )
                .to( { x: left, y: up }, vDelay )
                .to( { x: right, y: up }, hDelay )
                .to( { x: x, y: y }, vDelay/2 )
                .loop(-1)
                .start()        
        } else
        if (type == 'D') { // down
            game.add.tween(this)
                .to( { x: left, y: down }, hDelay/2 )
                .to( { x: left, y: up }, vDelay )
                .to( { x: right, y: up }, hDelay )
                .to( { x: right, y: down }, vDelay )
                .to( { x: x, y: y }, hDelay/2 )            
                .loop(-1)
                .start()        
        } else
        if (type == 'L') { // left
            game.add.tween(this)
                .to( { x: left, y: up }, vDelay/2 )
                .to( { x: right, y: up }, hDelay )
                .to( { x: right, y: down }, vDelay )
                .to( { x: left, y: down }, hDelay )
                .to( { x: x, y: y }, vDelay/2 )            
                .loop(-1)
                .start()        
        }
                    
        game.add.tween(this)
            .to ( { alpha: 0.6 }, 500 )
            .to ( { alpha: 1.0 }, 500 )
            .loop(-1)
            .start()
    
        game.add.tween(this)
            .to ( { angle: -359 }, 2000 )
            .loop(-1)
            .start()
    }        
}