'use strict'

class BootState extends Phaser.State {

    preload() {
        this.game.load.image('sky', 'assets/sky.png')
        this.game.load.image('plane1', 'assets/airplane1.png')
        this.game.load.image('shot', 'assets/shot.png')
        this.game.load.image('wall', 'assets/wall.png')
        this.game.load.image('fog', 'assets/fog.png')
        this.game.load.image('saw', 'assets/saw.png')
        this.game.load.image('smoke', 'assets/smoke.png')
        this.game.load.image('title', 'assets/title.png')
        this.game.load.image('newPlayer', 'assets/wabbit.png')

        

        this.game.load.spritesheet('vstick_button', 'assets/button_action.png', 50, 50);
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50);

        this.game.load.spritesheet('explosion', 'assets/explosion.png', 56, 56)
        this.game.load.spritesheet('coin', 'assets/coin_spritesheet.png', 22, 22)
        this.game.load.spritesheet('spider', 'assets/spider_spritesheet.png', 42, 32);

        this.game.load.spritesheet('mage', 'assets/mage.png', 64, 64)
        this.game.load.spritesheet('bats', 'assets/Bats2.png', 48, 40)

        //sound
        this.game.load.audio('sfx:coin','assets/coin_sound2.mp3')
        this.game.load.audio('sfx:jump','assets/jump.wav')
        this.game.load.audio('sfx:fall','assets/caindo.mp3')
        this.game.load.audio('sfx:gameOver','assets/tf_nemesis.mp3')
   

        // map
        this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level3', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('tiles1','assets/tileset-42x42.png');
    }

    create() {
        console.log("BootState created")
        // this.state.start('Title')
        this.state.start('Game')
    }
}