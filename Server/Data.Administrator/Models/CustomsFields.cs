﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Service.Core;

namespace Data.Administrator.EFCore.Models
{
    public partial class CustomsFields : BaseEntity
    {
        public string DatabaseName { get; set; }
        public string TableObject { get; set; }
        public string ColumnObject { get; set; }
        public string FieldDesc { get; set; }
        public string FieldType { get; set; }
        public string FieldOptions { get; set; }
        public string DefaultValue { get; set; }
        public string Remarks { get; set; }
    }
}