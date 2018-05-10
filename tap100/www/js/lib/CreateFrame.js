/* global Akutonet */

function createFrame(sizeWidth, sizeHeight, lineWidth, noFillFlag) {
  noFillFlag = noFillFlag || false;
  const sizeX = sizeWidth/2;
  const sizeY = sizeHeight/2;
  const frame = Akutonet.game.add.graphics(0,0);
  
  frame.clear();
  if (!noFillFlag) {
    frame.beginFill(Akutonet.color);
  }
  frame.lineStyle(lineWidth, 0xffffff, 1);
  frame.moveTo(-sizeX,-sizeY);
  frame.lineTo(sizeX,-sizeY);
  frame.lineTo(sizeX,sizeY);
  frame.lineTo(-sizeX,sizeY);
  frame.lineTo(-sizeX,-sizeY);
  if (!noFillFlag) {
    frame.endFill();
  }
  
  frame.inputEnabled = true;
  frame.input.useHandCursor = !noFillFlag;
  // console.log(frame.events);
  // frame.events.onInputDown.add(function(a,g){
  //   g.game.add.tween(a).to({angle:360}, 600).start();
  // },this);
  // Akutonet.game.add.tween(frame).to({angle:360},600).start();
  return frame;
};

Akutonet.createFrame = createFrame;

function createDebugBackground(sizeWidth, sizeHeight) {
  const sizeX = sizeWidth/2;
  const sizeY = sizeHeight/2;
  const frame = Akutonet.game.add.graphics(0,0);
  
  frame.clear();
  frame.beginFill(0xff0000);
  frame.lineStyle(0, 0xffffff, 1);
  frame.moveTo(-sizeX,-sizeY);
  frame.lineTo(sizeX,-sizeY);
  frame.lineTo(sizeX,sizeY);
  frame.lineTo(-sizeX,sizeY);
  frame.lineTo(-sizeX,-sizeY);
  frame.endFill();
  frame.alpha = 0.5;
  return frame;
}

Akutonet.createDebugBackground = createDebugBackground;