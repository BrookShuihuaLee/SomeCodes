class Node {
    constructor (v) {
        this.v = v
        this.next = null
    }
}

class Queue {
    constructor () {
        this._first = this._last = null
        this._size = 0
    }

    get size () {
        return this._size
    }

    push (v) {
        let n = new Node(v)
        if (this._size) this._last.next = n
        else this._first = n
        this._last = n
        this._size++
    }

    shift () {
        if (!this._size) return undefined
        let r = this._first.v
        this._first = this._first.next
        this._size--
        return r
    }
}

function test () {
    let n = 100000
    console.time('Queue')
    let q = new Queue()
    for (let i = 0; i < n; i++) q.push(i)
    for (let i = 0; i < n; i++) q.shift()
    console.timeEnd('Queue')
    console.time('Array')
    let a = []
    for (let i = 0; i < n; i++) a.push(i)
    for (let i = 0; i < n; i++) a.shift()
    console.timeEnd('Array')
}

test()