let RED = Symbol('RED'),
    BLACK = Symbol('BLACK'),
    NIL

class Node {
    constructor (value, color = RED) {
        this.value = value
        this.color = color
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

NIL = new Node(null, BLACK)

class RedBlackTree {
    constructor () {
        this._root = NIL
    }

    add (value) {
        const node = new Node(value)
        if (this._root !== NIL) {
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
        } else this._root = node
        this._adjustAfterAdd(node)
    }

    _adjustAfterAdd (node) {
        if (this._root === node) {
            node.color = BLACK
            return
        }
        //assert(node.parent)
        if (node.parent.color === BLACK) return
        //assert(node.parent.color === RED && node.grandparent.color === BLACK && node.sibling.color === BLACK)
        if (node.uncle.color === RED) {
            node.parent.color = node.uncle.color = BLACK
            node.grandparent.color = RED
            this._adjustAfterAdd(node.grandparent)
            return
        }
        //assert(node.uncle.color === BLACK)
        if (node.isLeftChild) {
            if (node.parent.isLeftChild) {
                node.parent.color = BLACK
                node.grandparent.color = RED
                this._rotateRight(node.parent)
            } else {
                node.color = BLACK
                node.grandparent.color = RED
                this._rotateRight(node)
                this._rotateLeft(node)
            }
        } else {
            if (node.parent.isLeftChild) {
                node.color = BLACK
                node.grandparent.color = RED
                this._rotateLeft(node)
                this._rotateRight(node)
            } else {
                node.parent.color = BLACK
                node.grandparent.color = RED
                this._rotateLeft(node.parent)
            }
        }
    }

    _rotateLeft (node) {
        //assert(node.parent)
        const parent = node.parent

        parent.rightChild = node.leftChild
        node.leftChild.parent = parent

        if (this._root === parent) this._root = node
        else if (parent.isLeftChild) parent.parent.leftChild = node
        else parent.parent.rightChild = node
        node.parent = parent.parent

        node.leftChild = parent
        parent.parent = node
    }

    _rotateRight (node) {
        //assert(node.parent)
        const parent = node.parent

        parent.leftChild = node.rightChild
        node.rightChild.parent = parent

        if (this._root === parent) this._root = node
        else if (parent.isLeftChild) parent.parent.leftChild = node
        else parent.parent.rightChild = node
        node.parent = parent.parent

        node.rightChild = parent
        parent.parent = node
    }

    remove (value) {
        const node = this._findNodeByValue(this._root, value)
        if (node !== NIL) {
            const smallestNode = node.rightChild === NIL ? node : this._findSmallestNode(node.rightChild)
            {[node.value, smallestNode.value] = [smallestNode.value, node.value]}
            this._remove(smallestNode)
        }
    }

    _findNodeByValue (node, value) {
        if (node === NIL) return NIL
        if (value < node.value) return this._findNodeByValue(node.leftChild, value)
        else if (node.value < value) return this._findNodeByValue(node.rightChild, value)
        else return node
    }

    _findSmallestNode (node) {
        return node.leftChild === NIL ? node : this._findSmallestNode(node.leftChild)
    }

    _remove (node) {
        //assert(node.leftChild === NIL || node.rightChild === NIL)
        const child = node.leftChild !== NIL ? node.leftChild : node.rightChild
        if (node === this._root) {
            if (child === NIL) {
                this._root = NIL
            } else {
                child.color = BLACK
                this._root = child
            }
            return
        }
        if (node.isLeftChild) {
            node.parent.leftChild = child
        } else {
            node.parent.rightChild = child
        }
        child.parent = node.parent
        if (node.color === BLACK) {
            if (child.color === RED) child.color = BLACK
            else this._adjustAfterRemove(child)
        }
    }

    _adjustAfterRemove (node) {
        //assert(node.color === BLACK)
        if (this._root === node) return
        const parent = node.parent
        //assert(node.sibling !== NIL)
        if (node.sibling.color === RED) {
            //assert(node.parent.color === BLACK)
            node.parent.color = RED
            node.sibling.color = BLACK
            if (node.isLeftChild) this._rotateLeft(node.sibling)
            else this._rotateRight(node.sibling)
            if (node === NIL) node.parent = parent
        }
        //assert(node.sibling.color === BLACK)
        if (node.sibling.leftChild.color === BLACK && node.sibling.rightChild.color === BLACK) {
            node.sibling.color = RED
            if (node.parent.color === RED) node.parent.color = BLACK
            else this._adjustAfterRemove(node.parent)
        } else if (node.isLeftChild) {
            if (node.sibling.rightChild.color === BLACK) {
                //assert(node.sibling.leftChild === RED)
                node.sibling.color = RED
                node.sibling.leftChild.color = BLACK
                this._rotateRight(node.sibling.leftChild)
                if (node === NIL) node.parent = parent
            }
            node.sibling.color = node.parent.color
            node.parent.color = BLACK
            node.sibling.rightChild.color = BLACK
            this._rotateLeft(node.sibling)
        } else {
            if (node.sibling.leftChild.color === BLACK) {
                //assert(node.sibling.rightChild === RED)
                node.sibling.color = RED
                node.sibling.rightChild.color = BLACK
                this._rotateLeft(node.sibling.rightChild)
                if (node === NIL) node.parent = parent
            }
            node.sibling.color = node.parent.color
            node.parent.color = BLACK
            node.sibling.leftChild.color = BLACK
            this._rotateRight(node.sibling)
        }
    }
}


function test () {
    const
    a = [],
    t = new RedBlackTree(),
    checkDeep = function (root) {
        const
            blacks = [],
            reds = [],
            dfs = function (node, black, red) {
                if (node === NIL) {
                    blacks.push(black)
                    reds.push(red)
                } else {
                    if (node.color === RED) red++
                    else black++
                    dfs(node.leftChild, black, red)
                    dfs(node.rightChild, black, red)
                }
            }
        dfs(root, 0, 0)
        if (blacks.some(function (b) {
            return b != blacks[0]
        })) {
            console.log(`${a}`)
            console.log(`${blacks}\t\t\t${reds}`)
            console.log(toString(root))
            process.exit(-1)
        }
    },
    toString = function (node) {
        if (node === NIL) return 'NIL'
        return `(${node.color === RED ? 'R' : 'B'}${node.value}, ${toString(node.leftChild)}, ${toString(node.rightChild)})`
    }

    while (Math.random() < 0.99) {
        a.push(Math.floor(Math.random() * 100))
    }
    for (let v of a) {
        t.add(v)
        checkDeep(t._root)
    }
    let aa = a.slice()
    while (aa.length) {
        t.remove(aa.splice(Math.floor(Math.random() * aa.length), 1)[0])
        checkDeep(t._root)
    }
    console.log('ok')
}
while (Math.random() < 0.99) test()