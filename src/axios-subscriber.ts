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
    if (!this.aborted) {
      this.source.cancel('Operation canceled by the user.');
      this.aborted = true;
    }
  }
}

export function axiosGet<T = unknown, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Observable<R> {
  return new Observable((observer) => {
    return new AxiosSubscriber(observer, url, config);
  });
}
