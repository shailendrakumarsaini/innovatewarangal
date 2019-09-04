      // Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

      // Components
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { InnovatorsComponent } from './innovators/innovators.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { InnovatorsdetailsComponent } from './innovatorsdetails/innovatorsdetails.component';
import { AuthGuard } from './shared/Guards/authguard';
import { LoginGuard } from './shared/Guards/loginguard';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './news/news.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { AboutwarangalComponent} from './aboutwarangal/aboutwarangal.component';
import { NewsblogdetailsComponent } from './newsblogdetails/newsblogdetails.component';

 
const AppRoutes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'home', component : HomeComponent },
  { path : 'eventdetails', component : EventdetailsComponent },
  { path : 'innovatordetails', component : InnovatorsdetailsComponent },
  { path : 'events', component : EventsComponent },
  { path : 'innovators', component : InnovatorsComponent },
  { path : 'blog', component : BlogComponent },
  { path : 'news', component : NewsComponent },
  { path : 'newsdetails', component : NewsdetailsComponent },
  { path : 'blogdetails', component : BlogdetailsComponent },
  { path : 'newsblogdetails/:id', component : NewsblogdetailsComponent },
  { path : 'login', component : LoginComponent, canActivate : [LoginGuard] },
  { path : 'admin', component : AdminviewComponent,canActivate : [AuthGuard] },
  { path : 'aboutwarangal', component : AboutwarangalComponent},
  // { path : '**', redirectTo : 'home', pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes,{ onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
