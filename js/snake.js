(function() {
  if (typeof window.SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  console.log("SNAKE LOADED!");

  var Snake = window.SnakeGame.Snake = function () {
    this.dir = "N";
    var head = [Math.floor(SnakeGame.Board.DIM_X / 2), Math.floor(SnakeGame.Board.DIM_Y / 2)]
    this.segments = [head, [head[0], head[1] + 1], [head[0], head[1] + 2],
                    [head[0], head[1] + 3], [head[0], head[1] + 4]];
    this.pivots = [];
  };

  Snake.prototype.move = function () {
    var head = this.segments.slice(0, 1)[0]
    this.segments.pop();
    switch (this.dir) {
      case "N":
        console.log(head)
        this.segments.unshift([head[0], head[1] - 1]);
        break;
      case "S":
        this.segments.unshift([head[0], head[1] + 1]);
        break;
      case "E":
        this.segments.unshift([head[0] + 1, head[1]]);
        break;
      case "W":
        this.segments.unshift([head[0] - 1, head[1]]);
        break;
      default:
        break
    }
  };

  Snake.prototype.turn = function (direction) {
    this.dir = direction;
  };

  var Board = window.SnakeGame.Board = function () {
    this.snake = new Snake();
    this.setupGrid();
  };

  Board.DIM_X = 10;
  Board.DIM_Y = 10;

  Board.prototype.setupGrid = function() {
    var arr = [];
    for (var i = 0; i < Board.DIM_Y; i++) {
      arr.push([]);
      for (var j = 0; j < Board.DIM_X; j++) {
        arr[i][j] = ".";
      }
    }
    this.grid = arr;
  };

  Board.prototype.render = function () {
    this.setupGrid();
    for (var i = 0; i < this.snake.segments.length; i++) {
       this.grid[this.snake.segments[i][1]][this.snake.segments[i][0]] = "S";
    }

    return JSON.stringify(this.grid);
  };

  Board.prototype.step = function () {
    this.snake.move();
    this.render();
  };

})();
