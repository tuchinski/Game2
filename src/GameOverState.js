
class GameOverState extends BaseState {
    create(){
        this.hud = {
            text1: this.createText(this.game.width * 1/2, 100, 'GAME OVER')
        }
        
    }

}