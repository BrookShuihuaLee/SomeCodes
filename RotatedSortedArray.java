class RotatedSortedArray {
    private int[] nums;
    private int zeroIndex;
    
    public RotatedSortedArray(int[] nums) {
        this.nums = nums;
        this.initZeroIndex();
    }
    
    private void initZeroIndex() {
        int iBegin = 0, iEnd = this.nums.length;
        while (iEnd - iBegin >= 2) {
            int first = this.nums[iBegin], last = this.nums[iEnd - 1];
            if (first < last) break;
            if (first == last) {
                iEnd--;
                continue;
            }
            int iMid = (iBegin + iEnd) >> 1;
            int mid = this.nums[iMid];
            if (first <= mid) iBegin = iMid + 1;
            else {
                iBegin++;
                iEnd = iMid + 1;
            }
        }
        this.zeroIndex = iBegin;
        if (this.nums.length >= 2) {
            while (this.get(0) == this.get(this.nums.length - 1)) {
                this.zeroIndex = this.toRealIndex(this.nums.length - 1);
                if (this.zeroIndex == iBegin) break;
            }
        }
    }
    
    // //没有重复元素
    // private void initZeroIndex() {
    //     int iBegin = 0, iEnd = this.nums.length;
    //     while (iEnd - iBegin >= 2) {
    //         int first = this.nums[iBegin], last = this.nums[iEnd - 1];
    //         if (first < last) break;
    //         int iMid = (iBegin + iEnd) >> 1;
    //         int mid = this.nums[iMid];
    //         if (first < mid) iBegin = iMid + 1;
    //         else {
    //             iBegin++;
    //             iEnd = iMid + 1;
    //         }
    //     }
    //     this.zeroIndex = iBegin;
    // }

    public int get(int i) {
        return this.nums[this.toRealIndex(i)];
    }
    
    public int toRealIndex(int i) {
        if (i < 0 || i >= this.nums.length) return i;
        return (this.zeroIndex + i) % this.nums.length;
    }
    
    public int search(int target) {
        int iBegin = 0, iEnd = this.nums.length;
        while (iBegin < iEnd) {
            int iMid = (iBegin + iEnd) >> 1;
            int mid = this.get(iMid);
            if (mid < target) iBegin = iMid + 1;
            else if (target < mid) iEnd = iMid;
            else return iMid;
        }
        return -1;
    }
}