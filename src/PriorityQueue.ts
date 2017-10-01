import * as get from 'lodash.get';
import Queue, {QueueOptions} from './Queue';

export type PriorityQueueCompareFunction<T> = (a: T, b: T) => -1 | 1 | 0;

export interface PriorityQueueOptions<T> extends QueueOptions<T> {
    compare?: PriorityQueueCompareFunction<T> | (string | number)[] | string;
}

export class PriorityQueue<T> extends Queue<T> {
    constructor(options: PriorityQueueOptions<T> = {}) {
        super(options);

        if (options.compare) {
            if (typeof options.compare === 'function') {
                this.compare = options.compare;
            } else {
                const compareKey = options.compare;
                this.compare = (a, b) => {
                    a = get(a, compareKey);
                    b = get(b, compareKey);

                    return a < b ? -1 : a > b ? 1 : 0;
                };
            }
        }


    }

    public compare(a: T, b: T) {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    public push(...items: T[]) {
        const result = super.push(...items);
        this.sort(this.compare);
        return result;
    }
}

export default PriorityQueue;
