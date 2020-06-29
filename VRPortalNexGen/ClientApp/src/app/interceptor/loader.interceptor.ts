// loader.interceptors.ts
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../Services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length);
    }

    intercept(req: HttpRequest<any>,  next: HttpHandler): Observable<HttpEvent<any>> {

        this.requests.push(req);
        console.log('No of requests--->' + this.requests.length);
        this.loaderService.isLoading.next(1);
        // tslint:disable-next-line: deprecation
        return Observable.create( observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        switch (event.type) {
                            case HttpEventType.Sent:
                              console.log('Request sent!');
                              break;
                            case HttpEventType.ResponseHeader:
                              console.log('Response header received!');
                              break;
                            case HttpEventType.UploadProgress:
                              const percentDone = Math.round(100 * event.loaded / event.total);
                              this.loaderService.isLoading.next(percentDone);
                              break;
                            case HttpEventType.Response:
                            //   console.log('😺 Done!', event.body);
                          }
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                            // const percentDone = Math.round(100 * event.loaded / event.total);
                        }
                    },
                    err => {
                        alert('error returned');
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
