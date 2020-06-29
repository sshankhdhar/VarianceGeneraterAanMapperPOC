import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { AppConfig } from './Services/app.config';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VrportalService } from './vrportal.service';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DragulaModule } from 'ng2-dragula';
import { ColumnMappingWidgetComponent } from './column-mapping-widget/column-mapping-widget.component';
import { DbsourceComponent } from './dbsource/dbsource.component';
import { ComparisonOutputWidgetComponent } from './comparison-output-widget/comparison-output-widget.component';
import { ModaloutputComponent } from './modaloutput/modaloutput.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ComparisionOutputGridComponent } from './comparision-output-grid/comparision-output-grid.component';
import { ScheduleReportComponent } from './schedule-report/schedule-report.component';
import { DbcomponentComponent } from './dbcomponent/dbcomponent.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FileInputWidgetComponent } from './file-input-widget/file-input-widget.component';
import { DatafilterswidgetComponent } from './datafilterswidget/datafilterswidget.component';
import { ScheduledbreportComponent } from './scheduledbreport/scheduledbreport.component';
import { SchedulefilereportComponent } from './schedulefilereport/schedulefilereport.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SqlcredentialsComponent } from './sqlcredentials/sqlcredentials.component';
import { SqlspparameterComponent } from './sqlspparameter/sqlspparameter.component';
import { PiechartComponent } from './piechart/piechart.component';
import { ChartsModule } from 'ng2-charts';
import { TesterComponent } from './tester/tester.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonStepperPlatformComponent } from './common-stepper-platform/common-stepper-platform.component';
import { AppRoutingModule } from './app-routing.module';
// import {AuthGuard} from './auth/auth.guard';
import { LoaderService } from './Services/loader.service';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import {ApiAuthorizationModule} from '../api-authorization/api-authorization.module';
import { environment } from '../environments/environment';
// import { AdalService, AdalInterceptor } from 'adal-angular4';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { InsertAuthTokenInterceptor } from './interceptor/insert-auth-token-interceptor';

// tslint:disable-next-line:prefer-const
let adalConfig: any = {}; // will be initialized by APP_INITIALIZER
export function msAdalAngular6ConfigFactory() {
  return adalConfig; // will be invoked later when creating MsAdalAngular6Service
}
export function initializeApp(appConfig: AppConfig) {
  const promise = // () => {
    adalConfig = {
      clientId: 'ed9a6db5-f8ff-40c0-9b62-4b775defaa87',
      tenant: '93265ad1-e355-4b37-be68-68d083bb2cb5',
      redirectUri:  'https://localhost:5001/common-platform',
      endpoints: { 'https://localhost:5001/': 'ed9a6db5-f8ff-40c0-9b62-4b775defaa87'},
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    };
 // };
  appConfig.load();
  return () => promise;
}

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    FileuploadComponent,
    ColumnMappingWidgetComponent,
    DbsourceComponent,
    ComparisonOutputWidgetComponent,
    ModaloutputComponent,
    ProgressbarComponent,
    ComparisionOutputGridComponent,
    ScheduleReportComponent,
    DbcomponentComponent,
    CalendarComponent,
    FileInputWidgetComponent,
    DatafilterswidgetComponent,
    ScheduledbreportComponent,
    SchedulefilereportComponent,
    DatePickerComponent,
    SqlcredentialsComponent,
    SqlspparameterComponent,
    PiechartComponent,
    TesterComponent,
    ToolbarComponent,
    SidenavComponent,
    CommonStepperPlatformComponent
  ],
  entryComponents: [ComparisonOutputWidgetComponent, CalendarComponent, SqlcredentialsComponent, SqlspparameterComponent,
    DatePickerComponent,
    SqlcredentialsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    SidebarModule.forRoot(),
    DragulaModule.forRoot(),
    AgGridModule.withComponents([]),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiAuthorizationModule,
    MsAdalAngular6Module
  ],
  providers: [ VrportalService, // AuthGuard,
    LoaderService,
    AppConfig, { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfig], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InsertAuthTokenInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    AuthenticationGuard, MsAdalAngular6Service,
    { provide: 'adalConfig', useFactory: msAdalAngular6ConfigFactory, deps: [] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
