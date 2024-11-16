# Quadtree (Nov 2024)

## Files

```
.
├── main.js                 // Test logic
├── quadtree.js             // Class v1  
└── improved_quadtree.js    // Class v2 (*new*)
```

Run: `node main.js`

## Definitions

### Imperative vs Declarative
Imperative focuses on the how, while declarative focuses on the what

The concise quadtree is more imperative than the first quadtree class.

To achieve conciseness, named functions _splitGrid and _processGrid are removed.
In place are additional parameters in the constructor and in-line splitting when invoking the constructor.

The concise quadtree improves space complexity, from O(N * log(N)) to O(N).
The factor of O(log(N)) improvement is due to discarding a copy of elements at each level of the quadtrees.

To analyze the **time complexity** and **space complexity** of this `QuadTree` class, we need to understand its structure and operations:

## Time and Space Complexity

### **Key Operations:**
1. **Initialization (`constructor`)**:
   - The constructor checks if the grid is a leaf by flattening and checking uniformity of values.
   - **Complexity**: \( O(N) \), where \( N \) is the number of elements in the grid.

2. **Splitting the Grid (`split` method)**:
   - The grid is divided into 4 quadrants using `_processGrid` and `_sliceGrid`.
   - Slicing is performed for each quadrant:
     - `slice()` is \( O(k) \), where \( k \) is the number of elements being sliced.
     - \( 4 \) quadrants are processed, and each has \( N/4 \) elements recursively.
   - **Time Complexity**: \( O(N) \) per level of recursion (total work for 4 slices of \( N/4 \) elements).
   - This happens for \( \log(N) \) levels (until each quadrant is size \( 1 \)).

3. **Processing Nodes (`processQuad`)**:
   - It checks if all elements in the grid are 0 or 1 and if the grid is uniform.
   - Flattening (`flat()`) is \( O(N) \), and the uniformity check is \( O(N) \).
   - **Time Complexity**: \( O(N) \).

4. **Recursive Rendering (`render`)**:
   - This method traverses the entire tree recursively.
   - Every node is visited once.
   - **Time Complexity**: \( O(N) \) for traversal across \( N \) elements.

### **Time Complexity Analysis**
1. **Tree Construction**:
   - The grid is split recursively, and at each level, the work is proportional to \( O(N) \).
   - Total levels of recursion: \( \log(N) \) (as the grid is divided by 4 at each step).
   - Total time complexity:
     \[
     O(N \cdot \log(N))
     \]

2. **Processing the QuadTree**:
   - Every node is processed at most once, and processing each node takes \( O(N) \) time.
   - Combined with tree construction, the overall time complexity remains:
     \[
     O(N \cdot \log(N))
     \]

### **Space Complexity Analysis**
1. **Recursive Stack**:
   - Each level of recursion splits the grid into 4 quadrants and processes them.
   - Maximum depth of recursion: \( \log(N) \) (as the grid size is halved at each step).
   - **Space Complexity for Recursive Stack**: \( O(\log(N)) \).

2. **Tree Storage**:
   - The tree consists of \( O(N) \) nodes.
   - Each node stores a reference to its child nodes and a small amount of metadata.
   - **Space Complexity for Tree Storage**: \( O(N) \).

3. **Temporary Storage (e.g., `slice()` results)**:
   - Temporary arrays for slicing are proportional to the size of the quadrants.
   - Total space for temporary storage: \( O(N) \).

### Total Space Complexity:
\[
O(N)
\]

### **Summary of Complexities**

| **Operation**        | **Time Complexity** | **Space Complexity** |
|-----------------------|---------------------|-----------------------|
| **Tree Construction** | \( O(N \cdot \log(N)) \) | \( O(N) \)            |
| **Tree Processing**   | \( O(N \cdot \log(N)) \) | \( O(N) \)            |
| **Recursive Stack**   | -                   | \( O(\log(N)) \)       |

This analysis assumes a square grid where \( N = \text{total elements in grid} = \text{width}^2 \).

---

## Recursion vs Iterative
Contention: Recursion is not necessarily worse-off than Iterative

## Current Strategy
The old strategy of splitting and computing `val` and `isLeaf` can be improved to 
have better time and space complexity. By delaying computation of `val` to leaf nodes, 
the number of computations can be delayed and run only once per leaf node. That is N computations.

By using the computed `val` attribute, each of the 4 children of a parent node can be built
and the construction of both `val` and `isLeaf` for each node is complete traversing log(N) levels.

