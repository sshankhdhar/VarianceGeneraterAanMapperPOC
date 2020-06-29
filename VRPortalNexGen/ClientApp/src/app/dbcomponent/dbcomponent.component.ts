import { Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import {
  DataSourceColumnList, StoredProcedureParameterNameList,
  StoredProcedureNameList, TableNameList, DatabaseNameList
} from '../Models/data-source-column-list';
import { ColumnList } from '../Models/column-list';
import { SiblingComponentDataSharingService } from '../Services/component.2way.databinding.service';
import { Subscription, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SqlcredentialsComponent } from '../sqlcredentials/sqlcredentials.component';
import { DBDetails } from '../Models/dbdetails';
import { VrportalService } from '../vrportal.service';
import { SqlspparameterComponent } from '../sqlspparameter/sqlspparameter.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-dbcomponent',
  templateUrl: './dbcomponent.component.html',
  styleUrls: ['./dbcomponent.component.scss']
})
export class DbcomponentComponent implements OnInit {
  // @Input() source: string;
  navigationSubscription;
  state$: Observable<DataSourceColumnList>;
  subscription: Subscription;
  dataSourceColumns = new DataSourceColumnList();
  // public IsDBAvailable = false;
  // public IsDatabaseSelected = false;
  // public IsTableAvailable = false;
  // public IsStoredProcedureAvailable = false;
  // public IsQuerySelected = false;
  // public IsColumnAvailable = false;

  // public IsResultAvailable = false;
  // public dboption;
  // public show = false;

  // windowsflag = false;
  // sqlflag = false;
  credentialType = 'Windows';
  dbServerUserName;
  dbServerPassword;
  BaseUrl: any;

  public DBDetailsObj1 = new DBDetails();
  // dbServerName: string;
  // dbNameList: DatabaseNameList[];

  // databaseNames: string;
  // tableNameList: TableNameList[] = [];

  // tableNames: string;
  // public ColumnName: ColumnList[];

  // databaseObjectType: string;
  // public storedProcedureNameList: StoredProcedureNameList[] = [];

  // storedProcedureNames: string;
  // public storedProcedureParameterNameList: StoredProcedureParameterNameList[] = [];

  // sqlQuery: string;

