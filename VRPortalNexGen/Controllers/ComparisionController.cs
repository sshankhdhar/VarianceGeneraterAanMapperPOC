using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using VRPortal.BL.FileSource;
using VRPortal.Models;

namespace VRPortalNexGen.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ComparisionController : ControllerBase
    {
        readonly FileSourceBL fileSourceBL = new FileSourceBL();
        [HttpPost]
        public ComparisionOutput CompareColumns([FromBody] List<DataSourceColumnList> dataSourceColumnList)
        {

            try
            {
                ComparisionOutput finalOutput = new ComparisionOutput();
                finalOutput = fileSourceBL.CompareColumns(dataSourceColumnList);

                return finalOutput;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

    }
}