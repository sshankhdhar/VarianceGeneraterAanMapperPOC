using System;
using System.Collections.Generic;
using System.Data;

using VRPortal.Models;

namespace VRPortal.Utilities.Helpers {
    public sealed class DataTableRowEqualizer {
        private DataTableRowEqualizer () {

        }

        public static Tuple<DataTable, DataTable> EqualizeDatable (DataTable DataTable1, DataTable DataTable2) {
            try {
                int RowCount1 = DataTable1.Rows.Count;
                int RowCount2 = DataTable2.Rows.Count;
                int difference;
                if (RowCount1 > RowCount2) {
                    difference = RowCount1 - RowCount2;
                    for (int i = 0; i < difference; i++) {
                        DataTable2.Rows.Add ();
                    }
                } else {
                    difference = RowCount2 - RowCount1;
                    for (int i = 0; i < difference; i++) {
                        DataTable1.Rows.Add ();
                    }
                }
                return Tuple.Create (DataTable1, DataTable2);
            } catch (Exception e) {

                throw e;
            }
        }

        public static Tuple<DataTable, DataTable> RemoveColumnDuplicatesDatable (DataTable DataTable1, DataTable DataTable2) {
            try {
                int ColCount1 = DataTable1.Columns.Count;
                int ColCount2 = DataTable2.Columns.Count;
                int index;

                if (ColCount1 > ColCount2) {
                    for (int i = 0; i < ColCount2; i++) {
                        index = DataTable1.Columns.IndexOf (DataTable2.Columns[i].ColumnName);
                        if (index >= 0) {
                            index = DataTable2.Columns.IndexOf (DataTable1.Columns[index].ColumnName);
                            DataTable2.Columns[index].ColumnName = DataTable2.Columns[index].ColumnName + "1";
                            DataTable2.AcceptChanges ();
                        }
                    }
                } else {
                    for (int i = 0; i < ColCount1; i++) {
                        index = DataTable2.Columns.IndexOf (DataTable1.Columns[i].ColumnName);
                        if (index >= 0) {
                            DataTable2.Columns[index].ColumnName = DataTable2.Columns[index].ColumnName + "1";
                            DataTable2.AcceptChanges ();
                        }
                    }
                }
                return Tuple.Create (DataTable1, DataTable2);
            } catch (Exception e) {

                throw e;
            }
        }

        public static Tuple<List<DataColumns>, List<DataColumns>> RemoveColumnDuplicatesList (List<DataColumns> DataTable1, List<DataColumns> DataTable2) {
            try {
                int ColCount1 = DataTable1.Count;
                int ColCount2 = DataTable2.Count;
                int index;

                if (ColCount1 > ColCount2) {
                    for (int i = 0; i < ColCount2; i++) {
                        index = DataTable1.FindIndex (a => a.ColumnName == DataTable2[i].ColumnName);
                        if (index >= 0) {
                            index = DataTable2.FindIndex (a => a.ColumnName == DataTable1[index].ColumnName);
                            DataTable2[index].ColumnName = DataTable2[index].ColumnName + "1";
                        }
                    }
                } else {
                    for (int i = 0; i < ColCount1; i++) {
                        index = DataTable2.FindIndex (a => a.ColumnName == DataTable1[i].ColumnName);
                        if (index >= 0) {
                            DataTable2[index].ColumnName = DataTable2[index].ColumnName + "1";
                        }
                    }
                }
                return Tuple.Create (DataTable1, DataTable2);
            } catch (Exception e) {

                throw e;
            }
        }

    }
}