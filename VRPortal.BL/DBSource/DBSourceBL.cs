using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using VRPortal.BL.ExcelDocServices;
using VRPortal.BL.StringMetricBL;
using VRPortal.DAL.DBServiceRepo;
using VRPortal.Models;
using VRPortal.Utilities.Helpers;

namespace VRPortal.BL.DBSource
{
    public class DBSourceBL : IDBSourceBL
    {
        IDBServiceRepo dBServiceRepoObj = new DBServiceRepo();

        //Get all the database names present in database server
        public List<string> GetDatabaseNames(string ServerName, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetDatabaseNames(ServerName: ServerName, AuthenticationType: AuthenticationType, UserName: UserName, Password: Password);
        }
        //Get all the table names present in database
        public List<string> GetDatabaseTableNames(string ServerName, string DatabaseName, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetDatabaseTableNames(ServerName: ServerName, DatabaseName: DatabaseName, AuthenticationType: AuthenticationType, UserName: UserName, Password: Password);
        }
        //Get all the column names present in table
        public List<DataColumns> GetTableColumnNames(string ServerName, string DatabaseName, string TableName, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetTableColumnNames(ServerName: ServerName, DatabaseName: DatabaseName, TableName: TableName, AuthenticationType: AuthenticationType, UserName: UserName, Password: Password);
        }
        public List<string> GetDatabaseStoredProcedureNames(string ServerName, string DatabaseName, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetDatabaseStoredProcedureNames(ServerName: ServerName, DatabaseName: DatabaseName, AuthenticationType: AuthenticationType, UserName: UserName, Password: Password);
        }
        public List<string> GetStoredProcedureParameterNames(string ServerName, string DatabaseName, string StoredProcedureName, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetStoredProcedureParameterNames(ServerName, DatabaseName, StoredProcedureName, AuthenticationType, UserName, Password);
        }
        //Get specific column data from table
        public DataTable GetColumnData(string ServerName, string DatabaseName, string TableName, string SqlQuery, string ColumnName, string DBObjectType, string StoredProcedureName, dynamic SpParameterValue, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetColumnData(ServerName: ServerName, DatabaseName: DatabaseName, TableName: TableName, SqlQuery: SqlQuery, ColumnName: ColumnName, DBObjectType: DBObjectType, StoredProcedureName: StoredProcedureName, SpParameterValue: SpParameterValue, AuthenticationType: AuthenticationType, UserName: UserName, Password: Password);
        }
        public ComparisionOutput CompareColumnValues(DataTable DataTable1, DataTable DataTable2, string RequestType = "immediate")
        {
            IStringMetric stringMetricObj = new StringMetric();
            ComparisionOutput finalOutput = new ComparisionOutput();
            List<DataTable> DataTableList = new List<DataTable>();

            var TuppledOutput = DataTableRowEqualizer.EqualizeDatable(DataTable1, DataTable2);
            DataTable1 = TuppledOutput.Item1;
            DataTable2 = TuppledOutput.Item2;
            int IteratrionLength = DataTable1.Columns.Count > DataTable2.Columns.Count ? DataTable2.Columns.Count : DataTable1.Columns.Count;
            for (int i = 0; i < IteratrionLength; i++)
            {
                DataTable ColumnValue1 = new DataTable();
                DataTable ColumnValue2 = new DataTable();
                string Col1 = DataTable1.Columns[i].ColumnName.ToString();
                string Col2 = DataTable2.Columns[i].ColumnName.ToString();
                if (Col1 == Col2)
                {
                    Col2 = Col2 + "_1";
                }
                ColumnValue1.Columns.Add(Col1);
                ColumnValue2.Columns.Add(Col2);
                for (int j = 0; j < DataTable1.Rows.Count; j++)
                {
                    ColumnValue1.Rows.Add(DataTable1.Rows[j][i].ToString());
                    ColumnValue2.Rows.Add(DataTable2.Rows[j][i].ToString());
                }
                DataTable dataTableOutput = stringMetricObj.StringComparisonResult(ColumnValue1, ColumnValue2, "db", Col1, Col2, i + 1);
                if (i == 0)
                {
                    finalOutput.RowSet = dataTableOutput.Copy();
                }
                else
                {
                    finalOutput.RowSet = MergeDataTable.MergeDataTables(finalOutput.RowSet, dataTableOutput);
                }
            }
            finalOutput.ColumnSet = finalOutput.RowSet.Columns.Cast<DataColumn>().Select(col => Convert.ToString(col)).ToList();
            // if (RequestType == "immediate")
            // {
            //     IntermediateCache<DataTable>.Current.Set("ComparisionOutputGrid", finalOutput.RowSet);
            // }
            return finalOutput;
        }

        public void GetScheduledDBReport(DataSourceColumnList DBobj1, DataSourceColumnList DBobj2)
        {
            DataTable ColumnValues1 = dBServiceRepoObj.GetColumnData(DBobj1.DbServerName, DBobj1.DBName, DBobj1.TableName, DBobj1.SqlQuery, DBobj1.ColumnName, DBobj1.DatabaseObjectType, DBobj1.StoredProcedureName, DBobj1.SpParameterValue, DBobj1.AuthenticationType, DBobj1.UserName, DBobj1.Password);
            DataTable ColumnValues2 = dBServiceRepoObj.GetColumnData(DBobj2.DbServerName, DBobj2.DBName, DBobj2.TableName, DBobj2.SqlQuery, DBobj2.ColumnName, DBobj2.DatabaseObjectType, DBobj2.StoredProcedureName, DBobj2.SpParameterValue, DBobj2.AuthenticationType, DBobj2.UserName, DBobj2.Password);
            ComparisionOutput ListObj = new ComparisionOutput();
            IDBSourceBL stringMetricObj = new DBSourceBL();
            ListObj = stringMetricObj.CompareColumnValues(ColumnValues1, ColumnValues2, "scheduledjob");
            string FilePath = "E:\\ScheduledDBReport\\";
            string FileName = FilePath + "ScheduledDBReport_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx";
            IExcelDocumentService excelDocumentServiceObj = new ExcelDocumentService();
            excelDocumentServiceObj.DataTableToExcel(ListObj.RowSet, FileName);
        }

        public List<DataColumns> GetSpResultsetColumnNames(string ServerName, string DatabaseName, string StoredProcedureName, dynamic SpParameterValue, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetSpResultsetColumnNames(ServerName, DatabaseName, StoredProcedureName, SpParameterValue, AuthenticationType, UserName, Password);
        }

        public List<DataColumns> GetQueryResultsetColumnNames(string ServerName, string DatabaseName, string SqlQuery, string AuthenticationType, string UserName, string Password)
        {
            return dBServiceRepoObj.GetQueryResultsetColumnNames(ServerName, DatabaseName, SqlQuery, AuthenticationType, UserName, Password);
        }
    }
}