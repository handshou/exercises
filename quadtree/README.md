# Quadtree (Nov 2024)

## Files

```
.
├── main.js                 // Test logic
├── quadtree.js             // Class v1  
└── improved_quadtree.js    // Class v2 (*new*)
```

Run: `node main.js`

## Test Case 2

### Quadtree Grid

```javascript
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
```

## Slice(), Flat(), Every()

### Key Operations
1. **Initialization (`constructor`)**:
   - The constructor checks if the grid is a leaf by flattening and checking uniformity of values.
   - **Complexity**: $O(N)$, where $N$ is the number of elements in the grid.

2. **Splitting the Grid (`split` method)**:
   - The grid is divided into 4 quadrants using `_processGrid` and `_sliceGrid`.
   - Slicing is performed for each quadrant:
     - `slice()` is $O(k)$, where $k$ is the number of elements being sliced.
     - Four quadrants are processed, and each has $\frac{N}{4}$ elements recursively.
   - **Time Complexity**: $O(N)$ per level of recursion (total work for 4 slices of $\frac{N}{4}$ elements).
   - This happens for $\log(N)$ levels (until each quadrant is size 1).

3. **Processing Nodes (`processQuad`)**:
   - It checks if all elements in the grid are 0 or 1 and if the grid is uniform.
   - Flattening (`flat()`) is $O(N)$, and the uniformity check is $O(N)$.
   - **Time Complexity**: $O(N)$.

4. **Recursive Rendering (`render`)**:
   - This method traverses the entire tree recursively.
   - Every node is visited once.
   - **Time Complexity**: $O(N)$ for traversal across $N$ elements.

## Current Strategy

### Time Complexity
1. **Tree Construction**:
   - The grid is split recursively, and at each level, the work is proportional to $O(N)$.
   - Total levels of recursion: $\log(N)$ (as the grid is divided by 4 at each step).
   - Total time complexity:
   $$O(N \cdot \log(N))$$

2. **Processing the QuadTree**:
   - Every node is processed at most once, and processing each node takes $O(N)$ time.
   - Combined with tree construction, the overall time complexity remains:
   $$O(N \cdot \log(N))$$

### Total Time Complexity:
$$
O(N \cdot \log(N))
$$

### Space Complexity
1. **Recursive Stack**:
   - Each level of recursion splits the grid into 4 quadrants and processes them.
   - Maximum depth of recursion: $\log(N)$ (as the grid size is halved at each step).
   - **Space Complexity for Recursive Stack**: $O(\log(N))$.

2. **Tree Storage**:
   - The tree consists of $O(N)$ nodes.
   - Each node stores a reference to its child nodes and a small amount of metadata.
   - **Space Complexity for Tree Storage**: $O(N)$.

3. **Temporary Storage (e.g., `slice()` results)**:
   - Temporary arrays for slicing are proportional to the size of the quadrants.
   - Total space for temporary storage: $O(N)$.

### Total Space Complexity:
$$
O(N)
$$

## New Strategy, Written Notes
![written notes](notes.png)

## Miscellaneous

### Summary of Complexities

| **Operation**        | **Time Complexity**       | **Space Complexity**       |
|-----------------------|---------------------------|-----------------------------|
| **Tree Construction** | $O(N \cdot \log(N))$      | $O(N)$                      |
| **Tree Processing**   | $O(N \cdot \log(N))$      | $O(N)$                      |
| **Recursive Stack**   | -                         | $O(\log(N))$                |

### Definitions

#### Imperative vs Declarative
Imperative focuses on the *how*, while declarative focuses on the *what*.

The concise quadtree is more imperative than the first quadtree class. To achieve conciseness, named functions `_splitGrid` and `_processGrid` are removed. Instead, additional parameters in the constructor and in-line splitting when invoking the constructor are used.

The concise quadtree improves space complexity, from $O(N \cdot \log(N))$ to $O(N)$. The $O(\log(N))$ improvement is due to discarding a copy of elements at each level of the quadtrees.

