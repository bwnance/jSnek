const Pos = require("./pos.js")
class Snake{
  constructor(){
    this.directions = {"N": [-1,0], "S": [1,0], "E": [0,1], "W": [0,-1]};
    this.segments = [new Pos(7,8)];
    this.head = this.segments[0];
    this.currentDir = "N";
    this.maxLength = 1;
    this.newSegment = null;
    this.removedSegment = null;
    this.turnQueue = [];
    this.gameover = false;
    this.applePos = null;
  }
  randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  _turn(direction){ //dir is -1 or 1, -1 for left, 1 for right
    let newDirection = null;
    if(direction === "E"){
      switch (this.currentDir){
        case "N":
          newDirection = "E";
        break;
        case "E":
        break;
        case "S":
          newDirection = "E";
        break;
        case "W":
        break;
      }
    }
    else if(direction === "W"){
      switch (this.currentDir) {
        case "N":
          newDirection = "W";
          break;

        case "E":
          break;

        case "S":
          newDirection = "W";
          break;

        case "W":
          break;

      }
    }
    else if(direction === "N"){
      switch (this.currentDir) {
        case "N":
          break;

        case "E":
          newDirection = "N";
          break;

        case "S":
          break;

        case "W":
          newDirection = "N";
          break;

      }
    }
    else if(direction === "S"){
      switch (this.currentDir) {
        case "N":
          break;

        case "E":
          newDirection = "S";
          break;

        case "S":
          break;

        case "W":
          newDirection = "S";
          break;

      }
    }
    if(newDirection){
      let index = this.randomNum(0, 2);
      $(".move-noise")[index].play();

      this.currentDir = newDirection;
    }
  }
  turn(direction){
    if(this.turnQueue.length > 2){
      this.turnQueue.shift();
    }
    this.turnQueue.push(direction);
  }
  move(){
    this._turn(this.turnQueue.shift());
    let dirCoords = this.directions[this.currentDir];
    let newPos = this.head.clone();
    newPos = newPos.plusArr(dirCoords);
    if(this.isOnBoard(newPos) && !this.isSnake(newPos)){
      if(newPos.x === this.applePos.x && newPos.y === this.applePos.y){
        this.applePos = null;
        this.maxLength+=2;
      }
      this.newSegment = newPos;
      this.segments.unshift(newPos);
      if (this.segments.length > this.maxLength) {
        this.updateHead();
        //debugger;
        this.removedSegment = this.segments.pop();
      }
      this.updateHead();
    }
    else{
      return false;
    }
    return true;
  }
  isSnake(pos){
    let retVal = false;
    this.segments.forEach((el)=>{
      if (pos.x === el.x && el.y === pos.y){
        retVal = true;
      }
    });
    console.log(retVal);
    return retVal;
  }
  isOnBoard(pos){
    return (pos.x >= 0 && pos.x < 15 && pos.y >= 0 && pos.y < 15)
  }
  updateHead(){
    this.head = this.segments[0];
  }
}
module.exports = Snake;