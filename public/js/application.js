$(document).ready(function() {
  // levelData = { size: { x: 8, y: 8 },
  //               pieces : [{x: 0, y: 0, type: 'Movable'},
  //                         {x: 1, y: 3, type: 'Movable'},
  //                         {x: 2, y: 0, type: 'Movable'},
  //                         {x: 6, y: 3, type: 'Movable'},
  //                         {x: 7, y: 6, type: 'Movable'},
  //                         {x: 2, y: 0, type: 'Movable'},
  //                         {x: 2, y: 0, type: 'Movable'},
  //                         {x: 5, y: 1, type: 'Fixed'},
  //                         {x: 4, y: 2, type: 'Fixed'},
  //                         {x: 7, y: 2, type: 'Fixed'},
  //                         {x: 2, y: 5, type: 'Fixed'},
  //                         {x: 2, y: 3, type: 'Fixed'},
  //                         {x: 4, y: 3, type: 'Fixed'},
  //                         {x: 4, y: 4, type: 'Fixed'},
  //                         {x: 7, y: 5, type: 'Fixed'},
  //                         {x: 2, y: 6, type: 'Fixed'},
  //                         {x: 6, y: 6, type: 'Fixed'},
  //                         {x: 2, y: 7, type: 'Fixed'}]}

  levelData = { size: { x: 2, y: 2 },
                pieces : [{x: 0, y: 0, type: 'Movable'},
                          {x: 1, y: 1, type: 'Movable'}]}

  board = new Board(levelData)

  // var levelDimensions = {'x': 5, 'y': 5}
  // one = new ScreenUtil(levelDimensions)
  // one.colorGrid([{x: 3, y: 1, color: 'red'}])
});
