using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using VRPortal.BL.DBSource;
using VRPortal.BL.ExcelDocServices;
using VRPortal.BL.StringMetricBL;
using VRPortal.Models;
using VRPortal.Utilities.Helpers;

namespace VRPortal.BL.FileSource
{
    public class FileSourceBL : IFileSourceBL
    {
        readonly IStringMetric stringMetricObj = new StringMetric();
        readonly IDBSourceBL DbNamesObj = new DBSourceBL();
        public ComparisionOutput CompareColumns(List<DataSourceColumnList> dataSourceColumnList, string RequestType = "immediate")
        {
            try
            {
                ComparisionOutput finalOutput = new ComparisionOutput();
                finalOutput.RowSet = new DataTable();
                IExcelDocumentService excelDocumentServiceObj = new ExcelDocumentService();
                List<ExcelDocument> excelDocuments = new List<ExcelDocument>();
                foreach (var item in dataSourceColumnList)
                {
                    ExcelDocument excelDoc = new ExcelDocument();
                    if (RequestType == "immediate")
                    {
                        if (item.DataSourceType == "file-upload")
                        {
                            //excelDoc = IntermediateCache<ExcelDocumentDTO>.Current.Get(item.Source, excelDoc);
                            var bytes = Convert.FromBase64String(item.FilePath.Replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", ""));
                            excelDoc.Table = excelDocumentServiceObj.ExcelToDataTableUsingExcelDataReader(new MemoryStream(bytes));
                            excelDoc.FileName = item.FileName;
                        }
                        else
                        {
                            excelDoc.Table = DbNamesObj.GetColumnData(item.DbServerName, item.DBName, item.TableName, item.SqlQuery, item.ColumnName, item.DatabaseObjectType, item.StoredProcedureName, item.SpParameterValue, item.AuthenticationType, item.UserName, item.Password);
                        }
                        excelDoc.Source = item.Source;
                        excelDocuments.Add((ExcelDocument)excelDoc.Clone());
                    }
                    else
                    {
                        excelDoc.FileName = item.FileName;
                        excelDoc.Source = item.Source;
                        excelDoc.Table = excelDocumentServiceObj.ExcelToDataTableUsingExcelDataReader(item.FileName);
                        excelDocuments.Add(excelDoc);
                    }
                }
                string commonCol1 = dataSourceColumnList.Where(y => y.Source.Contains("DataSource1")).Select(y => y.CommonColumn).FirstOrDefault();
                string commonCol2 = dataSourceColumnList.Where(y => y.Source.Contains("DataSource2")).Select(y => y.CommonColumn).FirstOrDefault();

                List<DataTableFilter> source1DataTableFilterDTO = dataSourceColumnList.Where(y => y.Source.Contains("DataSource1")).FirstOrDefault().DataTableFilterList == null ? new List<DataTableFilter>() : dataSourceColumnList.Where(y => y.Source.Contains("DataSource1")).FirstOrDefault().DataTableFilterList;
                List<DataTableFilter> source2DataTableFilterDTO = dataSourceColumnList.Where(y => y.Source.Contains("DataSource2")).FirstOrDefault().DataTableFilterList == null ? new List<DataTableFilter>() : dataSourceColumnList.Where(y => y.Source.Contains("DataSource2")).FirstOrDefault().DataTableFilterList;

                List<DataColumns> ColumnNameList1 = dataSourceColumnList.Where(y => y.Source.Contains("DataSource1")).Select(y => y.ColumnNameList).FirstOrDefault();
                List<DataColumns> ColumnNameList2 = dataSourceColumnList.Where(y => y.Source.Contains("DataSource2")).Select(y => y.ColumnNameList).FirstOrDefault();
                var TuppledOutput0 = DataTableRowEqualizer.RemoveColumnDuplicatesList(ColumnNameList1, ColumnNameList2);
                ColumnNameList1 = TuppledOutput0.Item1;
                ColumnNameList2 = TuppledOutput0.Item2;



                DataTable dataTable1 = excelDocuments.Where(y => y.Source.Contains("DataSource1")).FirstOrDefault().Table;
                DataTable dataTable2 = excelDocuments.Where(y => y.Source.Contains("DataSource2")).FirstOrDefault().Table;
                var TuppledOutput1 = DataTableRowEqualizer.RemoveColumnDuplicatesDatable(dataTable1, dataTable2);
                dataTable1 = TuppledOutput1.Item1;
                dataTable2 = TuppledOutput1.Item2;
                var TuppledOutput2 = FilterDatatable.FilterDataTable(dataTable1, dataTable2, source1DataTableFilterDTO, source2DataTableFilterDTO);
                dataTable1 = TuppledOutput2.Item1;
                dataTable2 = TuppledOutput2.Item2;

                if (string.IsNullOrWhiteSpace(commonCol1) || string.IsNullOrWhiteSpace(commonCol2))
                {
                    int IteratrionLength = ColumnNameList1.Count() > ColumnNameList2.Count() ? ColumnNameList2.Count() : ColumnNameList1.Count();

                    var TuppledOutput = DataTableRowEqualizer.EqualizeDatable(dataTable1, dataTable2);
                    dataTable1 = TuppledOutput.Item1;
                    dataTable2 = TuppledOutput.Item2;

                    for (int i = 0; i < IteratrionLength; i++)
                    {
                        string Col1 = ColumnNameList1[i].ColumnName.ToString();
                        string Col2 = ColumnNameList2[i].ColumnName.ToString();

                        DataView view = new DataView(dataTable1);
                        DataTable crunchDataTable1 = view.ToTable(false, ColumnNameList1[i].ColumnName.ToString());

                        view = new DataView(dataTable2);
                        DataTable crunchDataTable2 = view.ToTable(false, ColumnNameList2[i].ColumnName.ToString());

                        DataTable dataTableOutput = stringMetricObj.StringComparisonResult(crunchDataTable1, crunchDataTable2, "ExelFile", Col1, Col2, i + 1);

                        if (i == 0)
                        {
                            finalOutput.RowSet = dataTableOutput.Copy();
                        }
                        else
                        {
                            finalOutput.RowSet = MergeDataTable.MergeDataTables(finalOutput.RowSet, dataTableOutput);
                        }
                    }
                    //if (RequestType == "immediate")
                    //{
                    //    DataTable ChartDataTable = new DataTable();
                    //    ChartDataTable.Merge(MergeDataTable.MergeDataTablesPieChart(finalOutput.RowSet));
                    //    finalOutput.RowSet = MergeDataTable.CalculatePieChartNumbers(ChartDataTable);
                    //}
                }
                else
                {
                    finalOutput.RowSet = JoinedDataTableResultset(dataTable1, dataTable2, commonCol1, commonCol2, ColumnNameList1, ColumnNameList2);
                }


                finalOutput.ColumnSet = finalOutput.RowSet.Columns.Cast<DataColumn>().Select(col => Convert.ToString(col)).ToList();
                //if (RequestType == "immediate")
                //{
                //    IntermediateCache<DataTable>.Current.Set("ComparisionOutputGrid", finalOutput.RowSet);
                //}
                return finalOutput;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        private DataTable JoinedDataTableResultset(DataTable dataTable1, DataTable dataTable2, string commonCol1, string commonCol2, List<DataColumns> ColumnNameList1, List<DataColumns> ColumnNameList2)
        {
            try
            {
                if (commonCol1 == commonCol2)
                {
                    commonCol2 = commonCol2 + "1";
                }
                var dt = new DataTable();
                var Result = new DataTable();
                var joinTable = from t1 in dataTable1.AsEnumerable()
                                join t2 in dataTable2.AsEnumerable()
                                    on t1[commonCol1] equals t2[commonCol2]
                                select new { t1, t2 };

                foreach (DataColumn col in dataTable1.Columns)
                    dt.Columns.Add(col.ColumnName, typeof(string));

                foreach (DataColumn col in dataTable2.Columns)
                    dt.Columns.Add(col.ColumnName, typeof(string));

                foreach (var row in joinTable)
                {
                    var newRow = dt.NewRow();
                    newRow.ItemArray = row.t1.ItemArray.Concat(row.t2.ItemArray).ToArray();
                    dt.Rows.Add(newRow);
                }

                dt.Columns.Remove(commonCol2);

                ColumnNameList1.Remove(ColumnNameList1.Find(x => x.ColumnName == commonCol1));
                ColumnNameList2.Remove(ColumnNameList2.Find(x => x.ColumnName == commonCol2));

                DataView dataView = new DataView(dt);
                Result = dataView.ToTable(false, commonCol1);

                int IteratrionLength = ColumnNameList1.Count() > ColumnNameList2.Count() ? ColumnNameList2.Count() : ColumnNameList1.Count();

                for (int i = 0; i < IteratrionLength; i++)
                {
                    string Col1 = ColumnNameList1[i].ColumnName.ToString();
                    string Col2 = ColumnNameList2[i].ColumnName.ToString();

                    DataView view = new DataView(dt);
                    DataTable crunchDataTable1 = view.ToTable(false, ColumnNameList1[i].ColumnName.ToString());

                    view = new DataView(dt);
                    DataTable crunchDataTable2 = view.ToTable(false, ColumnNameList2[i].ColumnName.ToString());

                    DataTable dataTableOutput = stringMetricObj.StringComparisonResult(crunchDataTable1, crunchDataTable2, "ExelFile", Col1, Col2, i + 1);

                    Result = MergeDataTable.MergeDataTables(Result, dataTableOutput);
                }

                return Result;
            }
            catch (Exception e)
            {

                throw;
            }

        }

    }
}