  constructor(private http: HttpClient, private router: Router, private PostService: VrportalService,
              private siblingComponentDataSharingService: SiblingComponentDataSharingService,
              public activatedRoute: ActivatedRoute, @Inject('BASE_URL') baseUrl: string,
              private modalService: NgbModal) {
    this.BaseUrl = baseUrl;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.datasource as DataSourceColumnList)).subscribe(
        result => { this.dataSourceColumns = result, console.log(this.dataSourceColumns); },
        error => console.log(error as any)
      );
  }
  ngOnInit() {
    // this.subscription = this.siblingComponentDataSharingService
    //   .DataSourceColumnList$
    //   .subscribe(message => {
    //     if (message.Source === this.dataSourceColumns.Source) {
    //       this.dataSourceColumns.ColumnNameList = message.ColumnNameList;
    //     }
    //   });
  }

  UpdateDatasourceModel() {
    this.siblingComponentDataSharingService.watchDataSourceColumnList(this.dataSourceColumns);
  }
  handleChange(event) {
    this.credentialType = event.value;
    if (event.value === 'Windows') {
      this.dataSourceColumns.Flag.windowsflag = true;
      this.dataSourceColumns.Flag.sqlflag = false;

    } else {
      this.dataSourceColumns.Flag.windowsflag = false;
      this.dataSourceColumns.Flag.sqlflag = true;
    }
    this.UpdateDatasourceModel();
  }
  onSubmit() {
    this.dbServerUserName = this.dbServerUserName;
    this.dbServerPassword = this.dbServerPassword;
  }






  autogrow(e) {
    e.target.style.height = '0px';
    e.target.style.height = (e.target.scrollHeight) + 'px';
  }

  CheckDatabaseSelected() {
    this.dataSourceColumns.Flag.IsDatabaseSelected = true;
    this.dataSourceColumns.Flag.IsQuerySelected = false;
    this.dataSourceColumns.Flag.IsColumnAvailable = false;
    this.dataSourceColumns.SqlQuery = '';
    this.UpdateDatasourceModel();
    console.log('app' + this.dataSourceColumns.Flag.IsColumnAvailable);
  }
  GetDatabaseCredentials() {
    // const modalRef = this.modalService.open(SqlcredentialsComponent);
    // modalRef.result.then((result: DataSourceColumnList) => {
    this.dataSourceColumns.AuthenticationType = this.credentialType;
    this.dataSourceColumns.UserName = this.dbServerUserName;
    this.dataSourceColumns.Password = this.dbServerPassword;
    if (this.dataSourceColumns.AuthenticationType === 'Windows') {
      this.dataSourceColumns.UserName = '';
      this.dataSourceColumns.Password = '';
    }
    this.GetDatabaseNames();
    this.UpdateDatasourceModel();
    // }).catch((error) => {
    //   console.log(error);
    // });

  }
  GetDatabaseNames() {
    this.dataSourceColumns.Flag.IsDBAvailable = false;
    this.dataSourceColumns.Flag.IsTableAvailable = false;
    this.dataSourceColumns.Flag.IsColumnAvailable = false;
    if (isNullOrUndefined(this.dataSourceColumns.DBServerName)) {
      alert('Please provide db server name');
    } else {
      // Sending Data as payload in Request Body
      this.http
        .post(this.BaseUrl + 'VRDb/GetDatabaseNames', this.dataSourceColumns)
        .subscribe(
          (data: DatabaseNameList[]) => {
            this.dataSourceColumns.dbNameList = data;
            if (data.length > 0) {
              this.dataSourceColumns.Flag.IsDBAvailable = true;
            } else {
              alert('No Database available');
            }
          },
          error => {
            this.dataSourceColumns.Flag.IsDBAvailable = false;

            console.error(error);
            alert(error.error.ExceptionMessage);
          }
        );
    }
  }
  GetDatabaseObjectDetails() {
    if (this.dataSourceColumns.DatabaseObjectType === 'Tables') {
      this.dataSourceColumns.Flag.IsQuerySelected = false;
      this.dataSourceColumns.SqlQuery = '';
      this.GetTableNames();
    } else if (this.dataSourceColumns.DatabaseObjectType === 'StoredProcedure') {
      this.dataSourceColumns.Flag.IsQuerySelected = false;
      this.dataSourceColumns.SqlQuery = '';
      this.GetStoredProcedureNames();
    } else {
      this.dataSourceColumns.Flag.IsStoredProcedureAvailable = false;
      this.dataSourceColumns.Flag.IsTableAvailable = false;
      this.dataSourceColumns.Flag.IsColumnAvailable = false;
      this.dataSourceColumns.Flag.IsQuerySelected = true;
    }
    this.UpdateDatasourceModel();
  }

  GetTableNames() {
    this.dataSourceColumns.Flag.IsStoredProcedureAvailable = false;
    this.dataSourceColumns.Flag.IsTableAvailable = false;
    this.dataSourceColumns.Flag.IsColumnAvailable = false;
    let body: HttpParams = new HttpParams();
    body = body.append('DBServerName', this.dataSourceColumns.DBServerName);
    body = body.append('DBName', this.dataSourceColumns.DBName);
    body = body.append('AuthenticationType', this.dataSourceColumns.AuthenticationType);
    body = body.append('UserName', this.dataSourceColumns.UserName);
    body = body.append('Password', this.dataSourceColumns.Password);
    this.http
      .post(this.BaseUrl + 'VRDb/GetDatabaseTables', body)
      .subscribe(
        (data: TableNameList[]) => {
          this.dataSourceColumns.tableNameList = data;
          if (data.length > 0) {
            this.dataSourceColumns.Flag.IsTableAvailable = true;
          } else {
            alert('No table available');
          }
        },
        error => {
          this.dataSourceColumns.Flag.IsTableAvailable = false;
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
  }
  GetStoredProcedureNames() {
    this.dataSourceColumns.Flag.IsStoredProcedureAvailable = false;
    this.dataSourceColumns.Flag.IsTableAvailable = false;
    this.dataSourceColumns.Flag.IsColumnAvailable = false;
    this.http
      .post(this.BaseUrl + 'VRDb/GetDatabaseStoredProcedureNames', this.dataSourceColumns)
      .subscribe(
        (data: StoredProcedureNameList[]) => {
          this.dataSourceColumns.storedProcedureNameList = data;
          if (data.length > 0) {
            this.dataSourceColumns.Flag.IsStoredProcedureAvailable = true;
          } else {
            alert('No table available');
          }
        },
        error => {
          this.dataSourceColumns.Flag.IsStoredProcedureAvailable = false;
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
  }
  GetStoredProcedureParameterNames() {
    this.dataSourceColumns.Flag.IsColumnAvailable = false;
    // let body: HttpParams = new HttpParams();
    // body = body.append('ServerName', JSON.stringify(this.dataSourceColumns.DBServerName));
    // body = body.append('DatabaseName', JSON.stringify(this.dataSourceColumns.DBName));
    // body = body.append('StoredProcedureName', JSON.stringify(this.dataSourceColumns.StoredProcedureName));
    // body = body.append('AuthenticationType', JSON.stringify(this.dataSourceColumns.AuthenticationType));
    // body = body.append('UserName', JSON.stringify(this.dataSourceColumns.UserName));
    // body = body.append('Password', JSON.stringify(this.dataSourceColumns.Password));
    this.http
      .post(this.BaseUrl + 'VRDb/GetStoredProcedureParameterNames', this.dataSourceColumns)
      .subscribe(
        (data: StoredProcedureParameterNameList[]) => {
          console.log(data);
          this.dataSourceColumns.storedProcedureParameterNameList = data;
          if (data.length > 0) {
            // this.IsColumnAvailable = true;
            const modalRef = this.modalService.open(SqlspparameterComponent);
            modalRef.componentInstance.storedProcedureParameterNameList = this.dataSourceColumns.storedProcedureParameterNameList;
            modalRef.result.then((result: DataSourceColumnList) => {
              this.dataSourceColumns.SpParameterValue = result.SpParameterValue;
              this.GetSpResultsetColumnNames();
            }).catch((error) => {
              console.log(error);
            });
            this.UpdateDatasourceModel();
          }
        },
        error => {
          this.dataSourceColumns.Flag.IsColumnAvailable = false;
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
    console.log('before' + this.dataSourceColumns.Flag.IsColumnAvailable);
  }
  GetColumnNames() {
    // let body: HttpParams = new HttpParams();
    // body = body.append('ServerName', JSON.stringify(this.dataSourceColumns.DBServerName));
    // body = body.append('DatabaseName', JSON.stringify(this.dataSourceColumns.DBName));
    // body = body.append('TableName', JSON.stringify(this.dataSourceColumns.TableName));
    // body = body.append('AuthenticationType', JSON.stringify(this.dataSourceColumns.AuthenticationType));
    // body = body.append('UserName', JSON.stringify(this.dataSourceColumns.UserName));
    // body = body.append('Password', JSON.stringify(this.dataSourceColumns.Password));
    this.http
      .post(this.BaseUrl + 'VRDb/GetTableColumnNames', this.dataSourceColumns)
      .subscribe(
        (data: ColumnList[]) => {
          // this.dataSourceColumns =  new DataSourceColumnList();
          this.dataSourceColumns.ColumnNameList = data;
          // this.dataSourceColumns.Source = this.source;
          if (data.length > 0) {
            this.dataSourceColumns.Flag.IsColumnAvailable = true;
          } else {
            alert('No column available');
          }
          this.dataSourceColumns.Flag.IsColumnAvailable = true;
          this.UpdateDatasourceModel();
        },
        error => {
          this.dataSourceColumns.Flag.IsColumnAvailable = false;
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
    console.log('dispur' + this.dataSourceColumns.Flag.IsColumnAvailable);
  }
  GetSpResultsetColumnNames() {
    // let body: HttpParams = new HttpParams();
    // body = body.append('ServerName', JSON.stringify(this.dataSourceColumns.DBServerName));
    // body = body.append('DatabaseName', JSON.stringify(this.dataSourceColumns.DBName));
    // body = body.append('StoredProcedureName', JSON.stringify(this.dataSourceColumns.StoredProcedureName));
    // body = body.append('SpParameterValue', JSON.stringify(this.dataSourceColumns.SpParameterValue));
    // body = body.append('AuthenticationType', JSON.stringify(this.dataSourceColumns.AuthenticationType));
    // body = body.append('UserName', JSON.stringify(this.dataSourceColumns.UserName));
    // body = body.append('Password', JSON.stringify(this.dataSourceColumns.Password));
    this.http
      .post(this.BaseUrl + 'VRDb/GetSpResultsetColumnNames', this.dataSourceColumns)
      .subscribe(
        (data: ColumnList[]) => {
          // this.dataSourceColumns =  new DataSourceColumnList();
          this.dataSourceColumns.ColumnNameList = data;
          // this.dataSourceColumns.Source = this.source;
          if (data.length > 0) {
            this.dataSourceColumns.Flag.IsColumnAvailable = true;
          } else {
            alert('No column available');
          }
          this.dataSourceColumns.Flag.IsColumnAvailable = true;
        },
        error => {
          this.dataSourceColumns.Flag.IsColumnAvailable = false;
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
  }
  GetQueryColumns() {
    // let body: HttpParams = new HttpParams();
    // body = body.append('ServerName', JSON.stringify(this.dataSourceColumns.DBServerName));
    // body = body.append('DatabaseName', JSON.stringify(this.dataSourceColumns.DBName));
    // body = body.append('SqlQuery', JSON.stringify(this.dataSourceColumns.SqlQuery));
    // body = body.append('AuthenticationType', JSON.stringify(this.dataSourceColumns.AuthenticationType));
    // body = body.append('UserName', JSON.stringify(this.dataSourceColumns.UserName));
    // body = body.append('Password', JSON.stringify(this.dataSourceColumns.Password));
    this.http
      .post(this.BaseUrl + 'VRDb/GetQueryResultsetColumnNames', this.dataSourceColumns)
      .subscribe(
        (data: ColumnList[]) => {
          // this.dataSourceColumns =  new DataSourceColumnList();
          this.dataSourceColumns.ColumnNameList = data;
          // this.dataSourceColumns.Source = this.source;
          if (data.length > 0) {
            this.dataSourceColumns.Flag.IsColumnAvailable = true;
          } else {
            alert('No column available');
          }
          this.dataSourceColumns.Flag.IsColumnAvailable = true;
          this.UpdateDatasourceModel();
        },
        error => {
          this.dataSourceColumns.Flag.IsColumnAvailable = false;
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
  }
}
