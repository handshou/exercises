class QuadTree {
  constructor(grid, x = 0, y = 0, len = grid.length) {
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

    this.processLeaf()
  }

  processLeaf() {
    this.val = this.grid[this.y][this.x]
    for (let i = this.y; i < this.y + this.len; i++) {
      for (let j = this.x; j < this.x + this.len; j++) {
        const element = this.grid[i][j]
        if (element !== this.val) {
          this.isLeaf = 0
          return
        }
      }
    }
  }

  split() {
    const halfLen = this.len / 2
    this.tl = new QuadTree(this.grid, this.x, this.y, halfLen)
    this.tr = new QuadTree(this.grid, this.x + halfLen, this.y, halfLen)
    this.bl = new QuadTree(this.grid, this.x, this.y + halfLen, halfLen)
    this.br = new QuadTree(this.grid, this.x + halfLen, this.y + halfLen, halfLen)
  }

  print() {
    return [this.isLeaf, this.val]
  }

  render(result = []) {
    result.push(this.print())
    if (!this.isLeaf) {
      this.split()
      this.tl.render(result)
      this.tr.render(result)
      this.bl.render(result)
      this.br.render(result)
    }
    return result
  }
}
module.exports = QuadTree
