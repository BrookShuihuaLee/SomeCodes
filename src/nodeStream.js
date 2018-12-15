const {Readable, Writable, Duplex, Transform} = require('stream')
class ReadStream extends Readable {
    constructor (...args) {
        super(...args)
        this._s = 'a'.charCodeAt()
        this._e = 'z'.charCodeAt() + 1
    }

    _read () {
        this.push(this._s < this._e ? String.fromCharCode(this._s++) : null)
    }
}

class WriteStream extends Writable {
    _write (chunck, encoding, cb) {
        console.log(chunck, encoding, chunck.toString())
        cb()
    }
}

class DuplexStream extends Duplex {
    constructor (...args) {
        super(...args)
        this._s = 'a'.charCodeAt()
        this._e = 'z'.charCodeAt() + 1
    }

    _read () {
        this.push(this._s < this._e ? String.fromCharCode(this._s++) : null)
    }
    
    _write (chunck, encoding, cb) {
        console.log(chunck, encoding, chunck.toString())
        cb()
    }
}

class TransformStream extends Transform {
    _transform (chunck, encoding, cb) {
        this.push(chunck.toString().toUpperCase())
        cb()
    }
}

new ReadStream().pipe(new TransformStream()).pipe(new WriteStream())

console.log('\nduplex')
let d = new DuplexStream()
d.pipe(new TransformStream()).pipe(d)