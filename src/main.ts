import axios from 'axios';
import { Observable } from 'rxjs';
import { axiosGet } from './axios-subscriber';
require('dotenv').config();

export function sum(a: number, b: number): number {
  return a + b;
}

export function axiosGetTest(): Observable<unknown> {
  return axiosGet('https://accounts.eu1.gigya.com/accounts.login', {
    params: {
      apikey: process.env.apikey,
      loginID: process.env.loginID,
      password: process.env.password,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export function axiosGetJWT(): Promise<unknown> {
  return axios.get(
    `https://api-wired-prod-1-euw1.wrd-aws.com/commerce/v1/accounts/${process.env.accountID}/vehicles?country=FR`,
    {
      headers: {
        apikey: 'apikey',
        'x-gigya-id_token': 'x-gigya-id_token',
        'Content-type': 'application/vnd.api+json',
        'access-control-allow-origin': '*',
      },
    }
  );
}
