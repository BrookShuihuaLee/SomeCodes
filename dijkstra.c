#include <stdio.h>
#include <string.h>
#define MAX_NODE_NUM 100
#define INFINITY 2147483647
#define BOOL char
#define TRUE 1
#define FALSE 0

void dijkstra(int e[MAX_NODE_NUM][MAX_NODE_NUM], int i, int j, int n); //dijkstra算法

int main() {
    int e[MAX_NODE_NUM][MAX_NODE_NUM] = {
        {0, INFINITY, 10, INFINITY, 30, 100},
        {INFINITY, 0, 5, INFINITY, INFINITY, INFINITY},
        {10, 5, 0, 50, INFINITY, INFINITY},
        {INFINITY, INFINITY, 50, 0, 20, 10},
        {30, INFINITY, INFINITY, 20, 0, 60},
        {100, INFINITY, INFINITY, 10, 60, 0}
    };
    dijkstra(e, 0, 3, 6);
    dijkstra(e, 0, 4, 6);
    dijkstra(e, 0, 1, 6);
    dijkstra(e, 2, 5, 6);
    dijkstra(e, 2, 4, 6);
    dijkstra(e, 3, 0, 6);
    return 0;
}

//dijkstra算法
void dijkstra(int e[MAX_NODE_NUM][MAX_NODE_NUM], int begin, int end, int n) {
    BOOL s[MAX_NODE_NUM];
    int dist[MAX_NODE_NUM];
    int before[MAX_NODE_NUM];
    int i, shortestI;
    int shortestDist;
    int path[MAX_NODE_NUM];
    for (i = 0; i < n; i++) {
        s[i] = FALSE;
        before[i] = begin;
    }
    s[begin] = TRUE;
    memcpy(dist, e[begin], sizeof(dist));
    while (!s[end]) {
        shortestDist = INFINITY;
        for (i = 0; i < n; i++) {
            if (!s[i] && dist[i] < shortestDist) {
                shortestI = i;
                shortestDist = dist[i];
            }
        }
        if (shortestDist == INFINITY) break;
        s[shortestI] = TRUE;
        for (i = 0; i < n; i++) {
            if (e[shortestI][i] != INFINITY && dist[shortestI] + e[shortestI][i] < dist[i]) {
                dist[i] = dist[shortestI] + e[shortestI][i];
                before[i] = shortestI;
            }
        }
    }
    i = 0;
    path[i] = end;
    while (path[i] != begin) {
        path[i + 1] = before[path[i]];
        i++;
    }
    printf("从v%d节点到v%d节点的最短路径是：", begin, end);
    while (i) printf("v%d->", path[i--]);
    printf("v%d\n", path[0]);
    printf("最短距离是%d\n\n", dist[end]);
}
