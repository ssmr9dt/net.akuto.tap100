/* global Akutonet */

Akutonet = Akutonet || {};

Akutonet.GameOver = function(game){};

Akutonet.GameOver.prototype = {
  init: Akutonet.commonInitialize,
  
  preload: function() {
    const gameover_asset_path = "assets/images/GameOver.png";
    this.game.load.image("gameover", gameover_asset_path);
  },
  
  create: function() {
    console.log("GameOver");
    
    Akutonet.BackgroundColorSet();
    Akutonet.BackgroundImageSet();
    
    const gwx = this.world.centerX;
    const gwy = this.world.centerY;
    
    const gameOver_sprite = this.game.add.sprite(gwx, gwy-gwy/2, "gameover");
    gameOver_sprite.anchor.setTo(0.5, 0.5);

    Akutonet.menuFont(gwx, gwy+gwy/2, "64px", "Giveup", function(a){
      const g = Akutonet.game;
      g.camera.fade("#000000");
      Akutonet.gameConfig = Akutonet.setupGameConfig;
      g.camera.onFadeComplete.add(function(){
        g.state.start("MainMenu");
      },g);
    });
  }
};