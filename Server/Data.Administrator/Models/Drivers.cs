﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using Service.Core;

namespace Data.Administrator.EFCore.Models
{
    public partial class Drivers :BaseEntity
    {
        public string DriverName { get; set; }
        public string MobileNo { get; set; }
        public DateTime? Dob { get; set; }
        public string PlateNumber { get; set; }
        public string EquipemtType { get; set; }
        public int? CompanyId { get; set; }
        public string DriverIcno { get; set; }
        public string LicenseClass { get; set; }
        public string Remark { get; set; }
        public int? ReferenceUserId { get; set; }
        public string Attach1 { get; set; }
        public string Attach2 { get; set; }
        public string Attach3 { get; set; }
        public string Attach4 { get; set; }
        public string CustomField01 { get; set; }
        public string CustomField02 { get; set; }
        public string CustomField03 { get; set; }
        public string CustomField04 { get; set; }
        public string CustomField05 { get; set; }
    }
}