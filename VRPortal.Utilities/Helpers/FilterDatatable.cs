using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

using VRPortal.Models;

namespace VRPortal.Utilities.Helpers {
    public sealed class FilterDatatable {
        private FilterDatatable () {

        }

        public static Tuple<DataTable, DataTable> FilterDataTable (DataTable DataTable1, DataTable DataTable2, List<DataTableFilter> source1DataTableFilterDTO, List<DataTableFilter> source2DataTableFilterDTO) {
            try {
                source1DataTableFilterDTO.RemoveAll (item => item.ColumnValue == null || item.ColumnValue.Trim () == "");
                source2DataTableFilterDTO.RemoveAll (item => item.ColumnValue == null || item.ColumnValue.Trim () == "");

                IEnumerable<DataRow> dataRows1 = DataTable1.AsEnumerable ().Where (i => source1DataTableFilterDTO.All (f => i.Field<String> (f.ColumnName) == f.ColumnValue));
                IEnumerable<DataRow> dataRows2 = DataTable2.AsEnumerable ().Where (i => source2DataTableFilterDTO.All (f => i.Field<String> (f.ColumnName) == f.ColumnValue));

                if (dataRows1.Count () > 0) {
                    DataTable1 = dataRows1.CopyToDataTable ();
                } else {
                    DataTable1.Rows.Clear ();
                }
                if (dataRows2.Count () > 0) {
                    DataTable2 = dataRows2.CopyToDataTable ();
                } else {
                    DataTable2.Rows.Clear ();
                }
                return Tuple.Create (DataTable1, DataTable2);
            } catch (Exception e) {

                throw;
            }
        }

    }
}