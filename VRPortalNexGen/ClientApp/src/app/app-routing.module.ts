import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CommonStepperPlatformComponent } from './common-stepper-platform/common-stepper-platform.component';
import { ScheduleReportComponent } from './schedule-report/schedule-report.component';
import { ScheduledbreportComponent } from './scheduledbreport/scheduledbreport.component';
import { SchedulefilereportComponent } from './schedulefilereport/schedulefilereport.component';
import { FileInputWidgetComponent } from './file-input-widget/file-input-widget.component';
import { DbcomponentComponent } from './dbcomponent/dbcomponent.component';
import { LoginComponent } from '../api-authorization/login/login.component';
// import { AuthGuard } from './auth/auth.guard';
import { AuthenticationGuard } from 'microsoft-adal-angular6';


const routes: Routes = [
  { path: '', component: FetchDataComponent, pathMatch: 'full', canActivate: [AuthenticationGuard]},
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthenticationGuard]},
  { path: 'auth-callback', component: LoginComponent},
  {
    path: 'common-platform', component: CommonStepperPlatformComponent, canActivate: [AuthenticationGuard],
    children: [{ path: 'db-source', component: DbcomponentComponent, canActivate: [AuthenticationGuard], runGuardsAndResolvers: 'always' },
    { path: 'file-upload', component: FileInputWidgetComponent, canActivate: [AuthenticationGuard], runGuardsAndResolvers: 'always' }]
  },
  {
    path: 'schedule-report', component: ScheduleReportComponent,
    children: [{ path: 'schedule-dbreport', component: ScheduledbreportComponent },
    { path: 'schedule-filereport', component: SchedulefilereportComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: `reload` })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
