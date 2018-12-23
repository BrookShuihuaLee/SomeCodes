import java.util.*;

class Main {
    public static void main(String[] args) {
        Random random = new Random();
        int[] a = new int[3000];
        for (int i = 0; i < a.length; i++) a[i] = random.nextInt();

        {
            long time = 0;
            for (int i = 1; i < a.length; i++) {
                int[] clonedA = a.clone();
                long startTime = System.currentTimeMillis();
                Tool.findKthLargestQuick(clonedA, i);
                time += System.currentTimeMillis() - startTime;
            }
            System.out.println("findKthLargestQuick\t" + time);
        }
        {
            long time = 0;
            for (int i = 1; i < a.length; i++) {
                int[] clonedA = a.clone();
                long startTime = System.currentTimeMillis();
                Tool.findKthLargestPriorityQueue(clonedA, i);
                time += System.currentTimeMillis() - startTime;
            }
            System.out.println("findKthLargestPriorityQueue\t" + time);
        }
        {
            long time = 0;
            for (int i = 1; i < a.length; i++) {
                int[] clonedA = a.clone();
                long startTime = System.currentTimeMillis();
                Tool.findKthLargestPriorityQueue2(clonedA, i);
                time += System.currentTimeMillis() - startTime;
            }
            System.out.println("findKthLargestPriorityQueue2\t" + time);
        }
        {
            long time = 0;
            for (int i = 1; i < a.length; i++) {
                int[] clonedA = a.clone();
                long startTime = System.currentTimeMillis();
                Tool.findKthLargestHeap(clonedA, i);
                time += System.currentTimeMillis() - startTime;
            }
            System.out.println("findKthLargestHeap\t" + time);
        }
    }
}

class Tool {
    public static int randrange(int begin, int end) {
        if (begin > end) {
            return randrange(end, begin);
        }
        return (int) (Math.random() * (end - begin)) + begin;
    }

    public static int clamp(int n, int minV, int maxV) {
        return Math.max(minV, Math.min(maxV, n));
    }

    public static void swap(int[] a, int i, int j) {
        int tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    // best
    public static int findKthLargestQuick(int[] a, int k) {
        k = clamp(k, 1, a.length);
        int iBegin = 0;
        int iEnd = a.length;
        
        for (;;) {
            int iRandom = randrange(iBegin, iEnd);
            swap(a, iBegin, iRandom);
            int iBigger = iBegin;
            for (int i = iBegin + 1; i < iEnd; i++) {
                if (a[i] >= a[iBegin]) {
                    swap(a, i, ++iBigger);
                }
            }
            swap(a, iBegin, iBigger);
            int leftNum = iBigger - iBegin + 1;
            if (leftNum > k) {
                iEnd = iBigger;
            } else if (leftNum < k) {
                iBegin = iBigger + 1;
                k -= leftNum;
            } else {
                return a[iBigger];
            }
        }
    }
    
    public static int findKthLargestPriorityQueue(int[] a, int k) {
        k = clamp(k, 1, a.length);
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>();
        for (int i = 0; i < k; i++) pq.add(a[i]);
        for (int i = k; i < a.length; i++) {
            if (a[i] > pq.peek()) {
                pq.poll();
                pq.add(a[i]);
            }
        }
        return pq.peek();
    }
    
    public static int findKthLargestPriorityQueue2(int[] a, int k) {
        k = clamp(k, 1, a.length);
        List<Integer> tmp = new ArrayList<Integer>(k);
        for (int i = 0; i < k; i++) tmp.add(a[i]);
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>(tmp);
        for (int i = k; i < a.length; i++) {
            if (a[i] > pq.peek()) {
                pq.poll();
                pq.add(a[i]);
            }
        }
        return pq.peek();
    }

    private static int getLeftChildIndex(int i) {
        return ((i + 1) << 1) - 1;
    }

    private static int getRightChildIndex(int i) {
        return (i + 1) << 1;
    }

    private static int getParentIndex(int i) {
        return ((i + 1) >> 1) - 1;
    }

    private static void adjust(int[] a, int i, int n) {
        for (;;) {
            int iLeft = getLeftChildIndex(i);
            int iRight = getRightChildIndex(i);
            int iSmaller = iRight >= n || a[iLeft] <= a[iRight] ? iLeft : iRight;
            if (iSmaller >= n || a[i] <= a[iSmaller]) return;
            swap(a, i, iSmaller);
            i = iSmaller;
        }
    }

    public static int findKthLargestHeap(int[] a, int k) {
        k = clamp(k, 1, a.length);
        for (int i = getParentIndex(k - 1); i >= 0; i--) adjust(a, i, k);
        for (int i = k; i < a.length; i++) {
            if (a[i] > a[0]) {
                swap(a, i, 0);
                adjust(a, 0, k);
            }
        }
        return a[0];
    }
}