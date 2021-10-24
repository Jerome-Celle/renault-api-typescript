import { map, Observable, switchMap, tap } from 'rxjs';
import { IAccountJWT, IAccountLogin, IGigyaJWTPayload } from './models/account';
import { axiosRxjs } from '../axios-rxjs';
import { JwtPayload } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');

require('dotenv').config();

export class Gigya {
  static _instance: Gigya;

  public jwtToken: string | undefined;
  public jwtPayload: IGigyaJWTPayload | undefined;

  get personID(): string | undefined {
    return this.jwtPayload?.personId;
  }

  private apikey: string | undefined;
  private loginID: string | undefined;
  private password: string | undefined;

  private loginToken: string | undefined;

  // eslint-disable-next-line no-useless-constructor
  private constructor() {
    this.apikey = process.env.apikey || '';
  }

  public static instance(): Gigya {
    if (!Gigya._instance) {
      Gigya._instance = new Gigya();
    }
    return Gigya._instance;
  }

  public login(initData: {
    loginID: string;
    password: string;
  }): Observable<IAccountJWT> {
    this.loginID = initData.loginID;
    this.password = initData.password;
    return this._accountsLogin().pipe(
      switchMap(() => this._accountsJWT()),
      tap((data: IAccountJWT) => {
        if (data.id_token) {
          this.jwtToken = data.id_token;
          const payload: JwtPayload | string | null = jwt.decode(data.id_token);
          if (payload && typeof payload !== 'string') {
            this.jwtPayload = {
              ...payload,
              apiKey: payload.apiKey,
              personId: payload['data.personId'],
              gigyaDataCenter: payload['data.gigyaDataCenter'],
            };
          }
        }
      })
    );
  }

  private _accountsLogin(): Observable<IAccountLogin> {
    return axiosRxjs
      .get<IAccountLogin>('https://accounts.eu1.gigya.com/accounts.login', {
        params: {
          apikey: this.apikey,
          loginID: this.loginID,
          password: this.password,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .pipe(
        map((response) => response.data),
        tap(
          (account: IAccountLogin) =>
            (this.loginToken = account.sessionInfo.cookieValue)
        )
      );
  }

  private _accountsJWT(): Observable<IAccountJWT> {
    return axiosRxjs
      .get<IAccountJWT>('https://accounts.eu1.gigya.com/accounts.getJWT', {
        params: {
          ApiKey: this.apikey,
          login_token: this.loginToken,
          fields: 'data.personId,data.gigyaDataCenter',
          expiration: 900,
        },
        headers: {
          'Content-type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }
}
