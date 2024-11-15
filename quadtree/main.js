// class
const QuadTree = require('./quadtree.js')

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

let qtree_1 = new QuadTree(ex_grid_1)
console.log('test_1', testMatch(qtree_1.render(), ex_output_1))
console.log('my_output:', qtree_1.render())
console.log('ex_output:', ex_output_1)

let qtree_2 = new QuadTree(ex_grid_2)
console.log('test_2', testMatch(qtree_2.render(), ex_output_2))
console.log('my_output_2:', qtree_2.render())
console.log('ex_output:', ex_output_2)

// recursion
const Node = function(grid, x, y, len) {
  this.grid = grid
  this.x = x
  this.y = y
  this.len = len
  this.isRoot = (this.grid.length === this.len)

  this.val = 0
  this.isLeaf = 1
  this.tl = null
  this.tr = null
  this.bl = null
  this.br = null

  this.processLeaf = function() {
    this.val = this.grid[this.y][this.x]
    for (let i = this.y; i < this.len; i++) {
      for (let j = this.x; j < this.len; j++) {
        const element = this.grid[i][j]
        if (element !== this.val) {
          this.isLeaf = 0
          return
        }
      }
    }
  }

  this.split = function() {
    const halfLen = this.len / 2
    this.tl = new Node(this.grid, this.x, this.y, halfLen)
    this.tr = new Node(this.grid, this.x + halfLen, this.y, halfLen)
    this.bl = new Node(this.grid, this.x, this.y + halfLen, halfLen)
    this.br = new Node(this.grid, this.x + halfLen, this.y + halfLen, halfLen)
  }

  this.print = function() {
    return ([this.isLeaf, this.val])
  }

  this.render = function(result = []) {
    result.push(this.print())
    if (this.isLeaf) {
    } else {
      this.split()
      this.tl.render(result)
      this.tr.render(result)
      this.bl.render(result)
      this.br.render(result)
    }

    return result
  }

  this.processLeaf()
}

const recursion_1 = new Node(ex_grid_1, 0, 0, ex_grid_1.length)
// console.log('my_output_1 -', recursion_1.render())
// console.log('ex_output_1 -', ex_output_1)

const recursion_2 = new Node(ex_grid_2, 0, 0, ex_grid_2.length)
// console.log('my_output_2 -', recursion_2.render())
// console.log('ex_output_2 -', ex_output_2)
