$(document).ready(function() {
  levelData = { size: { x: 5, y: 5 },
                pieces : [{x: 0, y: 0, type: 'Movable'},
                          {x: 1, y: 3, type: 'Movable'},
                          {x: 2, y: 0, type: 'Movable'},
                          {x: 0, y: 1, type: 'Fixed'},
                          {x: 0, y: 2, type: 'Fixed'},
                          {x: 4, y: 3, type: 'Fixed'}]}

  board = new Board(levelData)

  // var levelDimensions = {'x': 5, 'y': 5}
  // one = new ScreenUtil(levelDimensions)
  // one.colorGrid([{x: 3, y: 1, color: 'red'}])
});
