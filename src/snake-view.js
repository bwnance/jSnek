const Board = require("./board.js");
const Snake = require("./snake.js");
class SnakeView{
  constructor($el){
    this.$el = $el;
  }
  startGame(){
    this.snake = new Snake();
    this.board = new Board(this.snake, this.$el);
    this.setupBoard();
    let boundGL = this.gameLoop.bind(this);
    this.intervalId = setInterval(boundGL, 300);
    let boundOnKey = this.onKey.bind(this);
    this.board.addApple();
    this.addKeyHandler(boundOnKey);
    this.score = 0;
    this.displayScore();
    setTimeout(() => $("#start-game")[0].play(), 10);



 }
  setupBoard(){
   this.board.initBoard();
  }
  onKey(e){
    if(e.keyCode == 37){
      this.snake.turn("W");
    }
    else if(e.keyCode == 39){
      this.snake.turn("E");
    }
    else if(e.keyCode == 38){
      this.snake.turn("N");
    }
    else if(e.keyCode == 40){
      this.snake.turn("S");
    }
  }
  displayScore(){
    $(".scoreboard").remove();
    let $h1 = $("<h1></h1>");
    $h1.addClass("scoreboard");
    $h1.append("Score: ").append(this.score);
    this.$el.append($h1);
  }
  gameLoop() {
    let gameover = !this.snake.move();
    if (gameover){
      this.endGame();
    }
    else{
      if (this.snake.applePos ==  null){
        this.board.addApple();
        this.score += 1;
        $("#apple-eat")[0].play();
        this.displayScore();
      }
      if(this.snake.newSegment !== null){
        this.board.updateGridClass(this.snake.newSegment, "snakeGrid");
        this.snake.newSegment = null;
      }
      if(this.snake.removedSegment !== null){
        this.board.updateGridClass(this.snake.removedSegment, "nothing");
        this.snake.removedSegment = null;
      }
    }

  }
  addKeyHandler(callback){
    $("html").keydown(callback);
  }
  removeKeyHandler(){
    $("html").off("keydown");
  }
  restartGame(e){
    if(e.keyCode === 32){
      this.$el.empty();
      $(".gameover-message").remove();
      this.removeKeyHandler();
      this.startGame();
    }
  }
  endGame(){
    $("#gameover")[0].play();
    this.removeKeyHandler();
    clearTimeout(this.intervalId);
    let $h1 = $("<h1></h1>");
    let $body = $("body");
    $h1.append("You Lose!<br>Press space to restart.").addClass("gameover-message");
    $body.append($h1);
    let boundRestart = this.restartGame.bind(this);
    this.addKeyHandler(boundRestart);
  }
}
module.exports = SnakeView;