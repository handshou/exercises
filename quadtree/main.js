const QuadTree2 = require('./quadtree_concise.js')

const ex_grid_leaf_0 = [
  [0, 0], [0, 0]
]

const ex_grid_leaf_1 = [
  [1, 1], [1, 1]
]

const ex_grid_1 = [
  [0, 1],
  [1, 0],
]

const ex_output_1 = [
  [0, 1],
  [1, 0], [1, 1], [1, 1], [1, 0]
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

 /**
  * @param {number[][]} output - Actual response.
  * @param {number[][]} expected - Correct response.
  * @return {boolean} True when actual matches correct response.
  */
const testMatch = function(output, expected) {
  if(output.length !== expected.length)
    return false

  const matchValues = output.map((out, index) => {
      if(out[0] === 0 && expected[index][0] === 0)
        return true

      if(out[0] === 1 && expected[index][0] === 1 && out[1] === expected[index][1])
        return true
    return false
  })

  return matchValues.every(value => value)
}

let qtree_1 = new QuadTree2(ex_grid_1)
console.log('test_1', testMatch(qtree_1.render(), ex_output_1))
console.log('my_output:', qtree_1.render())
console.log('ex_output:', ex_output_1)

let qtree_2 = new QuadTree2(ex_grid_2)
console.log('test_2', testMatch(qtree_2.render(), ex_output_2))
console.log('my_output_2:', qtree_2.render())
console.log('ex_output:', ex_output_2)

