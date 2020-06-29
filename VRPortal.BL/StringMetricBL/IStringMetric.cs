using System.Collections.Generic;
using System.Data;

namespace VRPortal.BL.StringMetricBL
{
    public interface IStringMetric
    {
        DataTable StringComparisonResult(List<string> ColumnList1, List<string> ColumnList2, string Type, string Cloumn1 = "", string Cloumn2 = "");
        DataTable StringComparisonResult(DataTable ColumnList1, DataTable ColumnList2, string Type, string Cloumn1 = "", string Cloumn2 = "", int index = 0);
    }
}
