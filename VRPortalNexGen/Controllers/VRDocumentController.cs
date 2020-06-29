using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VRPortal.BL.ExcelDocServices;
using VRPortal.Models;

namespace VRPortalNexGen.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VRDocumentController : ControllerBase
    {
        //private IHostingEnvironment _hostingEnvironment;
        private IExcelDocumentService excelDocumentService = new ExcelDocumentService();

        [HttpPost("[action]")]
        public IActionResult TranslateExcelFile([FromForm] ExcelDocument excelDocument)
        {
            try
            {
                List<DataColumns> columnLists = new List<DataColumns>();
                if (excelDocument.File != null && excelDocument.File.FirstOrDefault().Length > 0)
                {
                    MemoryStream ms = new MemoryStream();
                    excelDocument.File.FirstOrDefault().CopyTo(ms);
                    excelDocument.Table = excelDocumentService.ExcelToDataTableUsingExcelDataReader(ms);
                    foreach (DataColumn item in excelDocument.Table.Columns)
                    {
                        columnLists.Add(new DataColumns() { ColumnName = item.ToString(), ColumnType = item.DataType.Name.ToString() });
                    }
                }
                //return columnLists;

                if (columnLists.Count == 0)
                {
                    return NotFound();
                }

                return Ok(columnLists);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public class ColumnList
        {
            public string ColumnName { get; set; }
        }
    }
}