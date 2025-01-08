
class Counter {
    constructor() {
        this.count = 0;
    }

    increase() {
        this.count += 1;
        console.log("Current Count:", this.count);
    }

    getCount() {
        return this.count;
    }
}

export default Counter;
