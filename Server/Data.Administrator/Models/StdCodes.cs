﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Service.Core;

namespace Data.Administrator.EFCore.Models
{
    public partial class StdCodes : BaseEntity
    {
        public string CodeGroup { get; set; }
        public string CodeId { get; set; }
        public string CodeDesc { get; set; }
        public int? CompanyId { get; set; }
        public string Remark { get; set; }
        public string CreatedByName { get; set; }
        public string UpdatedByName { get; set; }
        public int? SeqNo { get; set; }
    }
}