using System;
using System.Collections.Generic;
using System.Data;

namespace VRPortal.Models {
    public class ComparisionOutput {
        public List<string> ColumnSet { get; set; }
        public DataTable RowSet { get; set; }
    }
}