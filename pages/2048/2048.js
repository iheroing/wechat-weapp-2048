var Board = require("./grid.js");
var Main = require("./main.js");
var CivilServant = require("./civilServant.js");

Page({ 
  data: {
    hidden: false,
    start: "开始游戏",
    num: [],
    score: 0,
    bestScore: 0, // 最高分
    endMsg: '',
    over: false,  // 游戏是否结束
    civilServant: null // 公务员职级映射
  },
  // 页面渲染完成
  onReady: function () {
    if(!wx.getStorageSync("highScore"))
      wx.setStorageSync('highScore', 0);
    this.setData({
      civilServant: new CivilServant()
    });
    this.gameStart();
  },
  gameStart: function() {  // 游戏开始
    var main = new Main(4);
    this.setData({
      main: main,
      bestScore: wx.getStorageSync('highScore')
    });
    this.data.main.__proto__ = main.__proto__;
    
    // 初始化时也需要转换数据格式
    this.updateView(this.data.main.board.grid);
    
    this.setData({
      hidden: true,
      over: false,
      score: 0
    });  
  },
  gameOver: function() {  // 游戏结束
    this.setData({
      over: true 
    });
  
    if (this.data.score >= 12) {
      this.setData({ 
        endMsg: '恭喜晋升一级巡视员！'
      });
      wx.setStorageSync('highScore', this.data.score);
    } else if (this.data.score > this.data.bestScore) {
      this.setData({
        endMsg: '创造新纪录！' 
      }); 
      wx.setStorageSync('highScore', this.data.score);
    } else {
      this.setData({
        endMsg: '游戏结束！'
      }); 
    } 
  },
  // 触摸
  touchStartX: 0,
  touchStartY: 0,
  touchEndX: 0,
  touchEndY: 0,
  touchStart: function(ev) { // 触摸开始坐标
    var touch = ev.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;

  },
  touchMove: function(ev) { // 触摸最后移动时的坐标
    var touch = ev.touches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
  },
  touchEnd: function() {
    var disX = this.touchStartX - this.touchEndX;
    var absdisX = Math.abs(disX);
    var disY = this.touchStartY - this.touchEndY;
    var absdisY = Math.abs(disY);

    if(this.data.main.isOver()) { // 游戏是否结束
      this.gameOver();
    } else {
      if (Math.max(absdisX, absdisY) > 10) { // 确定是否在滑动
          this.setData({
            start: "重新开始",
          });
        var direction = absdisX > absdisY ? (disX < 0 ? 1 : 3) : (disY < 0 ? 2 : 0);  // 确定移动方向
        var data = this.data.main.move(direction);
        this.updateView(data);
      }   
    }      
  },
  updateView(data) {
    var max = 0;
    // 转换数字为职级名称
    var displayData = [];
    for(var i = 0; i < 4; i++) {
      displayData[i] = [];
      for(var j = 0; j < 4; j++) {
        if(data[i][j] != "") {
          displayData[i][j] = {
            level: data[i][j],
            name: this.data.civilServant.getLevelName(data[i][j])
          };
          if(data[i][j] > max)
            max = data[i][j];
        } else {
          displayData[i][j] = "";
        }
      }
    }
    this.setData({
      num: displayData,
      score: max,
      scoreName: this.data.civilServant.getLevelName(max),
      bestScoreName: this.data.civilServant.getLevelName(this.data.bestScore)
    });
  },
  onShareAppMessage: function() {
    return {
      title: '公务员晋升小游戏',
      desc: '来试试你能晋升到什么职级',
      path: '/page/user?id=123'
    }
  }
})