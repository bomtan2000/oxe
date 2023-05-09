using System;
using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Administrator
{
    public class DeleteDriver
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UpdateBy { get; set; }
        [Required]
        public DateTime UpdateDate { get; set; }
    }

    public class GetAllDriver
    {
        public string DriverName { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class AddDriver
    {
        [Required]
        public string DriverName { get; set; }
        public string? MobileNo { get; set; }
        public DateTime? Dob { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? PlateNumber { get; set; }
        public string? EquipemtType { get; set; }
        public int? CompanyId { get; set; }
        public string? DriverIcno { get; set; }
        public string? LicenseClass { get; set; }
        public string? Remark { get; set; }
        public int? ReferenceUserId { get; set; }
    }

    public class UpdateDriver
    {
        [Required]
        public int Id { get; set; }
        public string? DriverName { get; set; }
        public string? MobileNo { get; set; }
        public DateTime Dob { get; set; }
        public DateTime UpdateDate { get; set; }
        public int UpdateBy { get; set; }
        public string? PlateNumber { get; set; }
        public string? EquipemtType { get; set; }
        public int? CompanyId { get; set; }
        public string? DriverIcno { get; set; }
        public string? LicenseClass { get; set; }
        public string? Remark { get; set; }
        public int? ReferenceUserId { get; set; }
    }
}
