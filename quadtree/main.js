const QuadTree = require('./quadtree.js')

const ex_grid_1 = [
  [0,1],[1,0]
]

const ex_output_1 = [
  [0,1],
  [1,0],[1,1],[1,1],[1,0]
]

const ex_grid_2 = [
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
]

const ex_output_2 = [
  [0, 1], 
  [1, 1], [0, 1], [1, 1], [1, 0], 
  null, null, null, null, 
  [1, 0], [1, 0], [1, 1], [1, 1]
]

console.log('ex_1')
let qt = new QuadTree(ex_grid_1)
qt.render()
console.log('ex_output:', ex_output_1)

console.log('ex_2')
qt = new QuadTree(ex_grid_2)
qt.render()
console.log('ex_output:', ex_output_2)

