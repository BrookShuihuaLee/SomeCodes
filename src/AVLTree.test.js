import {
    NIL,
    AVLTree,
} from './AVLTree'

test('AVLTree random test', () => {
    function test () {
        const a = []
        const t = new AVLTree()
        
        function check () {
            function dfs (node) {
                return node === NIL || (dfs(node.leftChild) && dfs(node.rightChild) && Math.abs(node.leftChild.height - node.rightChild.height) <= 1)
            }
            
            if (!dfs(t._root)) {
                expect({
                    a,
                    t,
                }).toBe(false)
            }
        }
    
        for (let i = Math.random() * 100; i > 0; i--) a.push(Math.floor(Math.random() * 100))
        for (let v of a) {
            t.add(v)
            check()
        }
        let aa = a.slice()
        while (aa.length) {
            t.remove(aa.splice(Math.floor(Math.random() * aa.length), 1)[0])
            check()
        }
    }
    for (let i = Math.random() * 100; i > 0; i--) test()
})