const QuadTree2 = require('./quadtree_concise.js')

// Declare variables and functions
let ex_grid_1, ex_output_1, ex_grid_2, ex_output_2
let testMatch

// Main function
const main = () => {
  let qtree_1 = new QuadTree2(ex_grid_1)
  let result_1 = testMatch(qtree_1.render(), ex_output_1)
  console.log('test_1', result_1)
  if (!result_1) {
    console.log('my_output:', qtree_1.render())
    console.log('ex_output:', ex_output_1)
  }

  let qtree_2 = new QuadTree2(ex_grid_2)
  let result_2 = testMatch(qtree_2.render(), ex_output_2)
  console.log('test_2', result_2)
  if (!result_2) {
    console.log('my_output:', qtree_2.render())
    console.log('ex_output:', ex_output_1)
  }
}

// Populate variables
ex_grid_1 = [
  [0, 1],
  [1, 0],
]

ex_output_1 = [
  [0, 1],
  [1, 0], [1, 1], [1, 1], [1, 0]
]

ex_grid_2 = [
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
]

ex_output_2 = [
  [0, 1],
  [1, 1], [0, 1], [1, 1], [1, 0],
  null, null, null, null,
  [1, 0], [1, 0], [1, 1], [1, 1]
]

// Populate testMatch function
testMatch = function(output, expected) {
  if (output.length !== expected.length) return false

  const matchValues = output.map((out, index) => {
    if (out[0] === 0 && expected[index][0] === 0) return true
    if (out[0] === 1 && expected[index][0] === 1 && out[1] === expected[index][1])
      return true
    return false
  })

  return matchValues.every(value => value)
}

// Run the main function
main()

