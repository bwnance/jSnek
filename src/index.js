const SnakeView = require("./snake-view.js");



$(() => {
  const rootEl = $('.snake');
  let snake = new SnakeView(rootEl);
  snake.startGame();

});

