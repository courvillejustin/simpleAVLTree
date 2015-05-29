module.exports = (function () {
  var root = this;
  /**
   * [AVLNode binary search tree, without the Node class implementation]
   * @param {[type]} rootNode [description]
   */
  function AVLNode(rootNode) {
      this.left = false;
      this.right = false;
      this.parent = false;
      this.value = rootNode;
      this.height = 0;
      return this;
    }
    /**
     * [_setLeft creates a new BST object and sets the left = to the passed in value]
     * @param {[type]} insertNode [description]
     */
  var _setLeft = function (node, insertNode) {
    node.left = new AVLNode(insertNode);
    node.left.parent = node;
    return node;
  };
  /**
   * [_copyLeft copy a given node to the current one, this does NOT create a new node]
   * @param {[type]} insertNode [description]
   */
  var _copyLeft = function (node, insertNode) {
    if (insertNode) {
      node.left = insertNode;
      node.left.parent = node;
    }
    else {
      node.left = false;
    }
    return node;
  };
  /**
   * [_setRight creates a new BST object and sets the right = to the new node ]
   * @param {[type]} insertNode [description]
   * @param {[type]} root       [description]
   */
  var _setRight = function (node, insertNode) {
    node.right = new AVLNode(insertNode);
    node.right.parent = node;
    return node;
  };
  /**
   * [_copyRight copy a given node to the current one, this does NOT create a new node ]
   * @param {[Node]} insertNode [input node to copy from ]
   */
  var _copyRight = function (node, insertNode) {
    if (insertNode) {
      node.right = insertNode;
      node.right.parent = node;
    }
    else {
      node.right = false;
    }
    return node;
  };
  /**
   * [_getRoot helper utility to get the root of the tree]
   */
  var _getRoot = function (node) {
    if (node.parent) {
      return _getRoot(node.parent);
    }
    return node;
  };
  /**
   * [_tallestChild find the tallest child given a node, i.e. left or right ]
   */
  var _tallestChild = function (node) {
    if (node.left && node.right) {
      if (node.left.height > node.right.height) {
        return node.left;
      }
      else {
        return node.right;
      }
    }
    else if (node.left && !node.right) {
      return node.left;
    }
    else if (node.right && !node.left) {
      return node.right;
    }
    else {
      return false;
    }
  };
  /**
   * [_isBalanced determine if the current node is balanced or not ]
   */
  var _isBalanced = function (node) {
    var leftHeight = node.left ? node.left.height + 1 : 0;
    var rightHeight = node.right ? node.right.height + 1 : 0;
    var balance = leftHeight - rightHeight;
    if (balance < -1 || balance > 1) {
      return false;
    }
    else {
      return true;
    }
  };
  /**
   * [_setHeight given the current node, set it's height]
   */
  var _setHeight = function (node) {
    node.height = _tallestChild(node) ? _tallestChild(node).height + 1 : 0;
    return true;
  };
  /**
   * [_swap given a node swap the current node with the passed in one, retaining only the current node's parent]
   * @param  {[Node]} node [node to swap with]
   * @return {[Node]}      [the newly swapped instance of node]
   */
  var _swap = function (node, nodeToSwapWith) {
    var parent = node.parent;
    var val = nodeToSwapWith.value;
    node.left = nodeToSwapWith.left;
    node.right = nodeToSwapWith.right;
    node.parent = parent;
    node.value = val;
    return node;
  };
  /**
   * [_findInOrderChildren from a sorted array, find t0,t1,t2, and t3, i.e. the in-order children of the nodes in the array]
   * @param {[Array]} arr [in order list of nodes]
   * @return {[Array]} t [the in-order children, including falses]
   */
  var _valueNotIn = function (value, arr) {
    var check = false;
    arr.forEach(function (node) {
      if (value === node.value) {
        check = true;
      }
    });
    return check;
  };
  /**
   * [_findInOrderChildren description]
   * @param {[type]} arr [description]
   */
  var _findInOrderChildren = function (arr) {
    var t = [];
    arr.forEach(function (node) {
      if (node.left) {
        if (!_valueNotIn(node.left.value, arr)) {
          t.push(node.left);
        }
      }
      if (!node.left) {
        t.push(false);
      }
      if (node.right) {
        if (!_valueNotIn(node.right.value, arr)) {
          t.push(node.right);
        }
      }
      if (!node.right) {
        t.push(false);
      }
    });
    return t;
  };
  /**
   * [calculateBalance determines the balance of the node, and then recursively calls the parent until the root is reached]
   */
  var _calculateBalance = function (node) {
    _setHeight(node);
    if (!_isBalanced(node)) {
      var x = _tallestChild(_tallestChild(node));
      var y = _tallestChild(node);
      var z = node;
      var arr = [x, y, z];
      arr.sort(function (one, two) {
        if (one.value < two.value) {
          return -1;
        }
        if (one.value > two.value) {
          return 1;
        }
        return 0;
      });
      var t = _findInOrderChildren(arr);
      var a = arr[0];
      var b = arr[1];
      var c = arr[2];
      _setLeft(b, a.value);
      _copyLeft(b.left, t[0]);
      _copyRight(b.left, t[1]);
      _setRight(b, c.value);
      _copyLeft(b.right, t[2]);
      _copyRight(b.right, t[3]);
      _swap(node, b);
    }
    _setHeight(node);
    if (node.parent) {
      _calculateBalance(node.parent);
    }
    return node;
  };
  /**
   * [_findInOrderSuccessor find the leftmost child on the right side of the input node]
   * @param {[Node]} node [found node object]
   */
  var _findInOrderSuccessor = function (node) {
    var ret;

    function find(node) {
      return node.left ? find(node.left) : node;
    }
    if (node.right && node.left) {
      ret = find(node.right);
    }
    else {
      ret = false;
    }
    return ret;
  };
  /**
   * [_findInOrderPredecessor find the rightmost child on the left side of the input node]
   * @param {[Node]} node [found node object]
   */
  var _findInOrderPredecessor = function (node) {
    var ret;

    function find(node) {
      return node.right ? find(node.right) : node;
    }
    if (node.right && node.left) {
      ret = find(node.left);
    }
    else {
      ret = false;
    }
    return ret;
  };
  /**
   * [deleteSingleNode given a node, delete its parent references, it's value, and it's parent reference. Return copy of parent link]
   * @return {[Node]} parent [the parent link is returned]
   */
  var _deleteSingleNode = function (node) {
    var parent = node.parent;
    if (node.value < node.parent.value) {
      node.parent.left = false;
    }
    if (node.value > node.parent.value) {
      node.parent.right = false;
    }
    node.parent = false;
    node.value = false;
    return parent;
  };
  /**
   * [search takes in a value to search for and returns a node object if found]
   * @param  {[Number]} searchValue [value to search for]
   * @return {[Node]}             [node found]
   */
  AVLNode.prototype.search = function (searchValue) {
    if (this.value) {
      if (this.value === searchValue) {
        return this;
      }
      if (searchValue < this.value) {
        return this.left ? this.left.search(searchValue) : false;
      }
      if (searchValue > this.value) {
        return this.right ? this.right.search(searchValue) : false;
      }
    }
    else {
      return false;
    }
  };
  /**
   * [traverse takes in a root node, and a traversal order config object i.e {inOrder:false,preOrder:false,postOrder:true}]
   * @return [array of nodes]
   */
  AVLNode.prototype.traverse = function (arr, config) {
    if (!config) {
      config = {
        inOrder: true
      };
    }
    arr = arr || [];
    if (this.value) {
      if (config.preOrder) {
        arr.push(this);
      }
      if (this.left) {
        this.left.traverse(arr, config);
      }
      if (config.inOrder) {
        arr.push(this);
      }
      if (this.right) {
        this.right.traverse(arr, config);
      }
      if (config.postOrder) {
        arr.push(this);
      }
    }
    return arr;
  };
  /**
   * [insert insert the value into the tree, creates a new instance of a node from the input number]
   * @param  {[Number]} nodeToInsert [will create a node with this as it's value]
   * @return {[BST Object]}              [the BST object]
   */
  AVLNode.prototype.insert = function (insertNode) {
    if (this.value && insertNode) {
      if (this.value === insertNode) {
        return true;
      }
      if (insertNode < this.value) {
        if (this.left) {
          this.left.insert(insertNode);
        }
        else {
          _calculateBalance(_setLeft(this, insertNode));
        }
      }
      if (insertNode > this.value) {
        if (this.right) {
          this.right.insert(insertNode);
        }
        else {
          _calculateBalance(_setRight(this, insertNode));
        }
      }
    }
    return _getRoot(this);
  };
  /**
   * [deleteNode deletes the node with the supplied key from the tree ]
   * @param {[Number]} nodeVal [input value to search and delete]
   * @return {[BST object]}
   */
  AVLNode.prototype.deleteNode = function () {
    if (this) {
      if (!this.left && !this.right) {
        return _calculateBalance(_deleteSingleNode(this));
      }
      if (!this.left && this.right) {
        return _calculateBalance(_swap(this, this.right));
      }
      if (!this.right && this.left) {
        return _calculateBalance(_swap(this, this.left));
      }
      if (this.left && this.right) {
        var tempNode = _findInOrderSuccessor(this);
        var copy = this;
        if (copy.right.value === tempNode.value) {
          if (tempNode.right) {
            copy.right = tempNode.right;
            copy.right.parent = copy;
          }
        }
        if (copy.left.value === tempNode.value) {
          if (tempNode.left) {
            copy.left = tempNode.left;
            copy.left.parent = copy;
          }
        }
        copy.value = tempNode.value;
        _calculateBalance(tempNode.deleteNode());
        _swap(this, copy);
        return this;
      }
    }
    else {
      return false;
    }
  };
  return AVLNode;
})(this);
