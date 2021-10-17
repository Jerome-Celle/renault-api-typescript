import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { IAccountJWT, IAccountLogin } from './models/account';
import { axiosGet } from '../axios-subscriber';

require('dotenv').config();

export class Gigya {
  static _instance: Gigya;

  private _jwtToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public jwtToken$: Observable<string> = this._jwtToken.pipe(
    filter((token) => token !== '')
  );

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

  public login(initData: { loginID: string; password: string }) {
    this.loginID = initData.loginID;
    this.password = initData.password;
    this._accountsLogin()
      .pipe(switchMap(() => this._accountsJWT()))
      .subscribe({
        next: (data: IAccountJWT) => {
          this._jwtToken.next(data.id_token);
        },
      });
  }

  private _accountsLogin(): Observable<IAccountLogin> {
    return axiosGet<IAccountLogin>(
      'https://accounts.eu1.gigya.com/accounts.login',
      {
        params: {
          apikey: this.apikey,
          loginID: this.loginID,
          password: this.password,
        },
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).pipe(
      map((response) => response.data),
      tap(
        (account: IAccountLogin) =>
          (this.loginToken = account.sessionInfo.cookieValue)
      )
    );
  }

  private _accountsJWT(): Observable<IAccountJWT> {
    return axiosGet<IAccountJWT>(
      'https://accounts.eu1.gigya.com/accounts.getJWT',
      {
        params: {
          ApiKey: this.apikey,
          login_token: this.loginToken,
          fields: 'data.personId,data.gigyaDataCenter',
          expiration: 900,
        },
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).pipe(
      tap(console.log),
      map((response) => response.data)
    );
  }
}

export const gigya = Gigya.instance();
