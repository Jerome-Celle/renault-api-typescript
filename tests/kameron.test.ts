import DoneCallback = jest.DoneCallback;
import { Kamereon } from '../src';
import {
  accountJWTOkData,
  accountLoginDataOK,
  gigyaJWTPayloadOkData,
} from './fixtures/gigya';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { switchMap } from 'rxjs';
import { personOkData } from './fixtures/kameron';

const mockAxios = new MockAdapter(axios);
describe('test kameron login', () => {
  test('login success', (done: DoneCallback) => {
    const kamereon: Kamereon = Kamereon.instance();

    mockAxios
      .onGet('https://accounts.eu1.gigya.com/accounts.login')
      .reply(200, accountLoginDataOK);

    mockAxios
      .onGet('https://accounts.eu1.gigya.com/accounts.getJWT')
      .reply(200, accountJWTOkData);

    mockAxios
      .onGet(
        `https://api-wired-prod-1-euw1.wrd-aws.com/commerce/v1/persons/${gigyaJWTPayloadOkData.personId}`
      )
      .reply(200, personOkData);

    kamereon
      .login({
        loginID: 'loginID',
        password: 'password',
      })
      .pipe(switchMap(() => kamereon.getPerson()))
      .subscribe({
        next: (value) => {
          expect(value).not.toBe(null);
          if (value) {
            expect(value.accounts[0].accountId).toBe(
              personOkData.accounts[0].accountId
            );
          }
          done();
        },
        error: (data) => {
          console.log(data);
          done();
        },
      });
  });
});
