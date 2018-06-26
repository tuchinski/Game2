'use strict'

class GameState extends BaseState {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        let skyWidth = this.game.cache.getImage('sky').width
        let skyHeight = this.game.cache.getImage('sky').height
        this.sky = this.game.add.tileSprite(
            0, 0, skyWidth, skyHeight, 'sky')
        this.sky.scale.x = this.game.width / this.sky.width
        this.sky.scale.y = this.game.height / this.sky.height
        this.sky.fixedToCamera = true

        this.fog = this.game.add.tileSprite(
            0, 0, this.game.width, this.game.height, 'fog')
        this.fog.tileScale.setTo(7, 7)
        this.fog.alpha = 0.4
        this.fog.fixedToCamera = true

        this.createTileMap()
        this.createExplosions()

        // this.player1 = new Player(this.game, 100, 100,
        //     'plane1', 0xff0000, this.createBullets(), {
        //         left: Phaser.Keyboard.LEFT,
        //         right: Phaser.Keyboard.RIGHT,
        //         up: Phaser.Keyboard.UP,
        //         down: Phaser.Keyboard.DOWN,
        //         fire: Phaser.Keyboard.UP//L
        //     })
        // this.game.add.existing(this.player1)
        // this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1); // smooth        


        //criando o player novo
        this.playerNew = new Player2(this.game, 150, 100, 'newPlayer')
        this.game.add.existing(this.playerNew)
        this.game.camera.follow(this.playerNew, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);


        this.hud = {
            text1: this.createText(this.game.width * 1 / 9, 50, 'PLAYER 1: 20'),
            text2: this.createText(this.game.width * 8 / 9, 50, 'COINS: 10')
            //fps: createHealthText(game.width*6/9, 50, 'FPS'),
        }
        this.updateHud()

        let fps = new FramesPerSecond(this.game, this.game.width / 2, 50)
        this.game.add.existing(fps)

        let fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        fullScreenButton.onDown.add(this.toggleFullScreen, this)

        // game.time.advancedTiming = true;
        // this.initFullScreenButtons()

        // let vpad = new VirtualGamepad(this.game)
        // this.game.add.existing(vpad)

        // let jumpButton = vpad.addActionButton(
        //     this.game.width - 100, this.game.height - 100, 'vstick_button',
        //     () => this.playerNew.jump())