This current strategy time complexity is, 
tree construction + tree processing,
O(N * log(N)) + O(N * log (N)).

=> O(N * log(N))

Current strategy space complexity is,
tree construction + tree processing + recursive stack,
O(N) + O(N) + O(log(N)).

=> O(N)

# Space Complexity of slice() and flat()

Let's analyze the **space complexity** of both `Array.prototype.slice()` and `Array.prototype.flat()`.

## **1. Space Complexity of `slice()`**

### How `slice()` Works:
- It creates a **new array** containing the elements within the specified range (`start` to `end`) from the original array.
- The new array is independent of the original array.

### Space Complexity:
The space complexity depends on the size of the slice being extracted:
\[
O(k),
\]
where \( k = \text{end} - \text{start} \), i.e., the number of elements in the slice.

#### Why?
- The space is required to store the new array, which holds \( k \) elements.
- No additional temporary storage (e.g., recursive stack or buffers) is used.

#### Examples:
1. **Small Slice**:
   ```javascript
   const arr = [1, 2, 3, 4, 5];
   const result = arr.slice(1, 3); // [2, 3]
   ```
   - The new array `result` has 2 elements.
   - Space complexity: \( O(2) \).

2. **Entire Array**:
   ```javascript
   const arr = [1, 2, 3, 4, 5];
   const result = arr.slice(); // [1, 2, 3, 4, 5]
   ```
   - The new array `result` has 5 elements.
   - Space complexity: \( O(5) \).

## **2. Space Complexity of `flat()`**

### How `flat()` Works:
- It creates a **new array** by flattening nested arrays up to the specified depth.
- The space required depends on:
  1. **Total number of elements** in the resulting flattened array.
  2. **Temporary storage** used during recursion or iteration.

### Space Complexity:
The space complexity for `flat()` is:
\[
O(N),
\]
where \( N \) is the total number of elements in the original array, including nested arrays.

#### Why?
- A new array is created to store all the flattened elements.
- If the array is deeply nested, additional temporary space may be required for recursive calls, but this is typically negligible compared to the space required for the flattened result.

### Breakdown of `flat()` Space Complexity:

1. **Flattening to Depth 1 (`flat(1)`)**:
   - Only the first level of nesting is flattened.
   - Space complexity: \( O(N) \), where \( N \) is the total number of elements at the first level.

2. **Flattening to `Infinity` (`flat(Infinity)`)**:
   - All levels of nesting are flattened.
   - Space complexity: \( O(N) \), where \( N \) is the total number of elements in all nested arrays combined.

3. **Recursive Stack Space (Negligible)**:
   - If `flat()` is implemented recursively, the recursion depth is proportional to the depth of nesting \( D \).
   - Stack space: \( O(D) \), where \( D \) is the maximum depth.
   - This is negligible compared to \( O(N) \) in most cases.

### Examples:

1. **Shallow Flattening (`flat(1)`)**:
   ```javascript
   const arr = [1, [2, 3], [4, [5, 6]]];
   const result = arr.flat(1); // [1, 2, 3, 4, [5, 6]]
   ```
   - The new array has \( 5 \) elements.
   - Space complexity: \( O(5) \).

2. **Deep Flattening (`flat(Infinity)`)**:
   ```javascript
   const arr = [1, [2, [3, [4, [5]]]]];
   const result = arr.flat(Infinity); // [1, 2, 3, 4, 5]
   ```
   - The new array has \( 5 \) elements.
   - Space complexity: \( O(5) \).

3. **Empty Array**:
   ```javascript
   const arr = [];
   const result = arr.flat(); // []
   ```
   - The new array is empty.
   - Space complexity: \( O(0) \).

### **Comparison of Space Complexity**

| Method   | Space Complexity                     |
|----------|--------------------------------------|
| `slice()`| \( O(k) \), where \( k = \text{end} - \text{start} \) |
| `flat()` | \( O(N) \), where \( N \) is the total number of elements |

### **Summary**
- `slice()`'s space complexity depends on the number of elements in the slice.
- `flat()`'s space complexity depends on the total number of elements in the array, including all nested levels. Temporary recursive stack space is typically negligible compared to the storage for the flattened array.

## The **time complexity** and **space complexity** for both `Array.prototype.slice()` and `Array.prototype.flat()` are the same in their respective contexts. Here's a detailed comparison:

### **Time and Space Complexity Comparison**

