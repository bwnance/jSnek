/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Pos = __webpack_require__(/*! ./pos.js */ \"./src/pos.js\")\nclass Board{\n  constructor(snake, $el){\n    this.snake = snake;\n    this.$el = $el;\n    this.grid = [];\n    this.gridSize = 15;\n  }\n  randomNum(min, max) {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min)) + min;\n  }\n  updateGridClass(pos, className){\n \n    let $li = this.getFromPos(pos);\n    $li.removeClass(\"snakeGrid nothing apple\").addClass(className);\n    $li.css(\"border-radius\", 0);\n    $li.empty();\n    if (pos.eq(this.snake.head)) {\n      let $div = $(\"<div></div>\");\n      $div.append(\"^.^\");\n      $div.addClass(\"snake-face\");\n      $li.append($div);\n      $li.css(\"border\", \"3px solid white\");\n    }\n    if(className===\"snakeGrid\"){\n      let $lis = $(\"li\");\n      $lis.each(i=>{\n        let $el = $($lis[i]);\n        if(!this.snake.head.eq($el.data(\"pos\"))){\n          $el.empty();\n          $el.css(\"border\", \"0\");\n        }\n      })\n    }\n  }\n  resetGridClass(pos){\n    this.updateGridClass(pos, \"nothing\");\n  }\n  addAppleClass(pos){\n    let $li = this.getFromPos(pos);\n    $li.removeClass(\"snakeGrid nothing apple\").addClass(\"apple\");\n    $li.css(\"border-radius\", 50);\n\n  }\n  initBoard(){\n    let $ul = $(\"<ul></ul>\");\n    $ul.addClass(\"board\");\n    for (let i = 0; i < this.gridSize; i++) {\n      this.grid[i] = this.grid[i] || [];\n      for (let j = 0; j < this.gridSize; j++) {\n        let $li = $(\"<li></li>\");\n        let pos = new Pos(i, j);\n        $li.data(\"pos\", pos);\n        $li.addClass(\"pixel\");\n        this.setAtPos(pos, $li);\n        $ul.append($li);\n      }\n    }\n    this.$el.append($ul);\n  }\n  getFromPos(pos){\n    return this.grid[pos.x][pos.y];\n  }\n  setAtPos(pos, val){\n    this.grid[pos.x][pos.y] = val;\n  }\n  addApple(){\n    let pos = new Pos(this.randomNum(0, this.gridSize - 1), this.randomNum(0, this.gridSize - 1));\n    while(this.getFromPos(pos).hasClass(\"snakeGrid\")){\n      pos = new Pos(this.randomNum(0, this.gridSize - 1), this.randomNum(0, this.gridSize - 1));\n    }\n    this.addAppleClass(pos);\n    this.snake.applePos = pos;\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SnakeView = __webpack_require__(/*! ./snake-view.js */ \"./src/snake-view.js\");\n\n\n\n$(() => {\n  const rootEl = $('.snake');\n  let snake = new SnakeView(rootEl);\n  snake.startGame();\n\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/pos.js":
/*!********************!*\
  !*** ./src/pos.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Pos{\n    constructor(x, y){\n        this.x = x;\n        this.y = y;\n    }\n    eq(pos){\n        return (pos.x === this.x && pos.y === this.y)\n    }\n    plus(pos){\n        return new Pos(pos.x+self.x, pos.y+self.y);\n    }\n    plusArr(arr){\n        return new Pos(this.x + arr[0], this.y+arr[1]);\n    }\n    clone(){\n        return new Pos(this.x, this.y);\n    }\n}\n\nmodule.exports = Pos;\n\n//# sourceURL=webpack:///./src/pos.js?");

/***/ }),