        // let dpadButton = vpad.addDPadButton(
        //     155, this.game.height - 100, 'vstick_dpad', {
        //         leftPressed: () => this.playerNew.cursors.left.isDown = true,
        //         leftReleased: () => this.playerNew.cursors.left.isDown = false,
        //         rightPressed: () => this.playerNew.cursors.right.isDown = true,
        //         rightReleased: () => this.playerNew.cursors.right.isDown = false
        //     })
    }

    loadFile() {
        let text = this.game.cache.getText('map1');
        return text.split('\n');
    }

    createTileMap() {
        // TODO implementar leitura do arquivo de tilemap e objetos
        this.map = this.game.add.tilemap('level2')
        this.map.addTilesetImage('tiles1')

        this.mapLayer = this.map.createLayer('Tiles Layer 1')
        this.map.setCollisionBetween(1, 11, true, 'Tiles Layer 1')
        this.map.setTileIndexCallback(29, this.hitObstacle, this)

        this.obstacles = this.game.add.group()
        this.map.createFromObjects('Object Layer 1', 45, 'saw', 0, true, true, this.obstacles, Saw)

        this.coins = this.game.add.group()
        this.map.createFromObjects('Object Layer 1', 46, 'coin', 0, true, true, this.coins, Coin)

        this.spiders = this.game.add.group()
        this.map.createFromObjects('Object Layer 1', 50, 'spider', 0, true, true, this.spiders, Spider)

        this.mapLayer.resizeWorld()
    }

    hitSpikes(sprite, tile) {
        sprite.alpha = 0.5
        tile.alpha = 0
        // força atualizaçao dos tiles no map
        this.mapLayer.dirty = true
    }

    spawnCoins(x, y, type) {
        // let coin = new
    }

    spawnSaw(x, y, type) {
        let saw = new Saw(this.game, x, y, 'saw', type)
        this.obstacles.add(saw)
    }

    createSaw(x, y, type) {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 7, this.spawnSaw, this, x, y, type);
    }

    createBullets() {
        let bullets = this.game.add.group()
        bullets.enableBody = true
        bullets.physicsBodyType = Phaser.Physics.ARCADE
        bullets.createMultiple(10, 'shot')
        bullets.setAll('anchor.x', 0.5)
        bullets.setAll('anchor.y', 0.5)
        return bullets
    }

    createExplosions() {
        // cria pool de explosoes
        this.explosions = this.game.add.group()
        this.explosions.createMultiple(30, 'explosion')
        this.explosions.forEach(function (exp) {
            let anim = exp.animations.add('full', null, 60, false) // null -> array of frames
            exp.scale.setTo(0.5, 0.5)
            exp.anchor.setTo(0.5, 0.5)
            anim.onComplete.add(() => exp.kill())
        })
    }

    createExplosion(x, y) {
        let exp = this.explosions.getFirstExists(false)
        exp.reset(x, y)
        exp.animations.play('full')
    }

    toggleFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen()
        } else {
            this.game.scale.startFullScreen(false)
        }
    }

    updateBullets(bullets) {
        bullets.forEach(function (bullet) {
            this.game.world.wrap(bullet, 0, true)
        }, this)
    }

    update() {
        //    hud.fps.text = `FPS ${game.time.fps}`
        this.sky.tilePosition.x += 0.5
        this.fog.tilePosition.x += 0.3

        //moveAndStop(player1)
        // this.updateBullets(this.player1.bullets)

        // colisoes com mapa
        this.game.physics.arcade.collide(this.playerNew, this.mapLayer);

        // colisao com serras
        this.game.physics.arcade.collide(this.playerNew, this.obstacles, this.hitObstacle, null, this)

        this.game.physics.arcade.collide(this.playerNew, this.obstacles, this.hitPlayer, null, this)

        //colisao dos inimigos com a parede
        this.game.physics.arcade.collide(this.spiders, this.mapLayer)

        //colisão do player com spider
        this.game.physics.arcade.overlap(this.playerNew,this.spiders,this.hitSpider,null, this)


        // colisão com os coins
        // this.game.physics.arcade.collide(this.playerNew, this.coins, this.catchCoin, null, this)

        this.game.physics.arcade.overlap(this.playerNew, this.coins, this.catchCoin, null, this)
    }

    hitSpider(player, spider){
        if(player.body.velocity.y > 0){
            player.bounce()
            // spider.kill()
            spider.die()
        }else{
            this.game.state.restart()
        }
    }

    killBullet(bullet, wall) {
        //wall.kill()
        bullet.kill()
        this.createExplosion(bullet.x, bullet.y)


    }

    hitObstacle(player, obstacle) {
        if (player.alive) {
            player.damage(1)
            if (!player.alive)
                this.game.camera.follow(null)

            this.updateHud()
            this.game.camera.shake(0.01, 200);

            // empurra jogador na direcao oposta a da colisao
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 600, player.body.velocity)
        }
    }

    catchCoin(player, coin) {
        coin.kill()
        player.coins = player.coins + 1
        this.updateHud()
    }

    hitPlayer(player, bullet) {
        if (player.alive) {
            player.damage(1)
            //bullet.kill()
            this.createExplosion(bullet.x, bullet.y)
            this.updateHud()
            this.game.camera.shake(0.01, 200);
        }
    }

    updateHud() {
        this.hud.text1.text = `PLAYER 1: ${this.playerNew.health}`
        this.hud.text2.text = `COINS : ${this.playerNew.coins}`
    }

    render() {
        //obstacles.forEach(function(obj) { game.debug.body(obj) })
        // this.game.debug.body(this.playerNew)
        //console.log(this.game.input.pointer1)
        // console.log(this.playerNew.y)
    }
}