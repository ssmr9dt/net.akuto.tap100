/* global Akutonet */

Akutonet = {};

Akutonet.Boot = function(game){};

Akutonet.Boot.prototype = {
  init: Akutonet.commonInitialize,
  
  create: function() {
    console.log("Boot");
    this.camera.flash("#000000");
    
    Akutonet.BackgroundColorSet();
    Akutonet.BackgroundImageSet();
    
    Akutonet.gameConfig = 
    Akutonet.setupGameConfig = {
      cellNum: 2,
      nl: 2,
      remainTime: 20 * 1000
    };
    
    Akutonet.game.state.start("MainMenu");
  }
};