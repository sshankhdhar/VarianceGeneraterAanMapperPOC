import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSourceColumnList } from '../Models/data-source-column-list';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-scheduledbreport',
  templateUrl: './scheduledbreport.component.html',
  styleUrls: ['./scheduledbreport.component.scss']
})
export class ScheduledbreportComponent implements OnInit {
  @ViewChild('dbdetails1', { static: true }) dbdetails1: any;
  @ViewChild('dbdetails2', { static: true }) dbdetails2: any;
  @ViewChild('calendar', { static: true }) calendar: any;

  source1 = 'DBSource1';
  source2 = 'DBSource2';
  public DBDetailsObj1 = new DataSourceColumnList();
  public DBDetailsObj2 = new DataSourceColumnList();
  public strColumnName: string;
  public IsColumnAvailable = false;
  public ScheduleDate: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  ScheduleReport() {
    this.ScheduleDate =
      this.calendar.datemodel.year +
      '-' +
      this.calendar.datemodel.month +
      '-' +
      this.calendar.datemodel.day +
      ' ' +
      this.calendar.timemodel.hour +
      ':' +
      this.calendar.timemodel.minute;
      
      for (let i = 0; i < this.dbdetails1.dataSourceColumns.ColumnNameList.length; i++) {
        if (i === 0) {
          this.strColumnName = this.dbdetails1.dataSourceColumns.ColumnNameList[i].ColumnName;
        } else {
          this.strColumnName =
            this.strColumnName + ',' + this.dbdetails1.dataSourceColumns.ColumnNameList[i].ColumnName;
        }
      }
      this.DBDetailsObj1.DBServerName = this.dbdetails1.dbServerName;
      this.DBDetailsObj1.DBName = this.dbdetails1.databaseNames; 
      this.DBDetailsObj1.TableName = this.dbdetails1.tableNames;
      this.DBDetailsObj1.SqlQuery = this.dbdetails1.sqlQuery;
      this.DBDetailsObj1.ColumnName=this.strColumnName;
      this.DBDetailsObj1.DatabaseObjectType=this.dbdetails1.databaseObjectType;
      this.DBDetailsObj1.StoredProcedureName=this.dbdetails1.storedProcedureNames;
      this.DBDetailsObj1.SpParameterValue=this.dbdetails1.dataSourceColumns.SpParameterValue;
      this.DBDetailsObj1.AuthenticationType=this.dbdetails1.dataSourceColumns.AuthenticationType;
      this.DBDetailsObj1.UserName=this.dbdetails1.dataSourceColumns.UserName;
      this.DBDetailsObj1.Password=this.dbdetails1.dataSourceColumns.Password;
          
      this.strColumnName = '';
  
      for (let i = 0; i < this.dbdetails2.dataSourceColumns.ColumnNameList.length; i++) {
        if (i === 0) {
          this.strColumnName = this.dbdetails2.dataSourceColumns.ColumnNameList[i].ColumnName;
        } else {
          this.strColumnName =
            this.strColumnName + ',' + this.dbdetails2.dataSourceColumns.ColumnNameList[i].ColumnName;
        }
       }
       this.DBDetailsObj2.DBServerName = this.dbdetails2.dbServerName;
       this.DBDetailsObj2.DBName = this.dbdetails2.databaseNames; 
       this.DBDetailsObj2.TableName = this.dbdetails2.tableNames;
       this.DBDetailsObj2.SqlQuery = this.dbdetails2.sqlQuery;
       this.DBDetailsObj2.ColumnName=this.strColumnName;
       this.DBDetailsObj2.DatabaseObjectType=this.dbdetails2.databaseObjectType;
       this.DBDetailsObj2.StoredProcedureName=this.dbdetails2.storedProcedureNames;
       this.DBDetailsObj2.SpParameterValue=this.dbdetails2.dataSourceColumns.SpParameterValue;
       this.DBDetailsObj2.AuthenticationType=this.dbdetails2.dataSourceColumns.AuthenticationType;
       this.DBDetailsObj2.UserName=this.dbdetails2.dataSourceColumns.UserName;
       this.DBDetailsObj2.Password=this.dbdetails2.dataSourceColumns.Password;
    
    let body: HttpParams = new HttpParams();
    body = body.append('DBDetailsObj1', JSON.stringify(this.DBDetailsObj1));
    body = body.append('DBDetailsObj2', JSON.stringify(this.DBDetailsObj2));
    body = body.append('ScheduleDate', JSON.stringify(this.ScheduleDate));

    this.http
      .post(
        'http://localhost:58487/' + 'api/ScheduleReport/ScheduleCompareDBReport',
        body
      )
      .subscribe(
        (data: any) => {alert("Report scheduled successfully");},
        error => {
          console.error(error);
          alert('Something went wrong. Please try again.');
        }
      );
  }
}
