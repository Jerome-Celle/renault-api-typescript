import DoneCallback = jest.DoneCallback;
import { gigya, Gigya } from '../src';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  accountJWTOkData,
  accountLoginDataOK,
  gigyaJWTPayloadOkData,
} from './fixtures/gigya';

const mockAxios = new MockAdapter(axios);

describe('test kameron login', () => {
  test('login success', (done: DoneCallback) => {
    mockAxios
      .onGet('https://accounts.eu1.gigya.com/accounts.login')
      .reply(200, accountLoginDataOK);

    mockAxios
      .onGet('https://accounts.eu1.gigya.com/accounts.getJWT')
      .reply(200, accountJWTOkData);

    expect(gigya instanceof Gigya).toBeTruthy();

    gigya
      .login({
        loginID: 'loginID',
        password: 'password',
      })
      .subscribe({
        next: (value) => {
          expect(value.id_token).toBe(accountJWTOkData.id_token);
          expect(gigya.personID).toBe(gigyaJWTPayloadOkData.personId);
          done();
        },
        error: (data) => {
          console.log(data);
        },
      });
  });
});
