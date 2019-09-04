import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './Directives/alert/alert.service';

@Injectable({
    providedIn : 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor{

    constructor( private alertService:AlertService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                // window.alert(errorMessage);
                this.alertService.error('Problem with service');
                return throwError(errorMessage);
                })
        )
    }
    
}