using System.Collections.Generic;

using VRPortal.Models;

namespace VRPortal.BL.FileSource
{
    public interface IFileSourceBL
    {
        ComparisionOutput CompareColumns(List<DataSourceColumnList> dataSourceColumnList, string RequestType = "immediate");
    }
}