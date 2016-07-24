const
    MIN_CAPACITY = 1,
    DEFAULT_CAPACITY = 16,
    DEFAULT_SLOT_RATE = 0.7

class Entry {
    constructor (key, value) {
        Object.assign(this, {key, value, next: null})
    }
}

class EntryList {
    constructor () {
        this._head = null
    }

    add (key, value) {
        if (this.isEmpty()) {
            this._head = new Entry(key, value)
        } else {
            let e = this._head
            while (true) {
                if (e.key == key) return false
                if (e.next) e = e.next
                else break
            }
            e.next = new Entry(key, value)
        }
        return true
    }

    remove (key) {
        if (this.isEmpty()) return false
        if (this._head.key == key) {
            this._head = this._head.next
            return true
        } else {
            let e = this._head
            while (e.next) {
                if (e.next.key == key) {
                    e.next = e.next.next
                    return true
                }
                e = e.next
            }
            return false
        }
    }

    get (key) {
        let e = this._head
        while (e) {
            if (e.key == key) return e.value
            else e = e.next
        }
        return null
    }

    isEmpty () {
        return this._head === null
    }

    forEach (fn) {
        let e = this._head
        while (e) {
            fn(e)
            e = e.next
        }
    }
}

class HashMap {
    constructor (capacity = DEFAULT_CAPACITY, slotRate = DEFAULT_SLOT_RATE) {
        this._slotRate = slotRate
        let c = MIN_CAPACITY
        while (c < capacity) c <<= 1
        this._replaceSlots(c)
        this._size = 0
    }

    _replaceSlots (capacity) {
        const slots = this._slots

        this._slots = []
        this._slots.length = capacity

        return slots
    }

    get size () {
        return this._size
    }

    get capacity () {
        return this._slots.length
    }

    put (key, value) {
        this._put(key, value)
        this._size++
        this._checkFull()
    }

    _put (key, value) {
        const i = this._getIndex(key)
        if (!this._slots[i]) this._slots[i] = new EntryList()
        return this._slots[i].add(key, value)
    }

    _getIndex (key) {
        return key.hashCode() & (this.capacity - 1)
    }

    _checkFull () {
        if (this.size > this.capacity * this._slotRate) this._doubleCapacity()
    }

    _doubleCapacity () {
        this._forEach(this._replaceSlots(this.capacity << 1), entry => {
            this._put(entry.key, entry.value)
        })
    }

    _forEach (slots, fn) {
        slots.forEach(slot => slot && slot.forEach(fn))
    }

    get (key) {
        const slot = this._getSlot(key)
        return slot && slot.get(key)
    }

    _getSlot (key) {
        return this._slots[this._getIndex(key)]
    }

    remove (key) {
        const slot = this._getSlot(key)
        return !!slot && slot.remove(key)
    }

    forEach (fn) {
        this._forEach(this._slots, entry => {
            fn(entry.key, entry.value)
        })
    }

    toObject () {
        const o = {}
        this.forEach((key, value) => {
            o[key] = value
        })
        return o
    }

    toString () {
        return JSON.stringify(this.toObject(), null, 2)
    }
}


String.prototype.hashCode = function () {
    let r = 0
    for (let i = 0; i < this.length; i++) {
        r = ((r << 5) - r) + this.charCodeAt(i)
        r &= r
    }
    return r
}
const map = new HashMap()
for (let i = 0; i < 36; i++) {
    map.put(i.toString(36), i)
    console.log(map.toString(), map.size, map.capacity)
}
for (let i = 0; i < 36; i++) {
    map.remove(i.toString(36))
    console.log(map.toString(), map.size, map.capacity)
}