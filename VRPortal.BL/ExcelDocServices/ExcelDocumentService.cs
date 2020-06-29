using ExcelDataReader;
using OfficeOpenXml;
using System.Data;
using System.IO;

namespace VRPortal.BL.ExcelDocServices
{
    public class ExcelDocumentService : IExcelDocumentService
    {
        public void DataTableToExcel(DataTable SourceDataTable, string FileName)
        {
            ExcelPackage ExcelPkg = new ExcelPackage();
            ExcelWorksheet workSheet = ExcelPkg.Workbook.Worksheets.Add("Sheet1");
            workSheet.Cells["A1"].LoadFromDataTable(SourceDataTable, true);
            workSheet.Protection.IsProtected = false;
            workSheet.Protection.AllowSelectLockedCells = false;
            ExcelPkg.SaveAs(new FileInfo(FileName));
        }
        public DataTable ExcelToDataTableUsingExcelDataReader(Stream Filestream)
        {
            DataSet result = null;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = Filestream)//File.Open(storePath, FileMode.Open, FileAccess.Read))
            {
                // Auto-detect format, supports:
                //  - Binary Excel files (2.0-2003 format; *.xls)
                //  - OpenXml Excel files (2007 format; *.xlsx)
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    // Choose one of either 1 or 2:

                    // 1. Use the reader methods
                    do
                    {
                        while (reader.Read())
                        {
                            // reader.GetDouble(0);
                        }
                    } while (reader.NextResult());

                    // 2. Use the AsDataSet extension method
                    result = reader.AsDataSet(new ExcelDataSetConfiguration()
                    {

                        // Gets or sets a value indicating whether to set the DataColumn.DataType 
                        // property in a second pass.
                        UseColumnDataType = false,

                        // Gets or sets a callback to obtain configuration options for a DataTable. 
                        ConfigureDataTable = (tableReader) => new ExcelDataTableConfiguration()
                        {

                            // Gets or sets a value indicating the prefix of generated column names.
                            EmptyColumnNamePrefix = "SHalabh",

                            // Gets or sets a value indicating whether to use a row from the 
                            // data as column names.
                            UseHeaderRow = true

                            // Gets or sets a callback to determine which row is the header row. 
                            // Only called when UseHeaderRow = true.
                            //ReadHeaderRow = (rowReader) => {
                            //    // F.ex skip the first row and use the 2nd row as column headers:
                            //    rowReader.Read();
                            //},

                            //// Gets or sets a callback to determine whether to include the 
                            //// current row in the DataTable.
                            //FilterRow = (rowReader) => {
                            //    return true;
                            //},

                            //// Gets or sets a callback to determine whether to include the specific
                            //// column in the DataTable. Called once per column after reading the 
                            //// headers.
                            //FilterColumn = (rowReader, columnIndex) => {
                            //    return true;
                            //}
                        }
                    });

                    // The result of each spreadsheet is in result.Tables
                }
            }
            var test = result.Tables[0];
            return result.Tables[0];
        }
        public DataTable ExcelToDataTableUsingExcelDataReader(string FilePath)
        {
            DataSet result = null;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            using (var stream = File.Open(FilePath, FileMode.Open, FileAccess.Read))
            {
                // Auto-detect format, supports:
                //  - Binary Excel files (2.0-2003 format; *.xls)
                //  - OpenXml Excel files (2007 format; *.xlsx)
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {

                    // Choose one of either 1 or 2:

                    // 1. Use the reader methods
                    do
                    {
                        while (reader.Read())
                        {
                            // reader.GetDouble(0);
                        }
                    } while (reader.NextResult());

                    // 2. Use the AsDataSet extension method
                    result = reader.AsDataSet(new ExcelDataSetConfiguration()
                    {

                        // Gets or sets a value indicating whether to set the DataColumn.DataType 
                        // property in a second pass.
                        UseColumnDataType = false,

                        // Gets or sets a callback to obtain configuration options for a DataTable. 
                        ConfigureDataTable = (tableReader) => new ExcelDataTableConfiguration()
                        {

                            // Gets or sets a value indicating the prefix of generated column names.
                            EmptyColumnNamePrefix = "SHalabh",

                            // Gets or sets a value indicating whether to use a row from the 
                            // data as column names.
                            UseHeaderRow = true

                            // Gets or sets a callback to determine which row is the header row. 
                            // Only called when UseHeaderRow = true.
                            //ReadHeaderRow = (rowReader) => {
                            //    // F.ex skip the first row and use the 2nd row as column headers:
                            //    rowReader.Read();
                            //},

                            //// Gets or sets a callback to determine whether to include the 
                            //// current row in the DataTable.
                            //FilterRow = (rowReader) => {
                            //    return true;
                            //},

                            //// Gets or sets a callback to determine whether to include the specific
                            //// column in the DataTable. Called once per column after reading the 
                            //// headers.
                            //FilterColumn = (rowReader, columnIndex) => {
                            //    return true;
                            //}
                        }
                    });

                    // The result of each spreadsheet is in result.Tables
                }
            }
            var test = result.Tables[0];
            return result.Tables[0];
        }
    }
}
