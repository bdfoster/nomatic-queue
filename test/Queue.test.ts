import 'mocha';
import {expect} from 'chai';
import {Queue} from '../src';

describe('Queue', () => {
    describe('#constructor()', () => {
        it('should create a new instance with no options', () => {
            expect(new Queue()).to.exist;
        });

        it('should create a new instance with `data`', () => {
            const instance = new Queue({
                data: [
                    0, 1, 2, 3, 4
                ]
            });

            expect(instance).to.exist;
            expect(instance).to.deep.equal([
                0, 1, 2, 3, 4
            ]);
        });
    });

    describe('#pop()', () => {
        it('should return the first element', () => {
            const instance = new Queue({
                data: [
                    1, 2, 3, 4, 5
                ]
            });

            expect(instance.pop()).to.equal(1);
        });

        it('should decrement `length` by 1', () => {
            const instance = new Queue({
                data: [
                    1, 2, 3, 4, 5
                ]
            });

            const startLength = instance.length;
            instance.pop();
            expect(instance.length).to.equal((startLength - 1));
        });

        it('should return undefined when length of 0', () => {
            const instance = new Queue();
            expect(instance.pop()).to.equal(undefined);
        })
    });

    describe('#peek()', () => {
        it('should return the first element', () => {
            const instance = new Queue({
                data: [
                    1, 2, 3, 4, 5
                ]
            });

            expect(instance.peek()).to.equal(1);
        });

        it('should not decrement `length` by 1', () => {
            const instance = new Queue({
                data: [
                    1, 2, 3, 4, 5
                ]
            });

            const startLength = instance.length;
            instance.peek();
            expect(instance.length).to.equal(startLength);
        });
    });

    describe('#clone()', () => {
        it('should return a clone of instance', () => {
            const instance = new Queue({
                data: [
                    1, 2, 3, 4, 5
                ]
            });

            const clone = instance.clone();

            expect(instance).to.not.equal(clone);
            expect(instance).to.deep.equal(clone);
        });
    });
});
