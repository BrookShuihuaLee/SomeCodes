import {
    NIL,
    AVLTree,
} from './AVLTree'

test('AVLTree random test', () => {
    function test () {
        let errorMsg
        const t = new AVLTree()
        
        function check () {
            function dfs (node) {
                return node === NIL || (dfs(node.leftChild) && dfs(node.rightChild) && Math.abs(node.leftChild.height - node.rightChild.height) <= 1)
            }
            
            if (!dfs(t._root)) expect({
                t,
                errorMsg,
            }).toBe(false)
        }
    
        const a = []
        for (let i = Math.random() * 15; i > 0; i--) a.push(Math.floor(Math.random() * 100))
        for (let v of a) {
            errorMsg = {
                a,
                v,
                op: 'add',
                old: t.toJSON(),
            }
            t.add(v)
            check()
        }
        while (a.length) {
            const v = a.splice(Math.floor(Math.random() * a.length), 1)[0]
            errorMsg = {
                a,
                v,
                op: 'remove',
                old: t.toJSON(),
            }
            t.remove(v)
            check()
        }
    }
    for (let i = Math.random() * 10000; i > 0; i--) test()
})