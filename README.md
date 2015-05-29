# simpleavltree

A simple AVL tree implementation.

## Install
```
$ npm install --save simpleavltree
```
## Basic Usage
```js
var AVLTree = require('simpleavltree');

/**
 * Build the AVL tree
 */
var tree = new AVLTree(44);
tree.insert(17)
  	.insert(78)
  	.insert(32)
  	.insert(88)
  	.insert(50)
  	.insert(48)
  	.insert(62)
  	.insert(54);

/**
 * Delete a node from the tree
 */
 tree.search(54).deleteNode();

/**
 * Populate an array from traversing (in order) the tree
 */
 var arr = tree.traverse();

 arr.forEach(function (val) {
	console.log(val.value);
});
```

## Tree Methods

### insert()
Takes an int as input and inserts the new node into the tree

### insert() Example
```js
var AVLTree = require('simpleavltree');

/**
 * Build the AVL tree
 */
var tree = new AVLTree(44);
tree.insert(17)
  	.insert(78);
```

### search()
Takes an int as input and returns the node that was searched for.

### search() Example
```js
var AVLTree = require('simpleavltree');

/**
 * Build the AVL tree
 */
var tree = new AVLTree(44);
tree.insert(17)
  	.insert(78);

var searchedNode = tree.search(54)
```

### delete()
Takes a node as input and deletes it from the tree.

### delete() Example
```js
var AVLTree = require('simpleavltree');

/**
 * Build the AVL tree
 */
var tree = new AVLTree(44);
tree.insert(17)
  	.insert(78);

/**
 * Delete a node from the tree
 */
tree.search(54).deleteNode();
```

### traverse()
Takes a configuration object specifying the traversal order.
```js
{
  inOrder:false,
  preOrder:false,
  postOrder:true
}
```

### traverse() Example
```js
var AVLTree = require('simpleavltree');

/**
 * Build the AVL tree
 */
var tree = new AVLTree(44);
tree.insert(17)
  	.insert(78);

var arr = tree.traverse({inOrder:false,preOrder:false,postOrder:true});  

arr.forEach(function (val) {
 console.log(val.value);
});

```
