import DoneCallback = jest.DoneCallback;
import { AxiosRxjs } from '../src';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('test axios rxjs get', () => {
  it('fetch succesful', (done: DoneCallback) => {
    const axiosRxjs = new AxiosRxjs();
    const data = 'test';

    mockAxios.onGet('/test').reply(200, data);

    axiosRxjs.get('/test').subscribe((dataREturn) => {
      expect(dataREturn.data).toEqual(data);
      done();
    });
  });
  it('fetch error', (done: DoneCallback) => {
    const axiosRxjs = new AxiosRxjs();

    mockAxios.onGet('/test').timeout();

    axiosRxjs.get('/test').subscribe({
      error: (dataReturn) => {
        expect(dataReturn.message).toEqual('timeout of 0ms exceeded');
        done();
      },
    });
  });
});

describe('test axios rxjs post', () => {
  it('fetch succesful', (done: DoneCallback) => {
    const axiosRxjs = new AxiosRxjs();
    const data = 'test';

    mockAxios.onPost('/test').reply(200, data);

    axiosRxjs.post('/test').subscribe((dataREturn) => {
      expect(dataREturn.data).toEqual(data);
      done();
    });
  });
  it('fetch error', (done: DoneCallback) => {
    const axiosRxjs = new AxiosRxjs();

    mockAxios.onPost('/test').timeout();

    axiosRxjs.post('/test').subscribe({
      error: (dataReturn) => {
        expect(dataReturn.message).toEqual('timeout of 0ms exceeded');
        done();
      },
    });
  });
});
