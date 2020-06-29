using System.Collections.Generic;
using System.Data;
using VRPortal.Models;

namespace VRPortal.BL.DBSource
{
    public interface IDBSourceBL
    {
        List<string> GetDatabaseNames(string ServerName, string AuthenticationType, string UserName, string Password);
        List<string> GetDatabaseTableNames(string ServerName, string DatabaseName, string AuthenticationType, string UserName, string Password);
        List<DataColumns> GetTableColumnNames(string ServerName, string DatabaseName, string TableName, string AuthenticationType, string UserName, string Password);
        DataTable GetColumnData(string ServerName, string DatabaseName, string TableName, string SqlQuery, string ColumnName, string DBObjectType, string StoredProcedureName, dynamic SpParameterValue, string AuthenticationType, string UserName, string Password);
        ComparisionOutput CompareColumnValues(DataTable DataTable1, DataTable DataTable2, string RequestType = "immediate");
        void GetScheduledDBReport(DataSourceColumnList DBobj1, DataSourceColumnList DBobj2);
        List<string> GetDatabaseStoredProcedureNames(string ServerName, string DatabaseName, string AuthenticationType, string UserName, string Password);
        List<string> GetStoredProcedureParameterNames(string ServerName, string DatabaseName, string StoredProcedureName, string AuthenticationType, string UserName, string Password);
        List<DataColumns> GetSpResultsetColumnNames(string ServerName, string DatabaseName, string StoredProcedureName, dynamic SpParameterValue, string AuthenticationType, string UserName, string Password);
        List<DataColumns> GetQueryResultsetColumnNames(string ServerName, string DatabaseName, string SqlQuery, string AuthenticationType, string UserName, string Password);
    }
}
