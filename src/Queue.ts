export interface QueueOptions<T> {
    data?: Array<T>
    [key: string]: any;
}

export class Queue<T> extends Array<T> {
    constructor(options: QueueOptions<T> = {}) {
        super();
        if (options.data) {
            this.push(...options.data);
        }
    }

    public pop() {
        if (this.length === 0) {
            return;
        }

        return this.shift();
    }

    public peek() {
        return this[0];
    }

    public clone() {
        return new Queue<T>({
            data: this.slice()
        });
    }
}

export default Queue;