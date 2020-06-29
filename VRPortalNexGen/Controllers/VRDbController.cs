using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using VRPortal.BL.DBSource;
using VRPortal.Models;

namespace VRPortalNexGen.Controllers {
    [ApiController]
    [Route ("[controller]/[action]")]
    public class VRDbController : ControllerBase {
        private IDBSourceBL DbNamesObj = new DBSourceBL ();

        //[HttpGet]
        //public List<string> GetDatabaseNames(string ServerName)
        //{
        //    return DbNamesObj.GetDatabaseNames(ServerName:ServerName);
        //}
        [HttpPost]
        public List<string> GetDatabaseNames ([FromBody] DataSourceColumnList dataSourceColumnList) {
            return DbNamesObj.GetDatabaseNames (ServerName: dataSourceColumnList.DbServerName, AuthenticationType: dataSourceColumnList.AuthenticationType, UserName: dataSourceColumnList.UserName, Password: dataSourceColumnList.Password);
        }

        [HttpPost]
        public List<string> GetDatabaseTables ([FromForm] DataSourceColumnList dataSourceColumnList) {
            return DbNamesObj.GetDatabaseTableNames (ServerName: dataSourceColumnList.DbServerName, DatabaseName: dataSourceColumnList.DBName,
                AuthenticationType: dataSourceColumnList.AuthenticationType, UserName: dataSourceColumnList.UserName, Password: dataSourceColumnList.Password);
        }

        [HttpPost]
        public List<string> GetDatabaseStoredProcedureNames ([FromBody] DataSourceColumnList dataSourceColumnList) {
            return DbNamesObj.GetDatabaseStoredProcedureNames (ServerName: dataSourceColumnList.DbServerName, DatabaseName: dataSourceColumnList.DBName,
                AuthenticationType: dataSourceColumnList.AuthenticationType, UserName: dataSourceColumnList.UserName, Password: dataSourceColumnList.Password);
        }

        [HttpPost]
        public List<string> GetStoredProcedureParameterNames ([FromBody] DataSourceColumnList dataSourceColumnList) {
            // string ServerName = HttpContext.Request.Query["ServerName"];
            // string DatabaseName = HttpContext.Request.Query["DatabaseName"];
            // string StoredProcedureName = HttpContext.Request.Query["StoredProcedureName"];
            // string AuthenticationType = HttpContext.Request.Query["AuthenticationType"];
            // string UserName = HttpContext.Request.Query["UserName"];
            // string Password = HttpContext.Request.Query["Password"];
            return DbNamesObj.GetStoredProcedureParameterNames (ServerName: dataSourceColumnList.DbServerName, DatabaseName: dataSourceColumnList.DBName,
                StoredProcedureName: dataSourceColumnList.StoredProcedureName, AuthenticationType: dataSourceColumnList.AuthenticationType,
                UserName: dataSourceColumnList.UserName, Password: dataSourceColumnList.Password);
        }

        [HttpPost]
        public List<DataColumns> GetTableColumnNames ([FromBody] DataSourceColumnList dataSourceColumnList) {
            return DbNamesObj.GetTableColumnNames (ServerName: dataSourceColumnList.DbServerName, DatabaseName: dataSourceColumnList.DBName,
                TableName: dataSourceColumnList.TableName, AuthenticationType: dataSourceColumnList.AuthenticationType,
                UserName: dataSourceColumnList.UserName, Password: dataSourceColumnList.Password);
        }

        [HttpPost]
        public List<DataColumns> GetSpResultsetColumnNames ([FromBody] DataSourceColumnList dataSourceColumnList) {
            return DbNamesObj.GetSpResultsetColumnNames (ServerName: dataSourceColumnList.DbServerName, DatabaseName: dataSourceColumnList.DBName,
                StoredProcedureName: dataSourceColumnList.StoredProcedureName, SpParameterValue: dataSourceColumnList.SpParameterValue,
                AuthenticationType: dataSourceColumnList.AuthenticationType, UserName: dataSourceColumnList.UserName,
                Password: dataSourceColumnList.Password);
        }

        [HttpPost]
        public List<DataColumns> GetQueryResultsetColumnNames ([FromBody] DataSourceColumnList dataSourceColumnList) {
            return DbNamesObj.GetQueryResultsetColumnNames (ServerName: dataSourceColumnList.DbServerName, DatabaseName: dataSourceColumnList.DBName,
                SqlQuery: dataSourceColumnList.SqlQuery, AuthenticationType: dataSourceColumnList.AuthenticationType, UserName: dataSourceColumnList.UserName,
                Password: dataSourceColumnList.Password);
        }
    }
}