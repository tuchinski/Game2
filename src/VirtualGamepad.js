class VirtualGamepad extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, null)
        this.game = game
        this.dpadCallbacks = null
        this.dpad = null
        this.game.input.maxPointers = 2 // only two touch pointers are captured
    }

    addDPadButton(x, y, buttonImg, callbacks) {
        let button = this.createSprite(x, y, buttonImg)
        this.dpad = button
        this.dpadCallbacks = callbacks
        return button
    }

    addActionButton(x, y, buttonImg, actionCallback) {
        let button = this.createSprite(x, y, buttonImg)
        button.events.onInputDown.add(function() {button.frame = 1; actionCallback()})
        button.events.onInputUp.add  (function() {button.frame = 0})
        return button
    }
    
    createSprite(x, y, buttonImg) {
		let button = this.game.add.sprite(x, y, buttonImg);
		button.fixedToCamera = true;
        button.anchor.setTo(0.5, 0.5)
        button.scale.setTo(2, 2)
        button.alpha = 0.7
        button.inputEnabled = true
        button.smoothed = false
        return button;
    }

    update() {
        let pointer1 = this.game.input.pointer1
        let pointer2 = this.game.input.pointer2    
        let mouse = this.game.input.mousePointer

        let pointer = null
        if (pointer1.active && this.dpad.getBounds().contains(pointer1.x, pointer1.y)) {
            pointer = pointer1
        }
        if (pointer2.active && this.dpad.getBounds().contains(pointer2.x, pointer2.y)) {
            pointer = pointer2
        }
        if (mouse.active && this.dpad.getBounds().contains(mouse.x, mouse.y)) {
            pointer = mouse
            // console.log('mouse')
        }
        // console.log(`mouse: ${mouse.x}, dpad: ${this.dpad.cameraOffset.x}`)

        this.dpadCallbacks.leftReleased()
        this.dpadCallbacks.rightReleased()                
        this.dpad.frame = 0

        if (pointer != null) {
            let x = pointer.x - this.dpad.cameraOffset.x
            this.dpad.frame = 1
            if (x > 0) {// right
                this.dpad.scale.x = 2
                this.dpadCallbacks.rightPressed()
                // console.log("RIGHT")
            } else { // left
                this.dpad.scale.x = -2
                this.dpadCallbacks.leftPressed()
                // console.log("LEFT")
            }
        }
    }
}