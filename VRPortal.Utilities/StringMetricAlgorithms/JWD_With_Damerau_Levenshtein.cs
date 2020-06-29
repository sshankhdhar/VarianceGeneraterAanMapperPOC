using System;
using System.Collections.Generic;

namespace VRPortal.Utilities.StringMetricAlgorithms {
    public static partial class JWD_With_Damerau_LevenshteinAlgo {
        /* The Winkler modification will not be applied unless the 
         * percent match was at or above the mWeightThreshold percent 
         * without the modification. 
         * Winkler's paper used a default value of 0.7
         */
        private const double WeightThreshold = 0.7;

        /* Size of the prefix to be concidered by the Winkler modification. 
         * Winkler's paper used a default value of 4
         */
        private const int NumChars = 4;

        /// <summary>
        /// Returns the Jaro-Winkler distance between the specified  
        /// strings. The distance is symmetric and will fall in the 
        /// range 0 (perfect match) to 1 (no match). 
        /// </summary>
        /// <param name="aString1">First String</param>
        /// <param name="aString2">Second String</param>
        /// <param name="comparer">Comparer used to determine character equality.</param>
        /// <returns></returns>
        public static double Distance (string aString1, string aString2, IEqualityComparer<char> comparer = null) {
            return 1.0 - aString1.JWD_With_Damerau_Levenshtein (aString2, comparer);
        }

        /// <summary>
        /// Returns the Jaro-Winkler distance between the specified  
        /// strings. The distance is symmetric and will fall in the 
        /// range 0 (no match) to 1 (perfect match). 
        /// </summary>
        /// <param name="aString1">First String</param>
        /// <param name="aString2">Second String</param>
        /// <param name="comparer">Comparer used to determine character equality.</param>
        /// <returns></returns>
        public static double JWD_With_Damerau_Levenshtein (this string s1, string s2, IEqualityComparer<char> comparer = null) {
            if (s1 == null || s2 == null || s1.Trim () == "" || s2.Trim () == "") {
                return 0;
            }
            string aString1 = s1;
            string aString2 = s2;
            comparer = comparer ?? EqualityComparer<char>.Default;

            var lLen1 = aString1.Length;
            var lLen2 = aString2.Length;
            if (lLen1 == 0)
                return lLen2 == 0 ? 1.0 : 0.0;

            var lSearchRange = Math.Max (0, Math.Max (lLen1, lLen2) / 2 - 1);

            var lMatched1 = new bool[lLen1];
            var lMatched2 = new bool[lLen2];

            var lNumCommon = 0;
            for (var i = 0; i < lLen1; ++i) {
                var lStart = Math.Max (0, i - lSearchRange);
                var lEnd = Math.Min (i + lSearchRange + 1, lLen2);
                for (var j = lStart; j < lEnd; ++j) {
                    if (lMatched2[j]) continue;
                    if (!comparer.Equals (aString1[i], aString2[j]))
                        continue;
                    lMatched1[i] = true;
                    lMatched2[j] = true;
                    ++lNumCommon;
                    break;
                }
            }

            //if (lNumCommon == 0) return 0.0;

            //var lNumHalfTransposed = 0;
            //var k = 0;
            //for (var i = 0; i < lLen1; ++i)
            //{
            //    if (!lMatched1[i]) continue;
            //    while (!lMatched2[k]) ++k;
            //    if (!comparer.Equals(aString1[i], aString2[k]))
            //        ++lNumHalfTransposed;
            //    ++k;
            //}
            // System.Diagnostics.Debug.WriteLine("numHalfTransposed=" + numHalfTransposed);

            var lNumTransposed = Damerau_Levenshtein.Damerau_LevenshteinDistance (s1, s2) / 2;

            // System.Diagnostics.Debug.WriteLine("numCommon=" + numCommon + " numTransposed=" + numTransposed);
            double lNumCommonD = lNumCommon;
            try {
                var lWeight = (lNumCommonD / lLen1 +
                    lNumCommonD / lLen2 +
                    (lNumCommon - lNumTransposed) / lNumCommonD) / 3.0;

                if (lWeight <= 0) return 0;
                if (lWeight <= WeightThreshold) return lWeight;
                var lMax = Math.Min (NumChars, Math.Min (aString1.Length, aString2.Length));
                var lPos = 0;
                while (lPos < lMax && comparer.Equals (aString1[lPos], aString2[lPos]))
                    ++lPos;
                if (lPos == 0) return lWeight;
                return lWeight + 0.1 * lPos * (1.0 - lWeight);
            } catch (DivideByZeroException e) {

                return 0;
            }

        }
    }
}