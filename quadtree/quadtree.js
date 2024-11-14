const assert = require('assert')

class QuadTree {
  constructor(grid) {
    this.grid = grid
    this.isLeaf = 0
    this.val = 0 // if isLeaf = 0, val can be anything (1 or 0)
    this.topLeft = null
    this.topRight = null
    this.bottomLeft = null
    this.bottomRight = null
    this._processQuad(this)
  }

  getGrid() {
    return this.grid
  }

  setIsLeaf(isLeaf) {
    this.isLeaf = isLeaf
  }

  setVal(val) {
    this.val = val
  }

  /**
   * @param {QuadTree} quadTree
   * @return void
   */
  _processQuad(quadTree) {
    const qt = quadTree.getGrid()
    console.log('qt', qt)
    assert(Array.isArray(qt), 'Expect qt to be a non-null array')
    let val = 0
    const isLeaf = qt.flat().every((element) => {
      val = element // set element value
      return element === 1 || element === 0 // ensure element is either 1 or 0
    })
    quadTree.setIsLeaf(isLeaf)
    quadTree.setVal(val)
  }

  /**
   * @param {number[][]} grid
   * @return void
   */
  split(grid) {
    const { topLeftQuad, topRightQuad, bottomLeftQuad, bottomRightQuad } = this._processGrid(grid)
    this.topLeft = new QuadTree(topLeftQuad)
    this.topRight = new QuadTree(topRightQuad)
    this.bottomLeft = new QuadTree(bottomLeftQuad)
    this.bottomRight = new QuadTree(bottomRightQuad)
  }

  /**
   * @param {number[][]} grid
   * @return {{topLeftQuad: number[][], topRightQuad: number[][], bottomLeftQuad: number[][], bottomRightQuad: number[][]}}
   */
  _processGrid(grid) {
    const axis = grid[0].length / 2
    const topLeftQuad = this._sliceGrid(grid,0,0,axis)
    const topRightQuad = this._sliceGrid(grid,axis,0,axis)
    const bottomLeftQuad = this._sliceGrid(grid,0,axis,axis)
    const bottomRightQuad = this._sliceGrid(grid,axis,axis,axis)
    return { topLeftQuad, topRightQuad, bottomLeftQuad, bottomRightQuad }
  }

  _sliceGrid(grid, x, y, length) {
    assert(Array.isArray(grid))
    return grid.slice(y, y + length).map((row) => {
      assert(Array.isArray(row))
      return row.slice(x, x + length)
    })
  }

  render() {
    this.split(this.grid)
    return [
      this.topLeft.print(),
      this.topRight.print(),
      this.bottomLeft.print(),
      this.bottomRight.print(),
    ]
  }

  print() {
    return [this.isLeaf, this.val]
  }
}

const ex_grid = [
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
]

const qt = new QuadTree(ex_grid)
qt.render()

/**
 * @param {number[][]} grid
 * @return {_Node}
 */
var construct = function (grid) {
  const axisPosition = grid[0].length / 2

  const topLeftNode = grid[0][0]
  const topRightNode = grid[0][axisPosition]
  const bottomLeftNode = grid[axisPosition][0]
  const bottomRightNode = grid[axisPosition][axisPosition]
}

construct(ex_grid)

