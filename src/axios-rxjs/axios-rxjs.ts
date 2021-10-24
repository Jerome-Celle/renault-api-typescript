import { Observable, Observer, Subscriber } from 'rxjs';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
// @ts-ignore
import axiosCancel from 'axios-cancel';

// add prototype method
// @ts-ignore
axiosCancel(axios);

const CancelToken = axios.CancelToken;

class AxiosSubscriber<
  T = unknown,
  R = AxiosResponse<T>,
  D = any
> extends Subscriber<T> {
  source: CancelTokenSource;
  aborted: boolean;
  constructor(
    observer: Subscriber<any> | Observer<any>,
    url: string,
    config?: AxiosRequestConfig<D>
  ) {
    super(observer);

    this.source = CancelToken.source();

    // XHR abort pointer
    this.aborted = false;

    const configWithCancel: AxiosRequestConfig<D> = {
      cancelToken: this.source.token,
      ...config,
    };

    // make axios request on subscription
    axios
      .get<T, R, D>(url, configWithCancel)
      .then((response) => {
        observer.next(response);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  }

  unsubscribe() {
    super.unsubscribe();

    // cancel XHR
    if (!this.aborted && this.source) {
      this.source.cancel('Operation canceled by the user.');
      this.aborted = true;
    }
  }
}

class AxiosPostSubscriber<
  T = unknown,
  R = AxiosResponse<T>,
  D = any
> extends Subscriber<T> {
  source: CancelTokenSource;
  aborted: boolean;
  constructor(
    observer: Subscriber<any> | Observer<any>,
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) {
    super(observer);

    this.source = CancelToken.source();

    // XHR abort pointer
    this.aborted = false;

    const configWithCancel: AxiosRequestConfig<D> = {
      cancelToken: this.source.token,
      ...config,
    };

    // make axios request on subscription
    axios
      .post<T, R, D>(url, data, configWithCancel)
      .then((response) => {
        observer.next(response);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  }

  unsubscribe() {
    super.unsubscribe();

    // cancel XHR
    if (!this.aborted && this.source) {
      this.source.cancel('Operation canceled by the user.');
      this.aborted = true;
    }
  }
}

export class AxiosRxjs {
  get<T = unknown, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Observable<R> {
    return new Observable((observer) => {
      return new AxiosSubscriber(observer, url, config);
    });
  }

  post<T = unknown, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Observable<R> {
    return new Observable((observer) => {
      return new AxiosPostSubscriber(observer, url, data, config);
    });
  }
}

export const axiosRxjs: AxiosRxjs = new AxiosRxjs();
