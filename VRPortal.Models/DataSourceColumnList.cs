using System;
using System.Collections.Generic;

using Microsoft.Azure.Cosmos.Table;

namespace VRPortal.Models
{
    public class DataSourceColumnList : TableEntity
    {
        public DataSourceColumnList()
        {

        }

        public DataSourceColumnList(string partitionKey, string rowKey)
        {
            PartitionKey = partitionKey;
            RowKey = rowKey;
        }

        public string DataSourceType { get; set; }
        public string Source { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string TableName { get; set; }
        public string SheetName { get; set; }

        public string ColumnName { get; set; }
        public List<DataColumns> ColumnNameList { get; set; }
        public string CommonColumn { get; set; }
        public string DateFilterColumnName { get; set; }
        public string DateFilterColumnValue { get; set; }
        public List<DataTableFilter> DataTableFilterList { get; set; }

        public string DbServerName { get; set; }
        public string DBName { get; set; }
        public string SqlQuery { get; set; }
        public string DatabaseObjectType { get; set; }
        public string StoredProcedureName { get; set; }
        public Dictionary<string, string> SpParameterValue { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string AuthenticationType { get; set; }
    }
}