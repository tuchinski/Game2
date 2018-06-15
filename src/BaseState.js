'use strict'

class BaseState extends Phaser.State {
  
    initFullScreenButtons() {
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        
        let fullScreenButton = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        fullScreenButton.onDown.add(this.toggleFullScreen, this)    
/*
        // full screen touch button
        let fullScreenIcon = this.game.add.sprite(this.game.width - 10, this.game.height - 10, 
            'fullscreen-button')
        fullScreenIcon.anchor.setTo(1, 1)
        fullScreenIcon.scale.setTo(0.75, 0.75)
        fullScreenIcon.inputEnabled = true
        fullScreenIcon.events.onInputDown.add(this.toggleFullScreen, this)        
        fullScreenIcon.fixedToCamera = true
*/
    } 

    createText(x, y, string, size=16) {
        let style = { font: `bold ${size}px Arial`, fill: 'white' }
        let text = this.game.add.text(x, y, string, style)
        //text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2)
        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.anchor.setTo(0.5, 0.5)
        text.fixedToCamera = true
        return text
    }

    toggleFullScreen() {
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        if (this.scale.isFullScreen) {
            this.scale.stopFullScreen();
        } else {
            this.scale.startFullScreen(false);
        }
    }
}