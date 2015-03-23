(function() {
  if (typeof window.SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = window.SnakeGame.Snake = function () {
    this.dir = "N";
    var head = [Math.floor(SnakeGame.Board.DIM / 2), Math.floor(SnakeGame.Board.DIM / 2)]
    this.segments = [head, [head[0], head[1] + 1], [head[0], head[1] + 2],
                    [head[0], head[1] + 3], [head[0], head[1] + 4]];
  };

  Snake.prototype.move = function (next) {
    this.segments.pop();
    this.segments.unshift(next);
  };

  Snake.prototype.eatApple = function (next) {
    this.segments.unshift(next);
  };

  Snake.prototype.nextSquare = function () {
    var head = this.segments.slice(0, 1)[0]
    var next = this.nextPos(head);

    return next;
  }

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
    var next = this.nextPos(head);
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
    this.apples = [];
    this.points = 0;
  };

  Board.DIM = 20;

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
    return ((head[0] < 0 || head[0] >= Board.DIM) || (head[1] < 0 || head[1] >= Board.DIM));
  };

  Board.prototype.render = function () {
    this.setupGrid();

    for (var i = 0; i < this.snake.segments.length; i++) {
       this.grid[this.snake.segments[i][1]][this.snake.segments[i][0]] = "S";
    }

    var board = this;
    if (board.apples.length === 0) {
      var flag = true;
      while (flag) {
        var randX = Math.floor(Math.random() * Board.DIM)
        var randY = Math.floor(Math.random() * Board.DIM)
        if (board.grid[randX][randY] === ".") {
          board.grid[randX][randY] = "a"
          board.apples = [randX, randY]
          flag = false;
        }
      }
    }

    this.grid[this.apples[0]][this.apples[1]] = 'a'

    return JSON.stringify(this.grid);
  };

  Board.prototype.step = function () {
    this.lost();
    this.snake.move();
    this.render();
  };

  Board.prototype.lost = function () {
    return (this.snake.isOverlapped() || this.isOutOfBounds());
  };

})();
