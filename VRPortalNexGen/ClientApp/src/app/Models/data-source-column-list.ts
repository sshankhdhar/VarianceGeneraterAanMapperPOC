import {ColumnList} from '../Models/column-list';
import {Spparameter} from '../Models/spparameter';
import { DataTableFilter } from './data-table-filter';
import { DBDetails } from './dbdetails';


export class DatabaseNameList {
  dbName: string;
}
export class TableNameList {
  tableName: string;
}

export class StoredProcedureNameList {
  storedProcedureName: string;
}
export class StoredProcedureParameterNameList {
  storedProcedureParameterName: string;
}

export class Flags {
  public IsDBAvailable = false;
  public IsDatabaseSelected = false;
  public IsTableAvailable = false;
  public IsStoredProcedureAvailable = false;
  public IsQuerySelected = false;
  public IsColumnAvailable = false;
  public IsResultAvailable = false;
  public show = false;
  public windowsflag = false;
  public sqlflag = false;
}

export class DataSourceColumnList {
  constructor() {
    this.Flag = new Flags();
    this.ColumnNameList = [];
  }
  DataSourceType: string;
  Source: string;
  FileName: string;
  FilePath: string;
  CommonColumn: string;
  ColumnNameList: ColumnList[];
  RequestType: string;
  SourceFile: File;
  DBServerName: string;
  DBName: string;
  TableName: string;
  ColumnName: string;
  AuthenticationType: string;
  UserName: string;
  Password: string;
  DatabaseObjectType: string;
  StoredProcedureName: string;
  SpParameterValue: any = {};
  DataTableFilterList: DataTableFilter[];
  DBDetailsObj: DBDetails;
  dbNameList: DatabaseNameList[];
  tableNameList: TableNameList[];
  storedProcedureNameList: StoredProcedureNameList[];
  storedProcedureParameterNameList: StoredProcedureParameterNameList[];
  SqlQuery: string;
  Flag: Flags;
}

