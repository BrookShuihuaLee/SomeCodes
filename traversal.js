class Node {
    constructor (value) {
        this.value = value
        this.left = this.right = null
    }
}

function* preOrder (root) {
    if (root) {
        yield root.value
        yield* preOrder(root.left)
        yield* preOrder(root.right)
    }
}

function* preOrderNonRecursion (root) {
    const s = [root]
    while (s.length) {
        const node = s.pop()
        if (node) {
            yield node.value
            s.push(node.right, node.left)
        }
    }
}

function* inOrder (root) {
    if (root) {
        yield* inOrder(root.left)
        yield root.value
        yield* inOrder(root.right)
    }
}

function* inOrderNonRecursion (root) {
    if (!root) return
    const s = [root]
    while (s.length) {
        const node = s.pop()
        if (node instanceof Node) {
            if (node.right) s.push(node.right)
            s.push(node.value)
            if (node.left) s.push(node.left)
        } else yield node
    }
}

function* postOrder (root) {
    if (root) {
        yield* postOrder(root.left)
        yield* postOrder(root.right)
        yield root.value
    }
}

function* postOrderNonRecursion (root) {
    if (!root) return
    const s = [root]
    while (s.length) {
        const node = s.pop()
        if (node instanceof Node) {
            s.push(node.value)
            if (node.right) s.push(node.right)
            if (node.left) s.push(node.left)
        } else yield node
    }
}

function test () {
    console.log(Array.from(preOrder(null)))
    console.log(Array.from(preOrderNonRecursion(null)))
    console.log(Array.from(inOrder(null)))
    console.log(Array.from(inOrderNonRecursion(null)))
    console.log(Array.from(postOrder(null)))
    console.log(Array.from(postOrderNonRecursion(null)))
    const root = new Node(1)
    console.log(Array.from(preOrder(root)))
    console.log(Array.from(preOrderNonRecursion(root)))
    console.log(Array.from(inOrder(root)))
    console.log(Array.from(inOrderNonRecursion(root)))
    console.log(Array.from(postOrder(root)))
    root.left = new Node(2)
    console.log(Array.from(preOrder(root)))
    console.log(Array.from(preOrderNonRecursion(root)))
    console.log(Array.from(inOrder(root)))
    console.log(Array.from(inOrderNonRecursion(root)))
    console.log(Array.from(postOrder(root)))
    console.log(Array.from(postOrderNonRecursion(root)))
    root.right = new Node(3)
    console.log(Array.from(preOrder(root)))
    console.log(Array.from(preOrderNonRecursion(root)))
    console.log(Array.from(inOrder(root)))
    console.log(Array.from(inOrderNonRecursion(root)))
    console.log(Array.from(postOrder(root)))
    console.log(Array.from(postOrderNonRecursion(root)))
    root.left.right = new Node(4)
    console.log(Array.from(preOrder(root)))
    console.log(Array.from(preOrderNonRecursion(root)))
    console.log(Array.from(inOrder(root)))
    console.log(Array.from(inOrderNonRecursion(root)))
    console.log(Array.from(postOrder(root)))
    console.log(Array.from(postOrderNonRecursion(root)))
}

function testRandom () {
    function randomTree () {
        if (Math.random() > 0.5) return null
        const node = new Node(Math.random() * 100 | 0)
        node.left = randomTree()
        node.right = randomTree()
    }
    for (let turn = 0; turn < 100; turn++) {
        let r, nr, root = randomTree()
        r = JSON.stringify(Array.from(preOrder(root)))
        nr = JSON.stringify(Array.from(preOrderNonRecursion(root)))
        if (r !== nr) {
            console.log(r, nr)
        }
        r = JSON.stringify(Array.from(inOrder(root)))
        nr = JSON.stringify(Array.from(inOrderNonRecursion(root)))
        if (r !== nr) {
            console.log(r, nr)
        }
        r = JSON.stringify(Array.from(postOrder(root)))
        nr = JSON.stringify(Array.from(postOrderNonRecursion(root)))
        if (r !== nr) {
            console.log(r, nr)
        }
    }
}

testRandom()