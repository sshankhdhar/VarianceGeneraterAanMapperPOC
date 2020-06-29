using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VRPortal.Utilities.StringMetricAlgorithms {
    public static partial class Damerau_Levenshtein {
        public static double Damerau_LevenshteinStringSimilarity (this string src, string dest) {

            int length = Math.Max (src.Length, dest.Length);

            // Calculate the score:
            double score = 1.0 - (double) Damerau_LevenshteinDistance (src, dest) / length;

            return score;

        }
        public static int Damerau_LevenshteinDistance (string src, string dest) {
            if (src == dest)
                return 0;

            int len_orig = src.Length;
            int len_diff = dest.Length;
            if (len_orig == 0 || len_diff == 0)

                return len_orig == 0 ? len_diff : len_orig;

            var matrix = new int[len_orig + 1, len_diff + 1];

            for (int i = 1; i <= len_orig; i++) {
                matrix[i, 0] = i;
                for (int j = 1; j <= len_diff; j++) {
                    int cost = dest[j - 1] == src[i - 1] ? 0 : 1;
                    if (i == 1)
                        matrix[0, j] = j;

                    var vals = new int[] {
                        matrix[i - 1, j] + 1,
                        matrix[i, j - 1] + 1,
                        matrix[i - 1, j - 1] + cost
                    };
                    matrix[i, j] = vals.Min ();
                    if (i > 1 && j > 1 && src[i - 1] == dest[j - 2] && src[i - 2] == dest[j - 1])
                        matrix[i, j] = Math.Min (matrix[i, j], matrix[i - 2, j - 2] + cost);
                }
            }
            return matrix[len_orig, len_diff];
        }
    }
}