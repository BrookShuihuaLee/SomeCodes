#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int randRange(int s, int e); //产生随机数
int* randArray(int* pn, int maxLen, int s, int e); //产生随机数组
void printArray(int* a, int n); //打印数组
void swap(int* pa, int* pb); //交换
void quickSort(int* a, int n); //快排
int heapSortLeftChild(int i); //获取堆排左儿子
int heapSortRightChild(int i); //获取堆排右儿子
int heapSortFather(int i); //获取堆排父亲
void heapSortAdjust(int* a, int i, int n); //堆排调整
void heapSort(int* a, int n); //堆排
void mergeSortPart(int* old, int* now, int iBegin, int iEnd); //归并排序部分
void mergeSort(int* a, int n); //归并排序
int qsortCmp(const void *a, const void *b); //qsort的cmp
char equalArray(int* a, int* b, int n); //数据相等判断
void naiveTest(); //弱弱的测试
void randomTests(int times); //随机强测试

int main() {
    srand((unsigned)time(NULL));
    naiveTest();
    randomTests(1000);
    return 0;
}

//产生随机数
int randRange(int s, int e) {
    return rand() % (e - s) + s;
}

//产生随机数组
int* randArray(int* pn, int maxLen, int s, int e) {
    int i;
    int* a;
    *pn = randRange(0, maxLen);
    a = (int*) malloc(sizeof(int) * *pn);
    for (i = 0; i < *pn; i++) {
        a[i] = randRange(s, e);
    }
    return a;
}

//打印数组
void printArray(int* a, int n) {
    int i;  
    if (n <= 0) {
        printf("[]\n");
        return;
    }
    printf("[%d", a[0]);
    for (i = 1; i < n; i++) printf(", %d", a[i]);
    printf("]\n");
}

//交换
void swap(int* pa, int* pb) {
    int tmp = *pa;
    *pa = *pb;
    *pb = tmp;
}

//快排
void quickSort(int* a, int n) {
    int* sta = (int *) malloc((sizeof(int) * n + 1) << 1);
    int staLen = 0;
    int iBegin, iEnd, iRandom, i, j;
    sta[staLen++] = 0;
    sta[staLen++] = n;
    while (staLen) {
        iEnd = sta[--staLen];
        iBegin = sta[--staLen];
        if (iEnd - iBegin < 2) continue;
        iRandom = randRange(iBegin, iEnd);
        swap(&a[iBegin], &a[iRandom]);
        i = iBegin;
        for (j = iBegin + 1; j < iEnd; j++) {
            if (a[j] <= a[iBegin]) swap(&a[++i], &a[j]);
        }
        swap(&a[iBegin], &a[i]);
        sta[staLen++] = iBegin;
        sta[staLen++] = i;
        sta[staLen++] = i + 1;
        sta[staLen++] = iEnd;
    }
}

//获取堆排左儿子
int heapSortLeftChild(int i) {
    return ((i + 1) << 1) - 1;
}

//获取堆排右儿子
int heapSortRightChild(int i) {
    return (i + 1) << 1;
}

//获取堆排父亲
int heapSortFather(int i) {
    return ((i + 1) >> 1) - 1;
}

//堆排调整
void heapSortAdjust(int* a, int i, int n) {
    int iLeft, iRight, iBig;
    for(;;) {
        iLeft = heapSortLeftChild(i);
        iRight = heapSortRightChild(i);
        iBig = iRight >= n || a[iLeft] > a[iRight] ? iLeft : iRight;
        if (iBig >= n || a[i] >= a[iBig]) return;
        swap(&a[i], &a[iBig]);
        i = iBig;
    }
}

//堆排
void heapSort(int* a, int n) {
    int i;
    for (i = heapSortFather(n - 1); i >= 0; i--) heapSortAdjust(a, i, n);
    while (n > 1) {
        swap(&a[0], &a[--n]);
        heapSortAdjust(a, 0, n);
    }
}

//归并排序部分
void mergeSortPart(int* old, int* now, int iBegin, int iEnd) {
    int iMid, iLeft, iRight, i;
    if (iEnd - iBegin < 2) return;
    iMid = (iBegin + iEnd) >> 1;
    mergeSortPart(now, old, iBegin, iMid);
    mergeSortPart(now, old, iMid, iEnd);
    iLeft = iBegin;
    iRight = iMid;
    for (i = iBegin; i < iEnd; i++) {
        if (iRight == iEnd || (iLeft != iMid && old[iLeft] < old[iRight])) {
            now[i] = old[iLeft++];
        } else {
            now[i] = old[iRight++];
        }
    }
}

//归并排序
void mergeSort(int* a, int n) {
    int* old = (int*) malloc(sizeof(int) * n);
    memcpy(old, a, sizeof(int) * n);
    mergeSortPart(old, a, 0, n);
    free(old);
}

//qsort的cmp
int qsortCmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

//数据相等判断
char equalArray(int* a, int* b, int n) {
    int i;
    for (i = 0; i < n; i++) if (a[i] != b[i]) return 0;
    return 1;
}

//弱弱的测试
void naiveTest() {
    int *a, *b;
    int n;
    a = randArray(&n, 10, 0, 10);
    b = (int*) malloc(sizeof(int) * n);

    printf("*** naiveTest start ***\n");
    printf("原数组：");
    printArray(a, n);

    memcpy(b, a, sizeof(int) * n);
    qsort(b, n, sizeof(int), qsortCmp);
    printf("qsort结果：");
    printArray(b, n);

    memcpy(b, a, sizeof(int) * n);
    quickSort(b, n);
    printf("quickSort结果：");
    printArray(b, n);

    memcpy(b, a, sizeof(int) * n);
    heapSort(b, n);
    printf("heapSort结果：");
    printArray(b, n);

    memcpy(b, a, sizeof(int) * n);
    mergeSort(b, n);
    printf("mergeSort结果：");
    printArray(b, n);

    free(a);
    free(b);
    printf("*** naiveTest end ***\n\n");
}

//随机强测试
void randomTests(int times) {
    int *a, *b, *r;
    int n;
    int failNum = 0;

    printf("*** randomTests start ***\n");
    while (times--) {
        a = randArray(&n, 1000, 0, 1000);
        r = (int*) malloc(sizeof(int) * n);
        memcpy(r, a, sizeof(int) * n);
        qsort(r, n, sizeof(int), qsortCmp);
        b = (int*) malloc(sizeof(int) * n);

        memcpy(b, a, sizeof(int) * n);
        quickSort(b, n);
        if (!equalArray(r, b, n)) failNum++;
        memcpy(b, a, sizeof(int) * n);
        heapSort(b, n);
        if (!equalArray(r, b, n)) failNum++;
        memcpy(b, a, sizeof(int) * n);
        mergeSort(b, n);
        if (!equalArray(r, b, n)) failNum++;

        free(a);
        free(r);
        free(b);
    }
    printf("随机测试失败数%d\n", failNum);
    printf("*** randomTests end ***\n\n");
}
