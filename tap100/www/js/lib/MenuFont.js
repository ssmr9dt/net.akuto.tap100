/* global Akutonet */

function menuFont(posx, posy, size, text, onInputUpCallback) {
  const g = Akutonet.game;
  const textfont = g.add.text(posx, posy, text, {
    font: "Graduate", fontSize: size, fill: "#ffffff"
  });
  
  textfont.anchor.setTo(0.5,0.5);
  textfont.inputEnabled = true;
  textfont.input.useHandCursor = true;
  textfont.events.onInputDown.add(function(a,g){
    line[0].position.set(-g.game.width,a.y-a.height/2);
    g.game.add.tween(line[0]).to({x:0},150).start();
    line[1].position.set(g.game.width,a.y+a.height/2);
    g.game.add.tween(line[1]).to({x:0},150).start();
    g.game.add.tween(a.scale).to({x:1.1,y:1.1},100).start();
  },this);
  
  textfont.events.onInputUp.add(onInputUpCallback, this);
  
  var line = [];
  for (var i=0; i<2; i++) {
    line[i] = g.add.graphics(-g.stage.game.width, 0);
    line[i].lineStyle(1, 0xffffff, 1);
    line[i].moveTo(0, 0);  
    line[i].lineTo(g.stage.game.width, 0);
  }
};

Akutonet.menuFont = menuFont;