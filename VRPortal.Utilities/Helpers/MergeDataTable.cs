using System.Data;

namespace VRPortal.Utilities.Helpers {
    public sealed class MergeDataTable {
        private MergeDataTable () {

        }

        public static DataTable MergeDataTables (DataTable table1, DataTable table2) {
            DataTable table3 = table1.Copy ();
            foreach (DataColumn dc in table2.Columns) {
                if (table1.Columns.Contains (dc.ColumnName)) {
                    table3.Columns.Add (dc.ColumnName + "1").DataType = dc.DataType;
                } else {
                    table3.Columns.Add (dc.ColumnName).DataType = dc.DataType;
                }
            }

            for (int i = 0; i < table3.Rows.Count; i++) {
                foreach (DataColumn dc in table2.Columns) {
                    string col = dc.ColumnName;
                    if (table1.Columns.Contains (col)) {
                        table3.Rows[i][col + "1"] = table2.Rows[i][col];
                    } else {
                        table3.Rows[i][col] = table2.Rows[i][col];
                    }
                }
            }

            return table3;
        }

        public static DataTable MergeDataTablesPieChart (DataTable dataTable) {
            DataTable dataTableOutput = new DataTable ();
            dataTableOutput.Columns.Add ("Similarity");
            foreach (DataColumn column in dataTable.Columns) {
                if (column.ColumnName.Contains ("Similarity")) {
                    for (int i = 0; i < dataTable.Rows.Count; i++) {
                        dataTableOutput.Rows.Add (dataTable.Rows[i][column.ColumnName]);
                    }
                }
            }
            return dataTableOutput;
        }
        public static DataTable CalculatePieChartNumbers (DataTable dataTable) {
            DataTable ResultSet = new DataTable ();
            ResultSet.Columns.Add ("MatchCount");
            ResultSet.Columns.Add ("UnMatchCount");
            int MatchCount = 0;
            int UnMatchCount = 0;
            ResultSet.Rows.Add (MatchCount, UnMatchCount);

            foreach (DataRow row in dataTable.Rows) {
                if (row["Similarity"].ToString ().Contains ("100")) {
                    MatchCount++;
                    ResultSet.Rows[0]["MatchCount"] = MatchCount;
                } else {
                    UnMatchCount++;
                    ResultSet.Rows[0]["UnMatchCount"] = UnMatchCount;
                }
            }

            return ResultSet;
        }
    }
}