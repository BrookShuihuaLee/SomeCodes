export let NIL

export class Node {
    value
    height
    parent
    leftChild
    rightChild

    constructor (value, height = 1, parent = NIL, leftChild = NIL, rightChild = NIL) {
        this.value = value
        this.height = height
        this.parent = parent
        this.leftChild = leftChild
        this.rightChild = rightChild
    }

    get isLeftChild () {
        return this === this.parent.leftChild
    }

    get isRightChild () {
        return this === this.parent.rightChild
    }

    get sibling () {
        return this.isLeftChild ? this.parent.rightChild : this.parent.leftChild
    }

    get uncle () {
        return this.parent.sibling
    }

    get grandparent () {
        return this.parent.parent
    }

    toJSON() {
        const symbol = Symbol()
        const stack = [this]

        NIL[symbol] = 'NIL'
        while (stack.length) {
            const node = stack.pop()
            if (node === NIL) continue

            if (node.leftChild[symbol] && node.rightChild[symbol]) {
                node[symbol] = {
                    value: node.value,
                    height: node.height,
                    leftChild: node.leftChild[symbol],
                    rightChild: node.rightChild[symbol],
                }

                if (node.leftChild !== NIL) delete node.leftChild[symbol]
                if (node.rightChild !== NIL) delete node.rightChild[symbol]
            } else {
                stack.push(node, node.leftChild, node.rightChild)
            }
        }
        delete NIL[symbol]

        const result = this[symbol]
        delete this[symbol]
        return result
    }
}

NIL = new Node(null, 0, null, null, null)

export class AVLTree {
    _root = NIL

    add (value) {
        const node = new Node(value)
        if (this._root === NIL) this._root = node
        else {
            let n = this._root
            for (;;) {
                if (value < n.value) {
                    if (n.leftChild === NIL) {
                        n.leftChild = node
                        node.parent = n
                        break
                    }
                    n = n.leftChild
                } else {
                    if (n.rightChild === NIL) {
                        n.rightChild = node
                        node.parent = n
                        break
                    }
                    n = n.rightChild
                }
            }
            this._balance(n)
        }
    }

    remove (value) {
        const node = this._findNodeByValue(this._root, value)
        if (node !== NIL) {
            const smallestNode = node.rightChild === NIL ? node : this._findSmallestNode(node.rightChild)
            {[node.value, smallestNode.value] = [smallestNode.value, node.value]}
            this._remove(smallestNode)
        }
    }

    toJSON() {
        return this._root.toJSON()
    }

    _refreshHeight (node) {
        return node.height = Math.max(node.leftChild.height, node.rightChild.height) + 1
    }

    _balance (node) {
        for (;;) {
            const oldHeight = node.height
            this._refreshHeight(node)
            if (node.leftChild.height - node.rightChild.height === 2) {
                if (node.leftChild.rightChild.height > node.leftChild.leftChild.height) {
                    this._rotateLeft(node.leftChild.rightChild)
                }
                this._rotateRight(node.leftChild)
            } else if (node.rightChild.height - node.leftChild.height === 2) {
                if (node.rightChild.leftChild.height > node.rightChild.rightChild.height) {
                    this._rotateRight(node.rightChild.leftChild)
                }
                this._rotateLeft(node.rightChild)
            }
            if (node === this._root || oldHeight === node.height) break
            node = node.parent
        }
    }

    _rotateLeft (node) {
        const {
            parent,
        } = node

        parent.rightChild = node.leftChild
        node.leftChild.parent = parent

        node.parent = parent.parent
        if (parent === this._root) this._root = node
        else if (parent.isLeftChild) parent.parent.leftChild = node
        else parent.parent.rightChild = node

        node.leftChild = parent
        parent.parent = node

        this._refreshHeight(parent)
        this._refreshHeight(node)
    }

    _rotateRight (node) {
        const {
            parent,
        } = node

        parent.leftChild = node.rightChild
        node.rightChild.parent = parent

        node.parent = parent.parent
        if (parent === this._root) this._root = node
        else if (parent.isLeftChild) parent.parent.leftChild = node
        else parent.parent.rightChild = node

        node.rightChild = parent
        parent.parent = node

        this._refreshHeight(parent)
        this._refreshHeight(node)
    }

    _remove (node) {
        const child = node.leftChild !== NIL ? node.leftChild : node.rightChild
        
        if (node === this._root) {
            this._root = child
            if (child !== NIL) child.parent = NIL
            return
        }
        
        if (child !== NIL) child.parent = node.parent
        if (node.isLeftChild) node.parent.leftChild = child
        else node.parent.rightChild = child
        this._balance(node.parent)
    }

    _findNodeByValue (node, value) {
        while (node !== NIL && node.value !== value) {
            if (value < node.value) node = node.leftChild
            else node = node.rightChild
        }
        return node
    }

    _findSmallestNode (node) {
        while (node.leftChild !== NIL) node = node.leftChild
        return node
    }
}