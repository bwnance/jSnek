const Pos = require("./pos.js")
class Board{
  constructor(snake, $el){
    this.snake = snake;
    this.$el = $el;
    this.grid = [];
    this.gridSize = 15;
  }
  randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  updateGridClass(pos, className){
 
    let $li = this.getFromPos(pos);
    $li.removeClass("snakeGrid nothing apple").addClass(className);
    $li.css("border-radius", 0);
    $li.empty();
    if (pos.eq(this.snake.head)) {
      let $div = $("<div></div>");
      $div.append("^.^");
      $div.addClass("snake-face");
      $li.append($div);
      $li.css("border", "3px solid white");
    }
    if(className==="snakeGrid"){
      let $lis = $("li");
      $lis.each(i=>{
        let $el = $($lis[i]);
        if(!this.snake.head.eq($el.data("pos"))){
          $el.empty();
          $el.css("border", "0");
        }
      })
    }
  }
  resetGridClass(pos){
    this.updateGridClass(pos, "nothing");
  }
  addAppleClass(pos){
    let $li = this.getFromPos(pos);
    $li.removeClass("snakeGrid nothing apple").addClass("apple");
    $li.css("border-radius", 50);

  }
  initBoard(){
    let $ul = $("<ul></ul>");
    $ul.addClass("board");
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = this.grid[i] || [];
      for (let j = 0; j < this.gridSize; j++) {
        let $li = $("<li></li>");
        let pos = new Pos(i, j);
        $li.data("pos", pos);
        $li.addClass("pixel");
        this.setAtPos(pos, $li);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
  getFromPos(pos){
    return this.grid[pos.x][pos.y];
  }
  setAtPos(pos, val){
    this.grid[pos.x][pos.y] = val;
  }
  addApple(){
    let pos = new Pos(this.randomNum(0, this.gridSize - 1), this.randomNum(0, this.gridSize - 1));
    while(this.getFromPos(pos).hasClass("snakeGrid")){
      pos = new Pos(this.randomNum(0, this.gridSize - 1), this.randomNum(0, this.gridSize - 1));
    }
    this.addAppleClass(pos);
    this.snake.applePos = pos;
  }
}

module.exports = Board;