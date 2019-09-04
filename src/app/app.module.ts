      // Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberModule } from './shared/number.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MAT_DATE_FORMATS,
  DateAdapter as DataAdapterFormMaterial
 } from '@angular/material';
 import { NativeDateAdapter } from "@angular/material";
 import { AppRoutingModule } from './app-routing.module';
 import { LocationStrategy, PathLocationStrategy} from '@angular/common';

      // Components
import { AppComponent } from './app.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';;
import { LoginComponent } from './login/login.component';
import { InnovatorsComponent } from './innovators/innovators.component';
import { InnovatorsdetailsComponent } from './innovatorsdetails/innovatorsdetails.component';
import { AdminviewComponent } from './adminview/adminview.component';

      // Services
import { HttpErrorInterceptor } from './shared/httpErrorInterceptor';
import { ConfigService } from './shared/configService';
import { EventService } from './services/event.service';
import { AuthGuard } from './shared/Guards/authguard';
import { LoginGuard } from './shared/Guards/loginguard';
import { FragmentPolyfillModule } from './shared/fragment-polyfill.module';
import { AlertComponent } from './shared/Directives/alert/alert.component';
import { AlertService } from './shared/Directives/alert/alert.service';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './news/news.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { AboutwarangalComponent } from './aboutwarangal/aboutwarangal.component';
import { NewsblogdetailsComponent } from './newsblogdetails/newsblogdetails.component';
import { TruncatePipe } from './shared/limit.pipe';


export class AppDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return date.toDateString();
    }
}

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
      },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};


@NgModule({
  declarations: [
    AppComponent,
    EventdetailsComponent,
    HomeComponent,
    EventsComponent,
    LoginComponent,
    InnovatorsComponent,
    AdminviewComponent,
    InnovatorsdetailsComponent,
    AlertComponent,
    BlogComponent,
    NewsComponent,
    NewsdetailsComponent,
    BlogdetailsComponent,
    AboutwarangalComponent,
    NewsblogdetailsComponent,
    TruncatePipe
  ], 
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    NumberModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    AngularFileUploaderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    NgxLoadingModule.forRoot({}),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModalModule,
    FragmentPolyfillModule.forRoot({ smooth :true})
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    { provide:LocationStrategy, useClass:PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: DataAdapterFormMaterial, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ConfigService,
    EventService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
