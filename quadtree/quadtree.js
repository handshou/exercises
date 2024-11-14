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

    /**
     * @return void
     */
    this.processQuad = function() {
      assert(Array.isArray(this.getGrid()), 'Expect this.getGrid() to be a non-null array')
      let val = this.getGrid()[0][0]
      const isLeaf = Number(this.getGrid().flat().every((element) => {
        return element === 1 || element === 0 // ensure element is either 1 or 0
      }) && this.getGrid().flat().every((element, _index, arr) => element === arr[0]))
      this.setIsLeaf(isLeaf)
      this.setVal(val)
    }
    this.processQuad()
  }

  /**
   * @param {number[][]} grid
   * @return void
   */
  split(grid) {
    const { topLeftQuad, topRightQuad, bottomLeftQuad, bottomRightQuad } = _processGrid(grid)
    this.topLeft = new QuadTree(topLeftQuad)
    this.topRight = new QuadTree(topRightQuad)
    this.bottomLeft = new QuadTree(bottomLeftQuad)
    this.bottomRight = new QuadTree(bottomRightQuad)

    /**
     * @param {number[][]} grid
     * @return {{topLeftQuad: number[][], topRightQuad: number[][], bottomLeftQuad: number[][], bottomRightQuad: number[][]}}
     */
    function _processGrid(grid) {
      const axis = grid[0].length / 2
      const topLeftQuad = _sliceGrid(grid, 0, 0, axis)
      const topRightQuad = _sliceGrid(grid, axis, 0, axis)
      const bottomLeftQuad = _sliceGrid(grid, 0, axis, axis)
      const bottomRightQuad = _sliceGrid(grid, axis, axis, axis)
      return { topLeftQuad, topRightQuad, bottomLeftQuad, bottomRightQuad }
    }

    /**
     * @param {number[][]} grid
     * @param {number} x starting column position on (x-axis) to slice (top left)
     * @param {number} y starting row position on (y-axis) to slice (top left)
     * @param {number} length represents height or width of quadrant
     * @return {number[][]}
     */
    function _sliceGrid(grid, x, y, length) {
      assert(Array.isArray(grid))
      return grid.slice(y, y + length).map((row) => {
        assert(Array.isArray(row))
        return row.slice(x, x + length)
      })
    }
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

  render(result = []) {
    result.push(this.print())
    if (!this.isLeaf) {
      this.split(this.getGrid())
      this.topLeft.render(result)
      this.topRight.render(result)
      this.bottomLeft.render(result)
      this.bottomRight.render(result)
    }

    return result
  }

  print() {
    return [this.isLeaf, this.val]
  }
}

module.exports = QuadTree