| Method   | **Time Complexity**                | **Space Complexity**                |
|----------|------------------------------------|-------------------------------------|
| `slice()`| \( O(k) \), where \( k \) = number of elements in the slice | \( O(k) \), where \( k \) = number of elements in the slice |
| `flat()` | \( O(N \cdot D) \), where \( N \) = total elements, \( D \) = depth | \( O(N) \), where \( N \) = total elements in the array |

### **Why Are They the Same for Each Method?**

1. **`slice()`**:
   - **Time**: The method iterates over the \( k \) elements in the specified range, resulting in \( O(k) \) time complexity.
   - **Space**: It creates a new array to store those \( k \) elements, so space complexity is also \( O(k) \).

2. **`flat()`**:
   - **Time**: The method iterates through \( N \), the total number of elements (including nested ones), and for deeply nested arrays, it performs additional checks proportional to the depth \( D \). Hence, the time complexity is \( O(N \cdot D) \).
   - **Space**: A new array is created to store the flattened elements, requiring \( O(N) \) space for all elements, regardless of depth. The temporary stack space \( O(D) \) is negligible in most cases.

### **Key Insights**:

- **For `slice()`**, time and space complexity depend on the number of elements being sliced (\( k \)).
- **For `flat()`**, time complexity is influenced by both \( N \) (number of elements) and \( D \) (depth), while space complexity depends only on \( N \) (to store all elements in the flattened array).

In general:
- If you are working with deeply nested arrays (`flat()`), time complexity is higher than space complexity due to the recursive traversal.
- For shallow operations (`slice()` or `flat(1)`), time and space complexity are equivalent because they scale linearly with the size of the result.

# Improvements: Ideal strategy and Optimisation
The ideal strategy aims to improve the time complexity by a factor of N.

## Simple Optimisations
The second **`every`** condition is redundant in the context of your code if you're only trying to determine whether the grid is uniform. Here's why:

### **Understanding the Redundancy**

1. **First Condition**: 
   ```javascript
   this.getGrid().flat().every((element) => {
       return element === 1 || element === 0
   })
   ```
   - This checks if all elements in the grid are either `1` or `0`.
   - It ensures that the grid contains **valid values** (binary values for your quadtree).

2. **Second Condition**:
   ```javascript
   this.getGrid().flat().every((element, _index, arr) => element === arr[0])
   ```
   - This checks if all elements in the grid are the **same** as the first element.
   - If this condition is true, it implies that the grid is **uniform**.

### **Why It's Redundant**
- For a quadtree that works on binary values (`0` or `1`), the **second condition** already implies the **first condition**:
  - If all elements are the same (e.g., all `0` or all `1`), then all elements must necessarily be valid binary values.
  - For example:
    - A grid like `[1, 1, 1, 1]` passes both conditions.
    - A grid like `[1, 0, 1, 1]` fails the second condition and therefore doesn't need the first.

### **When It's Not Redundant**
If your application supports additional values beyond `0` and `1`, then the first condition might still be relevant. For example:
- If grids can contain invalid numbers like `2` or `-1`, the first condition filters out invalid data.

However, if you're confident that the input grids are always binary, the first condition is unnecessary.

### **Recommended Optimization**
If the grid is guaranteed to have only binary values (`0` or `1`), you can simplify your check to just:

```javascript
this.getGrid().flat().every((element, _index, arr) => element === arr[0])
```

Otherwise, you can combine both checks in a single `every` to avoid redundant iterations:

```javascript
this.getGrid().flat().every((element, _index, arr) => {
    return (element === 0 || element === 1) && element === arr[0]
})
```

This single pass ensures the elements are both valid binary values and uniform.

---

## Written Notes on Complexity
![complexity](/notes.png)

## Formal Notes
Let's break down the **space complexity** for the quadtree-solving algorithm using the same method.

### Assumptions:
1. **N**: Number of elements in the dataset (e.g., grid cells or points).
2. **Splitting**: Each level of the quadtree splits into 4 child nodes until we reach the leaves (a single element per node).
3. **Processing**: You process the leaf nodes and assemble their parent nodes.

### Space Complexity:

#### 1. **Storage for Quadtree Nodes:**
- A quadtree has a hierarchical structure, and at each level, the number of nodes grows as \( 4^k \), where \( k \) is the level of the tree.
- The number of levels in the tree is approximately \( \log_4(N) \), since each split divides the elements into four quadrants.
- The total number of nodes in a full quadtree is:
  \[
  \text{Total nodes} = 1 + 4 + 4^2 + \dots + 4^{\log_4(N)}.
  \]
  This is a geometric series with a sum:
  \[
  S = \frac{4^{\log_4(N) + 1} - 1}{4 - 1} \approx \frac{N - 1}{3}.
  \]
  So, the number of quadtree nodes is \( O(N) \).

