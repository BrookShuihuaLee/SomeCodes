let NIL

class Node {
    constructor (value, height = 1) {
        this.value = value
        this.height = height
        this.parent = this.leftChild = this.rightChild = NIL
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
}

NIL = new Node(null, 0)

class AVLTree {
    constructor () {
        this._root = NIL
    }

    add (value) {
        const node = new Node(value)
        if (this._root === NIL) this._root = node
        else {
            let n = this._root
            while (true) {
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

    _refreshHeight (node) {
        node.height = Math.max(node.leftChild.height, node.rightChild.height)
    }

    _balance (node) {
        let parent,
            oldLeftHeight,
            oldRightHeight
        if (node !== this._root) {
            parent = node.parent
            oldLeftHeight = parent.leftChild.height
            oldRightHeight = parent.rightChild.height
        }

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

        if (node !== this._root
            && (oldLeftHeight !== parent.leftChild.height || oldRightHeight !== parent.rightChild.height)
        ) this._balance(parent)
    }

    _rotateLeft (node) {
        const parent = node.parent

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
        const parent = node.parent

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

    remove (value) {
        const node = this._findNodeByValue(this._root, value)
        if (node !== NIL) {
            const smallestNode = node.rightChild === NIL ? node : this._findSmallestNode(node.rightChild)
            {[node.value, smallestNode.value] = [smallestNode.value, node.value]}
            this._remove(node)
        }
    }

    _remove (node) {
        const child = node.leftChild !== NIL ? node.leftChild : node.rightChild
        if (node === this._root) {
            this._root = child
            child.parent = NIL
            return
        }
        child.parent = node.parent
        if (node.isLeftChild) node.parent.leftChild = child
        else node.parent.rightChild = child
        this._balance(node.parent)
    }

    _findNodeByValue (node, value) {
        if (node === NIL) return NIL
        if (value < node.value) return this._findNodeByValue(node.leftChild, value)
        else if (node.value < value) return this._findNodeByValue(node.rightChild, value)
        return node
    }

    _findSmallestNode (node) {
        return node.leftChild === NIL ? node : this._findSmallestNode(node.leftChild)
    }
}

function test () {
    const
    a = [],
    t = new AVLTree(),
    check = function () {
        function dfs (node) {
            return node === NIL || (dfs(node.leftChild) && dfs(node.rightChild) && Math.abs(node.leftChild.height - node.rightChild.height) <= 1)
        }
        if (!dfs(t._root)) {
            console.log(a)
            console.log(toString(t._root))
            process.exit(-1)
        }
    },
    toString = function (node) {
        if (node === NIL) return 'NIL'
        return `(${node.value}, ${toString(node.leftChild)}, ${toString(node.rightChild)})`
    }

    while (Math.random() < 0.99) {
        a.push(Math.floor(Math.random() * 100))
    }
    for (let v of a) {
        t.add(v)
        check()
    }
    let aa = a.slice()
    while (aa.length) {
        t.remove(aa.splice(Math.floor(Math.random() * aa.length), 1)[0])
        check()
    }
    // console.log('ok')
}
while (Math.random() < 0.99) test()