(function() {
  if (typeof window.SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = window.SnakeGame.Snake = function () {
    this.dir = "N";
    var head = [Math.floor(SnakeGame.Board.DIM / 2), Math.floor(SnakeGame.Board.DIM / 2)]
    this.segments = [head, [head[0], head[1] + 1], [head[0], head[1] + 2],
                    [head[0], head[1] + 3], [head[0], head[1] + 4]];
    this.pivots = [];
  };

  Snake.prototype.move = function () {
    var head = this.segments.slice(0, 1)[0]
    this.segments.pop();
    var next = this.nextPos(head);
    this.segments.unshift(next);
  };

  Snake.prototype.nextPos = function (pos) {
    switch (this.dir) {
      case "N":
        return ([pos[0], pos[1] - 1]);
        break;
      case "S":
        return ([pos[0], pos[1] + 1]);
        break;
      case "E":
        return ([pos[0] + 1, pos[1]]);
        break;
      case "W":
        return ([pos[0] - 1, pos[1]]);
        break;
      default:
        return pos;
        break;
    }
  }

  Snake.DIRS = ['N', 'S', 'E', 'W'];
  Snake.OPPS = ['S', 'N', 'W', 'E'];

  Snake.prototype.turn = function (direction) {
    var idx = Snake.OPPS.indexOf(direction)
    var jdx = Snake.DIRS.indexOf(this.dir)
    if (idx !== jdx) {
      this.dir = direction;
    }
  };

  Snake.prototype.isOverlapped = function () {
    var head = this.segments.slice(0, 1)[0];
    console.log(head);
    var next = this.nextPos(head);
    console.log(next);
    var body = this.segments.slice(0, this.segments.length - 1);
    var included = false;
    for (var i = 0; i < body.length; i++) {
      if (body[i][0] === next[0] && body[i][1] === next[1]) {
        included = true;
      }
    }
    return included;
  };

  var Board = window.SnakeGame.Board = function () {
    this.snake = new Snake();
    this.setupGrid();
  };

  Board.DIM = 10;

  Board.prototype.setupGrid = function() {
    var arr = [];
    for (var i = 0; i < Board.DIM; i++) {
      arr.push([]);
      for (var j = 0; j < Board.DIM; j++) {
        arr[i][j] = ".";
      }
    }
    this.grid = arr;
  };

  Board.prototype.isOutOfBounds = function () {
    var head = this.snake.nextPos(this.snake.segments[0]);
    return ((head[0] < 0 || head[0] > Board.DIM) || (head[1] < 0 || head[1] > Board.DIM));
  };

  Board.prototype.render = function () {
    this.setupGrid();
    for (var i = 0; i < this.snake.segments.length; i++) {
       this.grid[this.snake.segments[i][1]][this.snake.segments[i][0]] = "S";
    }

    return JSON.stringify(this.grid);
  };

  Board.prototype.step = function () {
    console.log(this.lost());
    this.snake.move();
    console.log(this.render());
  };

  Board.prototype.lost = function () {
    return (this.snake.isOverlapped() || this.isOutOfBounds());
  };

})();
