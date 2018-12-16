const OP_MAP = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
}

export default class Calculator {
    _tokens = null
    
    run(input) {
        this._tokenize(input)
        return this._expression()
    }

    _tokenize(input) {
        this._tokens = (
            input
                .match(/\d+(\.\d+)?|[\+\-\*\/\(\)]/g)
                .reverse()
        )
    }

    _popToken() {
        return this._tokens.pop()
    }

    _peekToken() {
        return this._tokens[this._tokens.length - 1]
    }

    _accept(t) {
        return t === this._peekToken() && this._popToken()
    }

    _acceptAny(ts) {
        return ts.some(t => t === this._peekToken()) && this._popToken()
    }

    _acceptNumber() {
        return !isNaN(this._peekToken()) && this._popToken()
    }

    _doOp(op, a, b) {
        return OP_MAP[op](a, b)
    }

    _unit() {
        let v

        if (this._accept('(')) {
            v = this._expression()
            this._accept(')')
        } else v = Number(this._acceptNumber())

        return v
    }

    _unary() {
        return (this._accept('-') ? -1 : 1) * this._unit()
    }

    _factor() {
        let v = this._unary()
        let op

        while (op = this._acceptAny(['*', '/'])) v = this._doOp(op, v, this._unary())

        return v
    }

    _expression() {
        let v = this._factor()
        let op

        while (op = this._acceptAny(['+', '-'])) v = this._doOp(op, v, this._factor())

        return v
    }
}