(function() {
  if (typeof window.SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, $pointDisplay, speed) {
    this.$el = $el;
    this.$pointDisplay = $pointDisplay;
    this.$pointDisplay.html('000000');
    this.speed = speed;

    this.board = new SnakeGame.Board()

    this.setupGrid();
    this.bindEvents();

    this.paused = false;

    var view = this;
    var callback = function () {
      if (!view.step()) {
        view.generateTopScores();
        $('body').off();

        clearInterval(view.loop);
      }
    };

    this.loop = setInterval(callback, this.speed)
  };

  View.prototype.bindEvents = function () {
    var view = this;
    $('#primary').prop('focus', true);

    var view = this;

    $('body').on("keydown", function (event) {
      var dir = false

      switch (event.keyCode) {
        case 32:
          if (!view.paused) {
            view.paused = true;
            clearInterval(view.loop);
            break;
          } else {
            view.paused = false;
            view.loop = setInterval(function () {
              if (!view.step()) {
                view.generateTopScores();
                $('body').off();

                clearInterval(view.loop);
              }
            }, view.speed);
            break;
          }
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
      $('.start').prop("disabled", false);
      
      var snake = $('.snake')
      snake.addClass('dead');
      snake.removeClass('.snake');

      alert("Game Over.");

      window.SnakeGame.Scores.push({points: this.board.points, speed: this.speed});

      return false;
      this.$el.off("keydown");
    } else {
      var next = this.board.snake.nextSquare();
      var test = this.board.grid[next[1]][next[0]];
      if (test === "a") {
        this.board.snake.eatApple(next);
        this.board.points += 100 * (200 / this.speed);
        this.$pointDisplay.html(this.prettyPoints(this.board.points));
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
  },

  View.prototype.prettyPoints = function (points) {
    var stringified = String(points);
    var len = stringified.length;
    var dif = 0;

    if (len < 6) {
      dif = 6 - len;
    }

    var pretty = points;
    for (var i = 0; i < dif; i++) {
      pretty = "0" + pretty;
    }

    return pretty;
  },

  View.prototype.generateTopScores = function () {
    var $table = $('table')
    $table.empty();
    $table.html("<tr class='table-headers'><th>Score</th><th>Speed</th></tr>")
    var sorter = function (a, b) {
      if (a.points < b.points) {
        return 1;
      } else {
        return -1;
      }
    };
    var sorted = window.SnakeGame.Scores.sort(sorter);
    _.each(sorted.slice(0, 12), function (obj) {
      var string = "<tr><td>" + obj.points + "</td><td>" + obj.speed + "</td></tr>"
      $table.append(string);
    });
  }
})();
