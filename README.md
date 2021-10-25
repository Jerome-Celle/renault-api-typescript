Renault API Typescript + RXJS
=============================
[![Coverage Status](https://coveralls.io/repos/github/Jerome-Celle/renault-api-typescript/badge.svg?branch=master)](https://coveralls.io/github/Jerome-Celle/renault-api-typescript?branch=master)
![example workflow](https://github.com/Jerome-Celle/renault-api-typescript/actions/workflows/tests.yml/badge.svg)

The goal it's to create an api that can be use directly with rxjs Observable to fetch Renault API data.

API Usage
---------

```typescript
import { switchMap } from 'rxjs';
import { Kamereon } from '../src';

const kamereon: Kamereon = Kamereon.instance();

kamereon
  .login({
    loginID: 'loginID',
    password: 'password',
  })
  .pipe(
    switchMap(() => kamereon.getPerson()),
    switchMap(() => kamereon.getVehicles()),
    switchMap(() => kamereon.getVehicle('VIN_ID'))
  )
  .subscribe({
    next: (value) => {
      console.log(value);
    },
  });
```

License
-------
Distributed under the terms of the MIT_ license,
*Renault API Typescript* is free and open source software.

Disclaimer
-------
This project is not affiliated with, endorsed by, or connected to Renault. I accept no responsibility for any consequences, intended or accidental, as a as a result of interacting with Renault's API using this project.

Credits
-------

This project was heavily inspired on https://github.com/hacf-fr/renault-api python client.
