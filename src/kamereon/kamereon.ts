import { axiosRxjs } from '../axios-rxjs';
import { Gigya, IAccountJWT } from '../gigya';
import { map, Observable, of, tap } from 'rxjs';
import { AxiosRequestHeaders } from 'axios';
import { IPerson } from './models/person';
import { IVehicleLocation, IVehicles } from './models/vehicle';

require('dotenv').config();

export class Kamereon {
  static _instance: Kamereon;
  private _gigya: Gigya;
  private readonly _apiKey: string;
  private _accountID: string | undefined;

  private constructor() {
    this._gigya = Gigya.instance();
    this._apiKey = process.env.apiKeyKamereon || '';
  }

  public static instance(): Kamereon {
    if (!Kamereon._instance) {
      Kamereon._instance = new Kamereon();
    }
    return Kamereon._instance;
  }

  public login({
    loginID,
    password,
  }: {
    loginID: string;
    password: string;
  }): Observable<IAccountJWT> {
    return this._gigya.login({
      loginID,
      password,
    });
  }

  public getPerson(): Observable<IPerson | null> {
    if (this._gigya.jwtToken) {
      const url: string = `https://api-wired-prod-1-euw1.wrd-aws.com/commerce/v1/persons/${this._gigya.personID}`;
      const headers: AxiosRequestHeaders = {
        'Content-type': 'application/vnd.api+json',
        apikey: this._apiKey,
        'x-gigya-id_token': this._gigya.jwtToken,
      };
      return axiosRxjs
        .get<IPerson>(url, {
          params: {
            country: 'FR',
          },
          headers,
        })
        .pipe(
          map((data) => data.data),
          tap((person: IPerson) => {
            this._accountID = person.accounts.find(
              (account) => account.accountType === 'MYRENAULT'
            )?.accountId;
          })
        );
    } else {
      return of(null);
    }
  }

  public getVehicles(): Observable<IVehicles | null> {
    if (this._gigya.jwtToken && this._accountID) {
      const url: string = `https://api-wired-prod-1-euw1.wrd-aws.com/commerce/v1/accounts/${this._accountID}/vehicles?country=FR`;
      const headers: AxiosRequestHeaders = {
        'Content-type': 'application/vnd.api+json',
        apikey: this._apiKey,
        'x-gigya-id_token': this._gigya.jwtToken,
      };
      return axiosRxjs
        .get<IVehicles>(url, {
          params: {
            country: 'FR',
          },
          headers,
        })
        .pipe(map((data) => data.data));
    } else {
      return of(null);
    }
  }

  public getVehicle(vin: string): Observable<IVehicleLocation | null> {
    if (this._gigya.jwtToken && this._accountID) {
      const url: string = `https://api-wired-prod-1-euw1.wrd-aws.com/commerce/v1/accounts/${this._accountID}/kamereon/kca/car-adapter/v1/cars/${vin}/location`;
      const headers: AxiosRequestHeaders = {
        'Content-type': 'application/vnd.api+json',
        apikey: this._apiKey,
        'x-gigya-id_token': this._gigya.jwtToken,
      };
      return axiosRxjs
        .get<IVehicleLocation>(url, {
          params: {
            country: 'FR',
          },
          headers,
        })
        .pipe(map((data) => data.data));
    } else {
      return of(null);
    }
  }
}
