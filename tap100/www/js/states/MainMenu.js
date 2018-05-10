/* global Akutonet */

Akutonet = Akutonet || {};

Akutonet.MainMenu = function(game) {};

Akutonet.MainMenu.prototype = {
  init: Akutonet.commonInitialize,
  
  preload: function() {
    const title_asset_path = "assets/images/logo.png";
    this.game.load.image("logo", title_asset_path);
  },
  create: function() {
    console.log("MainMenu");
    
    const gwx = this.world.centerX;
    const gwy = this.world.centerY;
    
    Akutonet.BackgroundColorSet();
    Akutonet.BackgroundImageSet();
      
    const title_sprite = this.game.add.sprite(gwx, gwy-gwy/2, "logo");
    title_sprite.anchor.setTo(0.5,0.5);
    
    // const easy_button = this.game.add.button(gwx, gwy, 'button', function(){}, this, 1, 0, 2);
    // easy_button.anchor.setTo(0.5,0.5);

    Akutonet.menuFont(gwx, gwy, "64px", "Easy", function(a){
      const g = Akutonet.game;
      g.camera.fade("#000000");
      g.camera.onFadeComplete.add(function(){
        g.state.start("Game");
      },g);
    });

    // (function(){
    //   const g = Akutonet.game;
    //   setTimeout(function(){
    //     g.camera.fade('#000000');
    //     g.camera.onFadeComplete.add(function(){
    //       g.state.start("Game");
    //     },g);
    //   },1000);
    // })();
  }
}