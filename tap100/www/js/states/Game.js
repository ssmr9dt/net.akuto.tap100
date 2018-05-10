/* global Akutonet */

Akutonet = Akutonet || {};

Akutonet.Game = function() {};

Akutonet.gameConfig = {
  cellNum: 2, nl: 2, remainTime: 3 * 1000
};

Akutonet.Game.prototype = {
  init: Akutonet.commonInitialize,
  
  preload: function() {
    // const frame_asset_path = "assets/images/frame.png";
    // this.game.load.image("frame", frame_asset_path);
  },

  create: function() {
    
    const gwx = this.world.centerX;
    const gwy = this.world.centerY;
    
    Akutonet.BackgroundColorSet();
    Akutonet.BackgroundImageSet();
    
    var max = Akutonet.gameConfig.cellNum;
    var nl = Akutonet.gameConfig.nl;
    
    if (Math.ceil(max/nl) >= 4) {
      Akutonet.gameConfig.nl += 1;
      nl += 1;
    }
    var size = ~~(this.game.width/nl) - 60/nl;
    
    if (size * (max/nl) > this.game.height - 60 - 120) {
      size = ~~(this.game.height/(max/nl)) - 60/(max/nl) - 120;
    }
    
    var count = 0;
    
    Akutonet.frm = [];
    Akutonet.labelScore = [];
    
    var position = [];
    for (var i=0; i<max; i++) {
      const wx = gwx + (i - Math.floor(i/nl) * nl) * size - (nl*size)/2 + (size/2);
      const wy = gwy + Math.floor(i/nl) * size - size * (max/nl)/2 + size/2;
      
      position.push([wx,wy]);
    }
    console.log(this.game.input);
    this.game.input.onDown.add(function(pointer){
      console.log(pointer);
    },this);
    
    shuffle(position);
    
    for (var i=0; i<max; i++) {
      var frm = Akutonet.createFrame(size*0.9, size*0.9 ,3);
// var debugfrm = Akutonet.createDebugBackground(size,size);
// debugfrm.position.setTo(wx,wy);
      const wx = position[i][0];
      const wy = position[i][1];
      frm.position.setTo(wx,wy);
      frm.inputEnabled = true;
      frm.anchor.setTo(0.5, 0.5);
      frm.scale.setTo(0, 0);
      this.game.add.tween(frm.scale).to({x:1.0, y:1.0}, 100).start();
      frm.array_index = i;
      Akutonet.frm[i] = frm;

      const labelScore = this.game.add.text(wx, wy, i+1, {
        font: "Graduate", fontSize: (size/2)+"px", fill: "#ffffff" });
      this.game.add.tween(labelScore).to({alpha:1},200).start();
      labelScore.alpha = 0.0;
      labelScore.anchor.setTo(0.5, 0.5);
      Akutonet.labelScore[i] = labelScore;
      
      Akutonet.frm[i].events.onInputDown.add(function(a){
        const speed_time = 500;
        const idx = a.array_index;
        
        if (count !== idx) {
          var x = Akutonet.labelScore[idx].position.x;
          Akutonet.game.add.tween(Akutonet.frm[idx]).to({x:x+5},10).to({x:x-5},10).to({x:x},10).start();
          return;
        }
        
        count++;
        
        // console.log("count: "+count);
        
        Akutonet.game.add.tween(Akutonet.labelScore[idx]).to({angle:360, alpha:0}, speed_time).start();
        Akutonet.game.add.tween(Akutonet.labelScore[idx].scale).to({x:0, y:0}, speed_time).start();
        Akutonet.game.add.tween(Akutonet.frm[idx]).to({angle:360, alpha:0}, speed_time).start();
        var tw = Akutonet.game.add.tween(Akutonet.frm[idx].scale).to({x:1.1,y:1.1}, speed_time/2).to({x:0, y:0}, speed_time/2);
        tw.start();
        
        if (count === max) {
          tw.onComplete.add(function(g){
            const gwx = Akutonet.game.world.centerX;
            const gwy = Akutonet.game.world.centerY;
            
            Akutonet.GameOverTimer.gameTimer.timer.stop();
            this.game.time.events.remove(Akutonet.GameOverTimer.gameTimer);
            
            const labelTitle = this.game.add.text(gwx, gwy/2, "Stage Clear", {
              font: "Graduate", fontSize: "72px", fill: "#000000" });
            labelTitle.anchor.setTo(0.5,0.5);
      
            Akutonet.menuFont(gwx, gwy+gwy/2, "64px", "> Next", function(a,g){
              Akutonet.gameConfig.cellNum += 1;
              Akutonet.gameConfig.remainTime += 4000;
              
              g.game.state.start("Game");
            });
            
            const labelBonus = this.game.add.text(gwx, gwy+gwy/2+32+10, "bonus +4 sec", {
              font: "Graduate", fontSize: "20px", fill: "#ffffff" });
            labelBonus.anchor.setTo(0.5, 0.5);
          });
        }
      },this);
    }
    
    
    //----------------------
    Akutonet.GameOverTimer = {};
    var timer = Akutonet.GameOverTimer;
    timer.startTime = new Date();
    timer.prevTime = timer.startTime;
    timer.timeRemaining = Akutonet.gameConfig.remainTime;

    this.createTimer();
    timer.gameTimer = this.game.time.events.loop(50, this.updateTimer, this);
    timer.gameTimer.timer.start(0);
  },
  
  createTimer: function() {
    var timer = Akutonet.GameOverTimer;
    timer.timeLabel = this.game.add.text(20, 18, "Time:", {
      font: "Graduate", fontSize: "20px", fill: "#ffffff" });
    timer.timeLabel.anchor.setTo(0, 0);
    timer.timeLabel.align = 'center';
  },
  
  updateTimer: function(){
    var timer = Akutonet.GameOverTimer;
    
    var currentTime = new Date();
    var timeElapsed = currentTime.getTime() - timer.prevTime.getTime();
    
    timer.prevTime = currentTime;
    
    timer.timeRemaining -= timeElapsed;
    Akutonet.gameConfig.remainTime = timer.timeRemaining;
    
    var result = timer.timeRemaining / 1000;
    timer.timeLabel.text = "Time: " + result;
    
    if (timer.timeRemaining <= 0) {
      const g = Akutonet.game;
      timer.gameTimer.timer.stop();
      g.time.events.remove(timer.gameTimer);
      timer.timeLabel.text = "Time: 0";
      Akutonet.gameConfig.remainTime = 0;
      g.camera.fade("#000000");
      g.camera.onFadeComplete.add(function(){
        g.state.start("GameOver");
      },g);
    }
  }
};

function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}