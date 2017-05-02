import 'mocha';
import {expect} from 'chai';
import {PriorityQueue} from '../../src';

describe('PriorityQueue', () => {
    let instance;
    beforeEach(() => {
        instance = new PriorityQueue();
    });

    describe('#push()', () => {
        it('should accept number argument and execute default sort', () => {
            instance.push(1);
            instance.push(0);
            expect(instance.peek()).to.equal(0);
        });

        it('should accept number arguments and execute default sort', () => {
            instance.push(5, 4, 3, 2, 1);
            expect(instance.length).to.equal(5);
            expect(instance).to.have.members([5, 4, 3, 2, 1]);
            expect([instance[0], instance[1], instance[2], instance[3], instance[4]]).to.deep.equal([
                1, 2, 3, 4, 5
            ]);
        });

        it('should accept string arguments and execute default sort', () => {
            instance.push('World', 'Hello');
            expect(instance.peek()).to.equal('Hello');
        });

        it('should accept string arguments and execute alternative sort', () => {
            instance = new PriorityQueue({
                compare(a: string, b: string) {
                    return a < b ? 1 : a < b ? -1 : 0;
                }
            });

            instance.push('Hello', 'World');
            expect(instance[0]).to.equal('World');
            expect(instance[1]).to.equal('Hello');
        });

        it('should accept object arguments and execute sort by key when `compare` is string', () => {
            instance = new PriorityQueue({
                compare: 'priority.realPriority'
            });

            instance.push({
                str: 'has lower priority',
                priority: {
                    realPriority: 10
                }
            }, {
                str: 'has higher priority',
                priority: {
                    realPriority: 1
                }
            }, {
                str: 'has highest priority',
                priority: {
                    realPriority: 0
                }
            }, {
                str: 'has higher priority',
                priority: {
                    realPriority: 1
                }
            });

            expect(instance[0].priority.realPriority).to.equal(0);
            expect(instance[1].priority.realPriority).to.equal(1);
            expect(instance[2].priority.realPriority).to.equal(1);
            expect(instance[3].priority.realPriority).to.equal(10);
        });

        it('should accept object arguments and execute sort by key, when `compare` is Array instance', () => {
            instance = new PriorityQueue({
                compare: ['priority', '0']
            });

            instance.push({
                str: 'has lowest priority',
                priority: [20]
            }, {
                str: 'has lower priority',
                priority: [10]
            }, {
                str: 'has highest priority',
                priority: [0]
            }, {
                str: 'has higher priority',
                priority: [1]
            });

            expect(instance[0].priority[0]).to.equal(0);
            expect(instance[1].priority[0]).to.equal(1);
            expect(instance[2].priority[0]).to.equal(10);
            expect(instance[3].priority[0]).to.equal(20);
        });

        it('should accept object arguments and execute alternative sort', () => {
            instance.compare = (a: object, b: object) => {
                if (a['priority'] > b['priority']) {
                    return -1;
                } else if (a['priority'] < b['priority']) {
                    return 1;
                }

                return 0;
            };

            instance.push({
                str: 'has lowest priority',
                priority: 20
            }, {
                str: 'has higher priority',
                priority: 1
            }, {
                str: 'has lower priority',
                priority: 10
            }, {
                str: 'has highest priority',
                priority: 0
            });

            expect(instance[0].priority).to.equal(20);
            expect(instance[1].priority).to.equal(10);
            expect(instance[2].priority).to.equal(1);
            expect(instance[3].priority).to.equal(0);
        });
    });
});