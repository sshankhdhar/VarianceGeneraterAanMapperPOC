import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ComparisonResult } from '../Models/comparison-result';
import {DataSourceColumnList} from '../Models/data-source-column-list';
import { MatStepper } from '@angular/material';
@Component({
  selector: 'app-dbsource',
  templateUrl: './dbsource.component.html',
  styleUrls: ['./dbsource.component.css']
})
export class DbsourceComponent implements OnInit {
  @ViewChild('dbdetails1', { static: true }) dbdetails1: any;
  @ViewChild('dbdetails2', { static: true }) dbdetails2: any;
  source1 = 'DBSource1';
  source2 = 'DBSource2';
  public DBDetailsObj1 = new DataSourceColumnList();
  public DBDetailsObj2 = new DataSourceColumnList();
  public strColumnName: string;
  public IsColumnAvailable = false;
  public comparison: Result[] = [];
  public comparisonResult: ComparisonResult;

  constructor(private http: HttpClient) {
  }
  ngOnInit() {}


  CompareData(stepper: MatStepper) {
    //console.log(this.dbdetails1.dataSourceColumns.SpParameterValue);
    // if(this.ColumnName.length===this.ColumnName2.length)
    // {
    this.GetComparePercentage();
    stepper.next();
    // }
    // else{
    // alert("Equal number of column should be selected");
    // }
  }

  GetComparePercentage() {
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
  //  if(this.dbdetails1.databaseObjectType==="Tables")
  //  {
    
  //   this.DBDetailsObj1.DBServerName = this.dbdetails1.dbServerName;
  //   this.DBDetailsObj1.DBName = this.dbdetails1.databaseNames; 
  //   this.DBDetailsObj1.TableName = this.dbdetails1.tableNames;
  //   this.DBDetailsObj1.ColumnName = this.strColumnName;
  //   this.DBDetailsObj1.DatabaseObjectType=this.dbdetails1.databaseObjectType;
  //   this.DBDetailsObj1.StoredProcedureName="";
  //   this.DBDetailsObj1.SpParameterValue="";
  //   this.DBDetailsObj1.AuthenticationType=this.dbdetails1.dataSourceColumns.AuthenticationType;
  //   this.DBDetailsObj1.UserName=this.dbdetails1.dataSourceColumns.UserName;
  //   this.DBDetailsObj1.Password=this.dbdetails1.dataSourceColumns.Password;
    
  //  }
  //  else
  //  {
  //    this.DBDetailsObj1.DBServerName = this.dbdetails1.dbServerName;
  //    this.DBDetailsObj1.DBName = this.dbdetails1.databaseNames; 
  //    this.DBDetailsObj1.TableName = "";
  //    this.DBDetailsObj1.ColumnName=this.strColumnName;
  //    this.DBDetailsObj1.DatabaseObjectType=this.dbdetails1.databaseObjectType;
  //    this.DBDetailsObj1.StoredProcedureName=this.dbdetails1.storedProcedureNames;
  //    this.DBDetailsObj1.SpParameterValue=this.dbdetails1.dataSourceColumns.SpParameterValue;
  //    this.DBDetailsObj1.AuthenticationType=this.dbdetails1.dataSourceColumns.AuthenticationType;
  //    this.DBDetailsObj1.UserName=this.dbdetails1.dataSourceColumns.UserName;
  //    this.DBDetailsObj1.Password=this.dbdetails1.dataSourceColumns.Password;
  //  }
    
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
    // if(this.dbdetails2.databaseObjectType==="Tables")
    // {
   
    //  this.DBDetailsObj2.DBServerName = this.dbdetails2.dbServerName;
    //  this.DBDetailsObj2.DBName = this.dbdetails2.databaseNames; 
    //  this.DBDetailsObj2.TableName = this.dbdetails2.tableNames;
    //  this.DBDetailsObj2.ColumnName = this.strColumnName;
    //  this.DBDetailsObj2.DatabaseObjectType=this.dbdetails2.databaseObjectType;
    //  this.DBDetailsObj2.StoredProcedureName="";
    //  this.DBDetailsObj2.SpParameterValue="";
    //  this.DBDetailsObj2.AuthenticationType=this.dbdetails2.dataSourceColumns.AuthenticationType;
    //  this.DBDetailsObj2.UserName=this.dbdetails2.dataSourceColumns.UserName;
    //  this.DBDetailsObj2.Password=this.dbdetails2.dataSourceColumns.Password;
     
    // }
    // else
    // {
    //  this.DBDetailsObj2.DBServerName = this.dbdetails2.dbServerName;
    //  this.DBDetailsObj2.DBName = this.dbdetails2.databaseNames; 
    //  this.DBDetailsObj2.TableName = "";
    //  this.DBDetailsObj2.ColumnName=this.strColumnName;
    //  this.DBDetailsObj2.DatabaseObjectType=this.dbdetails2.databaseObjectType;
    //  this.DBDetailsObj2.StoredProcedureName=this.dbdetails2.storedProcedureNames;
    //  this.DBDetailsObj2.SpParameterValue=this.dbdetails2.dataSourceColumns.SpParameterValue;
    //  this.DBDetailsObj2.AuthenticationType=this.dbdetails2.dataSourceColumns.AuthenticationType;
    //  this.DBDetailsObj2.UserName=this.dbdetails2.dataSourceColumns.UserName;
    //  this.DBDetailsObj2.Password=this.dbdetails2.dataSourceColumns.Password;
    // }    
    console.log(this.DBDetailsObj1);
    console.log(this.DBDetailsObj2);
    let body: HttpParams = new HttpParams();
    body = body.append('DBDetailsObj1', JSON.stringify(this.DBDetailsObj1));
    body = body.append('DBDetailsObj2', JSON.stringify(this.DBDetailsObj2));    
    this.http
      .post('http://localhost:58487/api/VRDb/CompareColumns', body)
      .subscribe(
        (data: ComparisonResult) => {
          // this.comparison = data
          this.comparisonResult = data;
        },
        error => {
          console.error(error);
          alert(error.error.ExceptionMessage);
        }
      );
  }
  // open() {
  //   const modalRef = this.modalService.open(ComparisonOutputWidgetComponent);
  //   modalRef.componentInstance.comparisonResult = this.comparison;
  // }
  // ngOnDestroy() {
  //   // prevent memory leak when component destroyed
  //   this.subscription.unsubscribe();
  // }
}
interface Result {
  Result: ComparisonResult;
}
