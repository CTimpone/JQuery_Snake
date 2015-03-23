(function() {
  if (typeof window.SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board()
    this.setupGrid();
    this.bindEvents();

    var view = this;
    var callback = function () {
      if (!view.step()) {
        clearInterval(loop)
      }
    };
    var loop = window.setInterval(callback, 250)
  };

  View.prototype.bindEvents = function () {
    var view = this
    this.$el.on("keydown", function (event) {
      var dir = false
      switch (event.keyCode) {
        case 37:
          dir = 'W';
          break;
        case 38:
          dir = 'N';
          break;
        case 39:
          dir = 'E';
          break;
        case 40:
          dir = 'S';
          break;
        default:
          break;
      }
      if (dir) {
        view.board.snake.turn(dir);
      }
    })
  };

  View.prototype.step = function () {
    if (this.board.lost()) {
      alert("Game Over.");
      return false;
      this.$el.off("keydown");
    } else {
      var next = this.board.snake.nextSquare();
      var test = this.board.grid[next[1]][next[0]]
      console.log(test);
      if (test === "a") {
        this.board.snake.eatApple(next);
        this.board.apples = [];
      } else {
        this.board.snake.move(next);
      }
      this.board.render();
      this.draw();
      return true;
    }
  }

  View.prototype.setupGrid = function () {
    var $ul = $("<ul>")
    $ul.addClass("grid group");
    for (var i = 0; i < SnakeGame.Board.DIM; i++) {
      for (var j = 0; j < SnakeGame.Board.DIM; j++) {
        var pos = [i, j]
        var $li = $("<li>");
        $li.data("pos", pos);
        $ul.append($li);
      };
    };

    this.$el.append($ul);
  };

  View.prototype.draw = function () {
    var view = this;
    $(".grid").find("li").each(function(i) {
      var $li = $(this);
      $li.removeClass();
      var pos = $li.data("pos");
      var square = view.board.grid[pos[0]][pos[1]];
      if (square === "S") {
        $li.addClass("snake")
      } else if (square === "a") {
        $li.addClass("apple")
      }
    })
  }
})();
