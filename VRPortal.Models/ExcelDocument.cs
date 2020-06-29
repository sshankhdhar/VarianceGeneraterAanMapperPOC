using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Http;
namespace VRPortal.Models
{
    public class ExcelDocument : ICloneable
    {

        // private readonly IHttpContextAccessor accessor;
        // public ExcelDocument(IHttpContextAccessor accessor)
        // {
        //     this.accessor = accessor;
        // }

        public IList<IFormFile> File { get; set; }
        public string FileName { get; set; }
        public DataTable Table { get; set; }
        public string Source { get; set; }
        // public HttpContext httpContext { get; set; }
        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }
}
