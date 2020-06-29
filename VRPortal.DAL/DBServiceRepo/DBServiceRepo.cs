using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using VRPortal.Models;

namespace VRPortal.DAL.DBServiceRepo
{
    public class DBServiceRepo : IDBServiceRepo
    {
        public List<string> GetDatabaseNames(string ServerName, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }
            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                con.Open();
                DataTable DatabaseSchema = con.GetSchema("Databases");

                List<string> DatabaseNames = new List<string>();
                foreach (DataRow Row in DatabaseSchema.Rows)
                {
                    DatabaseNames.Add(Row["database_name"].ToString());
                }
                return DatabaseNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        public List<string> GetDatabaseTableNames(string ServerName, string DatabaseName, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }

            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                con.Open();
                DataTable DatabaseSchema = con.GetSchema("Tables");

                List<string> TableNames = new List<string>();
                foreach (DataRow Row in DatabaseSchema.Rows)
                {
                    TableNames.Add(Row["table_name"].ToString());
                }
                return TableNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        public List<DataColumns> GetTableColumnNames(string ServerName, string DatabaseName, string TableName, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }
            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                string[] table = { null, null, TableName, null };
                con.Open();
                DataTable databasesSchema = con.GetSchema("Columns", table);

                List<DataColumns> ColumnNames = new List<DataColumns>();
                foreach (DataRow Row in databasesSchema.Rows)
                {
                    ColumnNames.Add(new DataColumns { ColumnName = Row["column_name"].ToString(), ColumnType = Row["column_name"].GetType().Name.ToString() });
                }
                return ColumnNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        public DataTable GetColumnData(string ServerName, string DatabaseName, string TableName, string SqlQuery, string ColumnName, string DBObjectType, string StoredProcedureName, dynamic SpParameterValue, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }
            string[] ColumnArray = ColumnName.Split(",".ToCharArray());
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < ColumnArray.Length; i++)
            {
                stringBuilder.Append("[" + ColumnArray[i] + "],");
            }
            ColumnName = stringBuilder.ToString().Substring(0, stringBuilder.Length - 1);
            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                string Query;
                SqlDataAdapter da;
                DataTable dataTable;
                if (DBObjectType == "Tables")
                {
                    Query = "select " + ColumnName + " from [" + TableName + "]";

                    SqlCommand com = new SqlCommand(Query, con);
                    con.Open();
                    // create data adapter
                    da = new SqlDataAdapter(com);
                    // this will query your database and return the result to your datatable
                    dataTable = new DataTable();
                    da.Fill(dataTable);
                }
                else if (DBObjectType == "Query")
                {
                    Query = SqlQuery;

                    SqlCommand com = new SqlCommand(Query, con);
                    con.Open();
                    // create data adapter
                    da = new SqlDataAdapter(com);
                    // this will query your database and return the result to your datatable
                    DataTable ResultSetdataTable = new DataTable();
                    da.Fill(ResultSetdataTable);

                    dataTable = new DataTable();
                    string[] columnNameArray = ColumnName.Split(',');
                    for (int i = 0; i < columnNameArray.Length; i++)
                    {
                        dataTable.Columns.Add(columnNameArray[i]);
                    }

                    for (int i = 0; i < ResultSetdataTable.Rows.Count; i++)
                    {
                        DataRow row = dataTable.NewRow();
                        dataTable.Rows.Add(row);
                        for (int j = 0; j < columnNameArray.Length; j++)
                        {
                            dataTable.Rows[i][columnNameArray[j]] = ResultSetdataTable.Rows[i][columnNameArray[j]];
                        }
                    }
                }
                else
                {
                    Query = StoredProcedureName;

                    SqlCommand com = new SqlCommand(Query, con);
                    con.Open();
                    com.CommandType = CommandType.StoredProcedure;
                    foreach (var param in SpParameterValue)
                    {
                        com.Parameters.Add(param.Key, param.Value);
                    }
                    // create data adapter
                    da = new SqlDataAdapter(com);
                    // this will query your database and return the result to your datatable
                    DataTable ResultSetdataTable = new DataTable();
                    da.Fill(ResultSetdataTable);

                    dataTable = new DataTable();
                    string[] columnNameArray = ColumnName.Split(',');
                    for (int i = 0; i < columnNameArray.Length; i++)
                    {
                        dataTable.Columns.Add(columnNameArray[i]);
                    }

                    for (int i = 0; i < ResultSetdataTable.Rows.Count; i++)
                    {
                        DataRow row = dataTable.NewRow();
                        dataTable.Rows.Add(row);
                        for (int j = 0; j < columnNameArray.Length; j++)
                        {
                            dataTable.Rows[i][columnNameArray[j]] = ResultSetdataTable.Rows[i][columnNameArray[j]];
                        }
                    }
                }
                return dataTable;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }

        public List<string> GetDatabaseStoredProcedureNames(string ServerName, string DatabaseName, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }

            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                string[] storedProcedureRestrictions = new string[4];
                storedProcedureRestrictions[3] = "PROCEDURE";

                con.Open();
                DataTable DatabaseSchema = con.GetSchema("Procedures", storedProcedureRestrictions);

                List<string> StoredProcedureNames = new List<string>();
                foreach (DataRow Row in DatabaseSchema.Rows)
                {
                    StoredProcedureNames.Add(Row["ROUTINE_NAME"].ToString());
                }
                return StoredProcedureNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        public List<string> GetStoredProcedureParameterNames(string ServerName, string DatabaseName, string StoredProcedureName, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }

            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                string[] spName = { null, null, StoredProcedureName, null };

                con.Open();
                DataTable DatabaseSchema = con.GetSchema("ProcedureParameters", spName);

                List<string> StoredProcedureParameterNames = new List<string>();
                foreach (DataRow Row in DatabaseSchema.Rows)
                {
                    StoredProcedureParameterNames.Add(Row["PARAMETER_NAME"].ToString().Replace("@", ""));
                }
                return StoredProcedureParameterNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }

        public List<DataColumns> GetSpResultsetColumnNames(string ServerName, string DatabaseName, string StoredProcedureName, dynamic SpParameterValue, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }
            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                string Query;
                //SqlDataAdapter da;
                //DataTable dataTable;

                //Query = StoredProcedureName;

                //SqlCommand com = new SqlCommand(Query, con);
                //con.Open();
                //com.CommandType = CommandType.StoredProcedure;
                //foreach (var param in SpParameterValue)
                //{
                //    com.Parameters.Add(param.Key, param.Value);
                //}
                //// create data adapter
                //da = new SqlDataAdapter(com);
                //// this will query your database and return the result to your datatable
                //dataTable = new DataTable();
                //da.Fill(dataTable);

                Query = StoredProcedureName;
                SqlCommand com = new SqlCommand(Query, con);
                con.Open();
                com.CommandType = CommandType.StoredProcedure;
                foreach (var param in SpParameterValue)
                {
                    com.Parameters.Add(param.Key, param.Value);
                }
                SqlDataReader reader = com.ExecuteReader(CommandBehavior.SingleRow);
                DataTable dataTable = new DataTable();
                dataTable.Load(reader);
                reader.Close();

                List<DataColumns> ColumnNames = new List<DataColumns>();

                foreach (DataColumn column in dataTable.Columns)
                {
                    ColumnNames.Add(new DataColumns { ColumnName = column.ColumnName.ToString(), ColumnType = column.ColumnName.GetType().ToString() });
                }

                return ColumnNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
        public List<DataColumns> GetQueryResultsetColumnNames(string ServerName, string DatabaseName, string SqlQuery, string AuthenticationType, string UserName, string Password)
        {
            string ConnectionString = string.Empty;
            if (AuthenticationType == "Windows")
            {
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";Integrated Security=True";
            }
            else
            {
                //Data Source = myServerAddress; Initial Catalog = myDataBase; Integrated Security = SSPI;
                //User ID = myDomain\myUsername; Password = myPassword;
                ConnectionString = "Data Source=" + ServerName.ToString() + ";Initial Catalog=" + DatabaseName.ToString() + ";User Id=" + UserName.ToString() + ";Password=" + Password.ToString();
            }
            SqlConnection con = new SqlConnection(ConnectionString);
            try
            {
                SqlCommand com = new SqlCommand(SqlQuery, con);
                con.Open();
                DataTable dataTable = new DataTable();
                SqlDataReader reader = com.ExecuteReader(CommandBehavior.SingleRow);
                dataTable.Load(reader);
                reader.Close();

                List<DataColumns> ColumnNames = new List<DataColumns>();

                foreach (DataColumn column in dataTable.Columns)
                {
                    ColumnNames.Add(new DataColumns { ColumnName = column.ColumnName.ToString(), ColumnType = column.ColumnName.GetType().ToString() });
                }
                return ColumnNames;
            }
            catch (SqlException ex)
            {
                throw new System.Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
    }
}
