import sys
def dijkstra(matrix, iStart, iEnd):
    n = len(matrix)
    distance = matrix[iStart][:]
    knowSet = set([iStart])
    unKnowSet = set(xrange(n)) - knowSet
    while iEnd in unKnowSet:
        shortestI = -1
        shortestD = sys.maxint
        for unknowI in unKnowSet:
            for knowI in knowSet:
                distance[unknowI] = min(distance[unknowI], distance[knowI] + matrix[knowI][unknowI])
            if distance[unknowI] <= shortestD:
                shortestI = unknowI
                shortestD = distance[unknowI]
        knowSet.add(shortestI)
        unKnowSet.remove(shortestI)
    return distance[iEnd]

matrix = [[0, sys.maxint, 10, 100000, 30, 100],
[sys.maxint, 0, 5, sys.maxint, sys.maxint, sys.maxint],
[sys.maxint, sys.maxint, 0, 50, sys.maxint, sys.maxint],
[sys.maxint, sys.maxint, sys.maxint, 0, sys.maxint, 10],
[sys.maxint, sys.maxint, sys.maxint, 20, 0, 60],
[sys.maxint, sys.maxint, sys.maxint, sys.maxint, sys.maxint, 0]]
result = [0, sys.maxint, 10, 50, 30, 60]
for i in xrange(len(matrix)):
    print result[i], dijkstra(matrix, 0, i)