/***/ "./src/snake-view.js":
/*!***************************!*\
  !*** ./src/snake-view.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\");\nconst Snake = __webpack_require__(/*! ./snake.js */ \"./src/snake.js\");\nclass SnakeView{\n  constructor($el){\n    this.$el = $el;\n  }\n  startGame(){\n    this.snake = new Snake();\n    this.board = new Board(this.snake, this.$el);\n    this.setupBoard();\n    let boundGL = this.gameLoop.bind(this);\n    this.intervalId = setInterval(boundGL, 100);\n    let boundOnKey = this.onKey.bind(this);\n    this.board.addApple();\n    this.addKeyHandler(boundOnKey);\n    this.score = 0;\n    this.displayScore();\n    setTimeout(() => $(\"#start-game\")[0].play(), 10);\n\n\n\n }\n  setupBoard(){\n   this.board.initBoard();\n  }\n  onKey(e){\n    if(e.keyCode == 37){\n      this.snake.turn(\"W\");\n    }\n    else if(e.keyCode == 39){\n      this.snake.turn(\"E\");\n    }\n    else if(e.keyCode == 38){\n      this.snake.turn(\"N\");\n    }\n    else if(e.keyCode == 40){\n      this.snake.turn(\"S\");\n    }\n  }\n  displayScore(){\n    $(\".scoreboard\").remove();\n    let $h1 = $(\"<h1></h1>\");\n    $h1.addClass(\"scoreboard\");\n    $h1.append(\"Score: \").append(this.score);\n    this.$el.append($h1);\n  }\n  gameLoop() {\n    let gameover = !this.snake.move();\n    if (gameover){\n      this.endGame();\n    }\n    else{\n      if (this.snake.applePos ==  null){\n        this.board.addApple();\n        this.score += 1;\n        $(\"#apple-eat\")[0].play();\n        this.displayScore();\n      }\n      if(this.snake.newSegment !== null){\n        this.board.updateGridClass(this.snake.newSegment, \"snakeGrid\");\n        this.snake.newSegment = null;\n      }\n      if(this.snake.removedSegment !== null){\n        this.board.updateGridClass(this.snake.removedSegment, \"nothing\");\n        this.snake.removedSegment = null;\n      }\n    }\n\n  }\n  addKeyHandler(callback){\n    $(\"html\").keydown(callback);\n  }\n  removeKeyHandler(){\n    $(\"html\").off(\"keydown\");\n  }\n  restartGame(e){\n    if(e.keyCode === 32){\n      this.$el.empty();\n      $(\".gameover-message\").remove();\n      this.removeKeyHandler();\n      this.startGame();\n    }\n  }\n  endGame(){\n    $(\"#gameover\")[0].play();\n    this.removeKeyHandler();\n    clearTimeout(this.intervalId);\n    let $h1 = $(\"<h1></h1>\");\n    let $body = $(\"body\");\n    $h1.append(\"You Lose!<br>Press space to restart.\").addClass(\"gameover-message\");\n    $body.append($h1);\n    let boundRestart = this.restartGame.bind(this);\n    this.addKeyHandler(boundRestart);\n  }\n}\nmodule.exports = SnakeView;\n\n//# sourceURL=webpack:///./src/snake-view.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Pos = __webpack_require__(/*! ./pos.js */ \"./src/pos.js\")\nclass Snake{\n  constructor(){\n    this.directions = {\"N\": [-1,0], \"S\": [1,0], \"E\": [0,1], \"W\": [0,-1]};\n    this.segments = [new Pos(7,8)];\n    this.head = this.segments[0];\n    this.currentDir = \"N\";\n    this.maxLength = 1;\n    this.newSegment = null;\n    this.removedSegment = null;\n    this.turnQueue = [];\n    this.gameover = false;\n    this.applePos = null;\n  }\n  randomNum(min, max) {\n    min = Math.ceil(min);\n    max = Math.floor(max);\n    return Math.floor(Math.random() * (max - min)) + min;\n  }\n  _turn(direction){ //dir is -1 or 1, -1 for left, 1 for right\n    let newDirection = null;\n    if(direction === \"E\"){\n      switch (this.currentDir){\n        case \"N\":\n          newDirection = \"E\";\n        break;\n        case \"E\":\n        break;\n        case \"S\":\n          newDirection = \"E\";\n        break;\n        case \"W\":\n        break;\n      }\n    }\n    else if(direction === \"W\"){\n      switch (this.currentDir) {\n        case \"N\":\n          newDirection = \"W\";\n          break;\n\n        case \"E\":\n          break;\n\n        case \"S\":\n          newDirection = \"W\";\n          break;\n\n        case \"W\":\n          break;\n\n      }\n    }\n    else if(direction === \"N\"){\n      switch (this.currentDir) {\n        case \"N\":\n          break;\n\n        case \"E\":\n          newDirection = \"N\";\n          break;\n\n        case \"S\":\n          break;\n\n        case \"W\":\n          newDirection = \"N\";\n          break;\n\n      }\n    }\n    else if(direction === \"S\"){\n      switch (this.currentDir) {\n        case \"N\":\n          break;\n\n        case \"E\":\n          newDirection = \"S\";\n          break;\n\n        case \"S\":\n          break;\n\n        case \"W\":\n          newDirection = \"S\";\n          break;\n\n      }\n    }\n    if(newDirection){\n      let index = this.randomNum(0, 2);\n      $(\".move-noise\")[index].play();\n\n      this.currentDir = newDirection;\n    }\n  }\n  turn(direction){\n    if(this.turnQueue.length > 2){\n      this.turnQueue.shift();\n    }\n    this.turnQueue.push(direction);\n  }\n  move(){\n    this._turn(this.turnQueue.shift());\n    let dirCoords = this.directions[this.currentDir];\n    let newPos = this.head.clone();\n    newPos = newPos.plusArr(dirCoords);\n    if(this.isOnBoard(newPos) && !this.isSnake(newPos)){\n      if(newPos.x === this.applePos.x && newPos.y === this.applePos.y){\n        this.applePos = null;\n        this.maxLength+=2;\n      }\n      this.newSegment = newPos;\n      this.segments.unshift(newPos);\n      if (this.segments.length > this.maxLength) {\n        this.updateHead();\n        //debugger;\n        this.removedSegment = this.segments.pop();\n      }\n      this.updateHead();\n    }\n    else{\n      return false;\n    }\n    return true;\n  }\n  isSnake(pos){\n    let retVal = false;\n    this.segments.forEach((el)=>{\n      if (pos.x === el.x && el.y === pos.y){\n        retVal = true;\n      }\n    });\n    console.log(retVal);\n    return retVal;\n  }\n  isOnBoard(pos){\n    return (pos.x >= 0 && pos.x < 15 && pos.y >= 0 && pos.y < 15)\n  }\n  updateHead(){\n    this.head = this.segments[0];\n  }\n}\nmodule.exports = Snake;\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ })

/******/ });