#### 2. **Temporary Storage for Processing:**
- Processing typically involves:
  - Storing intermediate results (e.g., computed values for leaf nodes or parent nodes).
  - Storing active nodes during traversal or processing.
- In BFS or DFS, at most one level of the quadtree is in memory at any time, which contains \( O(N) \) elements in the worst case.

#### 3. **Space for Recursive Calls (if using recursion):**
- In a recursive implementation, the depth of the recursion stack is equal to the height of the quadtree:
  \[
  \text{Height} = \log_4(N).
  \]
  Thus, the additional space for the call stack is \( O(\log_4(N)) \).

### Total Space Complexity:
- **Nodes**: \( O(N) \) (total nodes in the quadtree).
- **Temporary storage**: \( O(N) \) (active nodes per level during processing).
- **Recursive stack**: \( O(\log_4(N)) \).

Therefore, the overall space complexity is:
\[
\text{Space Complexity} = O(N).
\]

---

The **recursive stack** in the context of total space complexity refers to the memory used to store the function calls when the algorithm is implemented recursively. Each time a recursive function is called, information about the current state of the function (such as local variables, the instruction pointer, and the return address) is pushed onto the stack. This is necessary so that the program can return to the previous state after completing the recursive call.

### How it Applies to a Quadtree Algorithm:
When traversing or processing a quadtree recursively, the depth of the recursive stack depends on the **height of the quadtree**. Here's how it works:

1. **Tree Traversal**: A recursive implementation typically visits a node and then recursively processes its children (e.g., NW, NE, SW, SE). For each recursive call, a new stack frame is added.
2. **Maximum Depth**: The maximum depth of recursion is equal to the height of the quadtree, which is approximately \( \log_4(N) \). This is because the tree splits into four quadrants at each level, reducing the number of elements per quadrant exponentially.

### Example:
Imagine a quadtree with \( N = 16 \) elements:
1. The root processes all \( N = 16 \) elements at the top.
2. The first level splits into four quadrants, each processing \( N/4 = 4 \) elements.
3. This continues until the leaves, where each leaf node contains just one element.

If processed recursively:
- At the root level, the stack has **1 frame**.
- When moving to the first child (e.g., NW), a new frame is added, so the stack now has **2 frames**.
- This continues until the recursion reaches the deepest leaf, where the stack has **\(\log_4(N)\)** frames.

### Why Does Recursive Stack Matter in Space Complexity?
The stack is a form of temporary memory, and it grows as the recursion goes deeper. The total amount of memory required by the recursive stack contributes to the **overall space complexity**. 

- **If the tree is shallow** (e.g., a small \( N \)), the recursive stack is small.
- **If the tree is deep** (e.g., a very large \( N \)), the stack grows larger.

For a quadtree, the stack’s contribution is \( O(\log_4(N)) \), which is small compared to the \( O(N) \) space needed for the nodes themselves. 

### Summary:
The **recursive stack** adds temporary memory overhead proportional to the height of the quadtree. It is included in the space complexity analysis because, in recursive algorithms, the stack must be accounted for in the total memory usage.

---

## Why is space complexity additive?

### Components of Space Complexity:

1. **Quadtree Nodes**:
   - The quadtree itself requires \( O(N) \) space because there are up to \( O(N) \) nodes in the tree, depending on how the elements are split.

2. **Recursive Stack**:
   - The depth of the recursion is proportional to the **height** of the quadtree, which is \( O(\log_4(N)) \), as the tree splits into four quadrants at each level.

### Additive Nature of Space Complexity:

The total space used is the sum of these two components:
\[
\text{Total Space} = \text{Space for Nodes} + \text{Space for Recursive Stack}.
\]

- **Space for Nodes**: \( O(N) \),
- **Space for Recursive Stack**: \( O(\log_4(N)) \).

Since \( O(N) \) grows much faster than \( O(\log_4(N)) \) as \( N \) increases, the \( O(N) \) term dominates.

### Final Space Complexity:

In Big-O notation, we only keep the dominant term. Thus, the total space complexity for the quadtree-solving algorithm is:
\[
O(N).
\]

The \( O(\log_4(N)) \) contribution from the recursive stack is negligible in comparison to the \( O(N) \) space for the quadtree nodes, but it's still part of the actual memory usage. If exact memory calculations are needed, you'd add the two terms explicitly.

