class QuadTree {
  constructor(grid, x = 0, y = 0, len = grid.length, degree = 0) {
    this.grid = grid
    this.degree = degree
    this.x = x
    this.y = y
    this.len = len
    this.isRoot = (this.grid.length === this.len)
    this.isProcessed = 0

    this.val = 0
    this.isLeaf = 0
    this.tl = null
    this.tr = null
    this.bl = null
    this.br = null
  }

  processNode() {
    const hasChildren = this.tl && this.tr && this.bl && this.br
    if (hasChildren) {
      const childrenValuesSame = this.tl.getVal() === this.tr.getVal() &&
        this.tr.getVal() === this.bl.getVal() &&
        this.bl.getVal() === this.br.getVal()
      const childrenAreLeaves = this.tl.getIsLeaf() === this.tr.getIsLeaf() &&
        this.tr.getIsLeaf() === this.bl.getIsLeaf() &&
        this.bl.getIsLeaf() === this.br.getIsLeaf()
      if (childrenAreLeaves && childrenValuesSame) {
        this.isLeaf = 1
        this.val = this.tl.getVal()
      }
      if (!childrenAreLeaves) {
        this.isLeaf = 0
      }
      this.isProcessed = 1
      return
    }
    this.val = this.grid[this.y][this.x]
    this.isLeaf = 1
    this.isProcessed = 1
  }

  split() {
    const halfLen = this.len / 2
    this.tl = new QuadTree(this.grid, this.x, this.y, halfLen, this.degree + 1)
    this.tr = new QuadTree(this.grid, this.x + halfLen, this.y, halfLen, this.degree + 1)
    this.bl = new QuadTree(this.grid, this.x, this.y + halfLen, halfLen, this.degree + 1)
    this.br = new QuadTree(this.grid, this.x + halfLen, this.y + halfLen, halfLen, this.degree + 1)
  }

  print() {
    return [this.isLeaf, this.val]
  }

  getVal() {
    return this.val
  }

  getIsLeaf() {
    return this.isLeaf
  }

  getChildren() {
    return [this.tl, this.tr, this.bl, this.br]
  }
  logBase(n, base = Math.E) { Math.log(n) / Math.log(base) }

  build(result = [], stack = new Array(this.logBase(this.len * this.len, 4))) {
    // breadth first search - gud
    // number of levels = log~4 n = log~4(len * len)
    // use stack, if no children, split recursively and add to stack
    // if grid size === 1, process and pop next on stack
    // if have children, process and pop next on stack
    // if root, print and go to top left child 

    // depth first search - no gud
    if (!this.isProcessed) {
      if (this.len === 1) {
        this.processNode()
        return
      }

      // quadtree construction does not have to follow BFS, can be DFS
      const hasChildren = this.tl && this.tr && this.bl && this.br
      if (!hasChildren) {
        if (!stack[this.degree]) stack[this.degree] = []
        stack[this.degree].push(this)
        this.split()
        this.tl.build([], stack)
        this.tr.build([], stack)
        this.bl.build([], stack)
        this.br.build([], stack)
      }

      // quadtree processing 
      stack.forEach(level => {
        level.forEach(node => {
          node.processNode()
        })
      })

    }

    //stack.forEach((level, stack_index) => {
    //  level.forEach((node) => {

    //    result.push(node.print())
    //    stack[stack_index].pop()
    //    node.getChildren().forEach(child => {

    //      result.push(child.print())
    //    })
    //  })
    //})

    //if (!this.isLeaf) {
    //  result.push(this.tl.print())
    //  result.push(this.tr.print())
    //  result.push(this.bl.print())
    //  result.push(this.br.print())
    //}

    // result processing
    // printing has to be breadth first, the tail null values are discarded
    // discarded by popping all tail leaf nodes
    // when node with isLeaf is false, print children nodes tl tr bl br 
    // if isLeaf is true, print null for children nodes

    return result
  }

  render(result = []) {
    this.build()
    const queue = [this]

    while (queue.length > 0) {
      const node = queue.shift()

      if (node) {
        result.push(node.print())

        if (!node.isLeaf) {
          const children = node.getChildren()
          queue.push(...children)
        } else {
          queue.push(null, null, null, null)
        }
      } else {
        result.push(null)
      }
    }
    // Trim trailing nulls
    while (result[result.length - 1] === null) {
      result.pop()
    }
    return result
  }
}
module.exports = QuadTree
