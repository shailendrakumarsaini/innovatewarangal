import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../../../models/Alert';


@Injectable()
export class AlertService { 
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    // subscribe to alerts
    getAlert(alertId?: string): Observable<any> {
      //  return this.subject.asObservable().filter((x: Alert) => x && x.alertId === alertId);
      return this.subject.asObservable();
    }

    // convenience methods
    success(message: string) {
        this.alert(new Alert({ message, type: AlertType.Success }));
        setTimeout(() => {
            this.clear();
        }, 2000);
      
    }

    error(message: string) {
        this.alert(new Alert({ message, type: AlertType.Error }));
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    info(message: string) {
        this.alert(new Alert({ message, type: AlertType.Info }));
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    warn(message: string) {
        this.alert(new Alert({ message, type: AlertType.Warning }));
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    // main alert method    
    alert(alert: Alert) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    // clear alerts
    clear(alertId?: string) {
        this.subject.next(new Alert({ alertId }));
    }
}