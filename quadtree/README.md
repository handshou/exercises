# Quadtree (Nov 2024)

## Files

```
.
├── main.js         // Test logic
└── quadtree.js     // Class
```

Run: `node main.js`

### Logic 

1. If the current grid has the same value (i.e all 1's or all 0's) 
  set isLeaf True and set val to the value of the grid 
  and set the four children to Null and stop.

1. If the current grid has different values, 
  set isLeaf to False and set val to any value 
  and divide the current grid into four sub-grids as shown in the photo.

1. Recurse for each of the children with the proper sub-grid.

## Test Case 1

### Output
```
[ 
    [ 0, 1 ], 
    [ 1, 0 ], [ 1, 1 ], 
    [ 1, 1 ], [ 1, 0 ],
]

```

### Expected

```
[
    [ 0, 0 ],
    [ 1, 0 ], [ 1, 1 ],
    [ 1, 1 ], [ 1, 0 ],
]
```

Passed

## Test Case 2

### Strategy

```javascript
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
```

### Output

```
[ 
  [ 0, 1 ], 
  [ 1, 1 ], [ 1, 0 ],

  [ 1, 1 ],             [ 1, 0 ],
]
```

### Expected
```
[
  [ 0, 1 ], 
  [ 1, 1 ],     [ 0, 1 ], 
  [ 1, 1 ],     [ 1, 0 ], 
  null,         null,     
  null,         null,     
  [ 1, 0 ],    [ 1, 0 ], 
  [ 1, 1 ],    [ 1, 1 ],
]

```

Failed

### What is wrong

- Even when strategy looks correct, the output has:
- Print has wrong sequence
- Print is missing null values when entire quadTree isLeaf
- Implying that strategy is likely wrong

### Hints

- Consider merging quadrants
- Or applying coordinate AABB strategy

