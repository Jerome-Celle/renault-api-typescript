import DoneCallback = jest.DoneCallback;
import { switchMap, take } from 'rxjs';
import { Kamereon } from '../src/kamereon/kamereon';

require('dotenv').config();

const loginID: string = process.env.loginID || '';
const password: string = process.env.password || '';

test('check first renault api methods', (done: DoneCallback) => {
  const kamereon: Kamereon = Kamereon.instance();

  kamereon
    .login({
      loginID: loginID,
      password: password,
    })
    .pipe(
      take(1),
      switchMap(() => kamereon.getPerson()),
      switchMap(() => kamereon.getVehicles()),
      switchMap(() => kamereon.getVehicle(process.env.vinTest || ''))
    )
    .subscribe({
      next: (value) => {
        console.log(value);
        done();
      },
      error: (data) => {
        console.log(data);
        done();
      },
    });
});
