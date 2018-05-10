/* global Phaser */
/* global Akutonet */

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("DOMContentLoaded", onDeviceReady, false);
//	100% of the browser window - see Boot.js for additional configuration
var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
game.global = {
    //Global Vars 
};

game.state.add("Boot", Akutonet.Boot);
game.state.add("MainMenu", Akutonet.MainMenu);
game.state.add("Game", Akutonet.Game);
game.state.add("GameOver", Akutonet.GameOver);

function onDeviceReady() {
	game.state.start("Boot");
// 	game.state.start("Game");
	Akutonet.game = game;
}


Akutonet.BackgroundColorSet = function() {
	// Akutonet.colors = ["#E27474","E08664","#CDAB51","#A5BC69","#69B27C","#5D93A7","#697CB2","#88759B","#D175B8","#939389"];
    Akutonet.color = 0x5d93a7;
    this.game.stage.backgroundColor = Akutonet.color;
};

Akutonet.BackgroundImageSet = function() {
	const g = Akutonet.game;
	const gwx = g.world.centerX;
	const gwy = g.world.centerY;
	var f = Akutonet.createFrame(g.width, g.height, 30, true);
    f.position.setTo(gwx, gwy);
};

Akutonet.commonInitialize = function() {
  var WebFontConfig = {
    google: { families: ["Graduate"] }
  };
  
  Akutonet.game.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js");
    
  Akutonet.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  Akutonet.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
}