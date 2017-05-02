import Queue, {QueueOptions} from './Queue';
import * as get from 'lodash.get';

export interface PriorityQueueOptions<T> extends QueueOptions<T> {
    compare?: ((a: T, b: T) => number) | string | Array<string | number>;
}

export class PriorityQueue<T> extends Queue<T> {
    public compare: (a: T, b: T) => number;

    constructor(options: PriorityQueueOptions<T> = {}) {
        super(options);

        if (options.compare) {
            if (typeof options.compare === 'function') {
                this.compare = options.compare;
            } else {
                const compareKey = options.compare;
                this.compare = (a: T, b: T) => {
                    a = get(a, compareKey);
                    b = get(b, compareKey);
                    return a < b ? -1 : a > b ? 1 : 0;
                };
            }
        }
    }

    public push(...items: Array<T>) {
        const result = super.push(...items);
        this.sort(this.compare);
        return result;
    }
}

export default PriorityQueue;