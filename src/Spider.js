class Spider extends Phaser.Sprite {
    constructor(game, x, y, img) {
        super(game, x, y, img)
        this.anchor.set(0.5, 0.5)

        this.animations.add('crawl', [0, 1, 2], 8, true);
        this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
        this.animations.play('crawl');

        this.game.physics.enable(this)
        this.body.gravity.y = 700

        this.body.collideWorldBounds = true
        this.body.velocity.x = 200
    }
}