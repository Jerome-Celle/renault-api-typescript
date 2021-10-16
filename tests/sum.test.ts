import { axiosGetTest, sum } from '../src';
import DoneCallback = jest.DoneCallback;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('check axios get', (done: DoneCallback) => {
  axiosGetTest().subscribe({
    next: (data: any) => {
      expect(data.data.statusCode).toBe(200);
    },
    error: (data) => {
      console.log(data);
    },
    complete: () => done(),
  });
});
