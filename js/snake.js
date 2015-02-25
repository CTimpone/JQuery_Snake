(function() {
  if (typeof window.SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = window.SnakeGame.Snake = function () {
    this.dir = "N";
    this.segments = [Math.floor(SnakeGame.Board.DIM_X / 2), Math.floor(SnakeGame.Board.DIM_Y / 2)];
    this.pivots = [];
  };

  Snake.prototype.move = function () {
    this.segments.pop();
    var head = this.segments.slice(0, 1)
    switch (this.dir) {
      case "N":
        this.segments.unshift([head[0], head[1] - 1]);
      case "S":
        this.segments.unshift([head[0], head[1] + 1]);
      case "E":
        this.segments.unshift([head[0] + 1, head[1]]);
      case "W":
        this.segments.unshift([head[0] - 1, head[1]]);
    }
    })
  };

  Snake.prototype.turn = function (direction) {
    this.dir = direction;
  };

  var Board = window.SnakeGame.Board = function () {
    this.snake = new Snake();
  }

  Board.DIM_X = 100;
  Board.DIM_Y = 100;

  var Coord = window.SnakeGame.Coord = function () {};

  // Coord.plus = function (pos1, pos2) {
  //   return [pos1[0] + pos2[0], pos1[1] + pos2[1]];
  // };

  Coord.equals = function () {

  };

  Coord.isOpposite = function () {

  };
})();
