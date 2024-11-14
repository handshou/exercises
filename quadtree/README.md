# Quadtree (Nov 2024)

## Files

```
.
├── main.js         // Test logic
└── quadtree.js     // Class
```

Run: `node main.js`

## Test Case 1

### Output

```
[ 0, 0 ]
[ 1, 0 ]
[ 1, 1 ]
[ 1, 1 ]
[ 1, 0 ]
```

Passed, but refer to Test Case 2 for format

## Test Case 2

### Logic 

If the current grid has the same value (i.e all 1's or all 0's) 
  set isLeaf True and set val to the value of the grid 
  and set the four children to Null and stop.
If the current grid has different values, 
  set isLeaf to False and set val to any value 
  and divide the current grid into four sub-grids as shown in the photo.
Recurse for each of the children with the proper sub-grid.

### Modifications

```javascript
  render() {
    if (!this.isLeaf) {
      console.log(this.print())
      this.split(this.getGrid())
      console.log(this.topLeft.print())
      console.log(this.topRight.print())
      console.log(this.bottomLeft.print())
      console.log(this.bottomRight.print())
      this.topLeft.render()
      this.topRight.render()
      this.bottomLeft.render()
      this.bottomRight.render()
    }
  }
```

### Output

```
[ false, 1 ]
[ true, 1 ]
[ false, 0 ]
[ true, 1 ]
[ true, 0 ]
[ false, 0 ]
[ true, 0 ]
[ true, 0 ]
[ true, 1 ]
[ true, 1 ]
```

### What is wrong

- Print when isLeaf=false => Revise root and branch logic, print root
- Print is missing null values when entire quadTree isLeaf
- Perhaps the entire Print and branch logic should change
- Render should return an array to output => Remove use of console.log 