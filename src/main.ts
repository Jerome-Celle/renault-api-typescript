import { Observable } from 'rxjs';
import { axiosGet } from './axios-subscriber';

require('dotenv').config();

export function getVehicles(): Observable<any> {
  return axiosGet(
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
