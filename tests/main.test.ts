import DoneCallback = jest.DoneCallback;
import { take } from 'rxjs';
import { gigya } from '../src/gigya/gigya';

require('dotenv').config();

const loginID: string = process.env.loginID || '';
const password: string = process.env.password || '';

test('check axios get', (done: DoneCallback) => {
  gigya.login({
    loginID: loginID,
    password: password,
  });
  gigya.jwtToken$.pipe(take(1)).subscribe({
    next: (jwtToken: string) => {
      expect(jwtToken.startsWith('eyJ0')).toEqual(true);
    },
    error: (data) => {
      console.log(data);
    },
    complete: () => done(),
  });
});
