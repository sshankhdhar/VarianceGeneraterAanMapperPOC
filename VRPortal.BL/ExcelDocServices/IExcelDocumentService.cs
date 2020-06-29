using System.Data;
using System.IO;


namespace VRPortal.BL.ExcelDocServices
{
    public interface IExcelDocumentService
    {
        DataTable ExcelToDataTableUsingExcelDataReader(Stream Filestream);
        DataTable ExcelToDataTableUsingExcelDataReader(string FilePath);
        void DataTableToExcel(DataTable SourceDataTable, string FileName);
    }
}
