using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Text.RegularExpressions;
using VRPortal.Utilities.StringMetricAlgorithms;

namespace VRPortal.BL.StringMetricBL
{
    public class StringMetric : IStringMetric
    {
        public DataTable StringComparisonResult(List<string> ColumnList1, List<string> ColumnList2, string Type, string Cloumn1 = "", string Cloumn2 = "")
        {
            DataTable dataTable = new DataTable();
            if (Type == "db")
            {
                dataTable.Columns.Add("ColumnValue1");
                dataTable.Columns.Add("ColumnValue2");
                dataTable.Columns.Add("Percentage");
            }
            else
            {
                dataTable.Columns.Add(Cloumn1);
                dataTable.Columns.Add(Cloumn2);
                dataTable.Columns.Add(Cloumn1 + "%" + Cloumn2);
            }

            for (int listi = 0; listi < ColumnList1.Count; listi++)
            {
                SimilarityTool similarityTool = new SimilarityTool();
                if (ColumnList1[listi] == null) { ColumnList1[listi] = ""; }
                if (ColumnList2[listi] == null) { ColumnList2[listi] = ""; }

                string kevin = Regex.Replace(ColumnList1[listi], @"\s+", "").ToUpper();
                string kevyn = Regex.Replace(ColumnList2[listi], @"\s+", "").ToUpper();
                //int m = kevin.Intersect(kevyn).Count();

                if (kevin.Length == 0 || kevyn.Length == 0)
                {
                    dataTable.Rows.Add(ColumnList1[listi].ToString(), ColumnList2[listi].ToString(), "0");
                }
                else
                {
                    var lMatched1 = new bool[kevin.Length];
                    var lMatched2 = new bool[kevyn.Length];

                    var lNumCommon = 0;
                    for (var i = 0; i < kevin.Length; ++i)
                    {
                        var lStart = Math.Max(0, i - kevyn.Length);
                        var lEnd = kevyn.Length;
                        for (var j = lStart; j < lEnd; ++j)
                        {
                            if (lMatched2[j]) continue;
                            if (!Comparer.Equals(kevin[i], kevyn[j]))
                                continue;
                            lMatched1[i] = true;
                            lMatched2[j] = true;
                            ++lNumCommon;
                            break;
                        }
                    }
                    double intersectPercentage = (lNumCommon * 2 * 100) / (kevin.Length + kevyn.Length);
                    double Percentage;
                    //Console.WriteLine(intersectPercentage);
                    if (intersectPercentage >= 60)
                    {
                        Percentage = JWD_With_Damerau_LevenshteinAlgo.JWD_With_Damerau_Levenshtein(kevin, kevyn) * 100;
                        //Percentage = JaroWinklerDistance.Proximity(kevin, kevyn)*100;
                        //Console.WriteLine(sdsd);
                    }
                    else
                    {
                        Percentage = similarityTool.CompareStrings(ColumnList1[listi], ColumnList2[listi]) * 100;
                        //Console.WriteLine(Number);
                    }
                    dataTable.Rows.Add(ColumnList1[listi].ToString(), ColumnList2[listi].ToString(), Percentage);
                }
            }
            return dataTable;
        }

        public DataTable StringComparisonResult(DataTable ColumnList1, DataTable ColumnList2, string Type, string Cloumn1 = "", string Cloumn2 = "", int index = 0)
        {
            try
            {
                DataTable dataTable = new DataTable();
                dataTable.Columns.Add(Cloumn1);
                dataTable.Columns.Add(Cloumn2);
                if (index == 0)
                {
                    dataTable.Columns.Add(Cloumn1 + "%" + Cloumn2);
                }
                else
                {
                    dataTable.Columns.Add("Similarity " + index);
                }


                for (int listi = 0; listi < ColumnList1.Rows.Count; listi++)
                {
                    SimilarityTool similarityTool = new SimilarityTool();

                    if (ColumnList1.Rows[listi][0] == null) { ColumnList1.Rows[listi][0] = ""; }
                    if (ColumnList2.Rows[listi][0] == null) { ColumnList2.Rows[listi][0] = ""; }

                    string kevin = Regex.Replace(ColumnList1.Rows[listi][0].ToString(), @"\s+", "").ToUpper();
                    string kevyn = Regex.Replace(ColumnList2.Rows[listi][0].ToString(), @"\s+", "").ToUpper();

                    if (kevin.Length == 0 || kevyn.Length == 0)
                    {
                        dataTable.Rows.Add(kevin, kevyn.ToString(), "0");
                    }
                    else
                    {
                        var lMatched1 = new bool[kevin.Length];
                        var lMatched2 = new bool[kevyn.Length];

                        var lNumCommon = 0;
                        for (var i = 0; i < kevin.Length; ++i)
                        {
                            var lStart = Math.Max(0, i - kevyn.Length);
                            var lEnd = kevyn.Length;
                            for (var j = lStart; j < lEnd; ++j)
                            {
                                if (lMatched2[j]) continue;
                                if (!Comparer.Equals(kevin[i], kevyn[j]))
                                    continue;
                                lMatched1[i] = true;
                                lMatched2[j] = true;
                                ++lNumCommon;
                                break;
                            }
                        }
                        double intersectPercentage = (lNumCommon * 2 * 100) / (kevin.Length + kevyn.Length);
                        double Percentage;
                        //Console.WriteLine(intersectPercentage);
                        if (intersectPercentage >= 60)
                        {
                            Percentage = JWD_With_Damerau_LevenshteinAlgo.JWD_With_Damerau_Levenshtein(kevin, kevyn) * 100;
                            //Percentage = JaroWinklerDistance.Proximity(kevin, kevyn)*100;
                            //Console.WriteLine(sdsd);
                        }
                        else
                        {
                            Percentage = similarityTool.CompareStrings(kevin, kevyn) * 100;
                            //Console.WriteLine(Number);
                        }
                        dataTable.Rows.Add(ColumnList1.Rows[listi][0].ToString(), ColumnList2.Rows[listi][0].ToString(), Math.Round(Percentage, 2));
                    }
                }
                return dataTable;
            }
            catch (Exception e)
            {

                throw;
            }

        }
    }
}
