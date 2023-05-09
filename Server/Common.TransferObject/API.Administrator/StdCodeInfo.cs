using System;
using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Administrator
{
    public class StdCodeInfo
    {
        public string CodeGroup { get; set; }
        public string CodeId { get; set; }
        public string CodeDesc { get; set; }
        public int? CreatedBy { get; set; }
        [Required]
        public DateTime? CreateDate { get; set; }
        public int CompanyId { get; set; }
        public string Remark { get; set; }
        [Required]
        public string CreatedByName { get; set; }
        public int? SeqNo { get; set; }
        public string UpdatedByName { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public char IsValid { get; set; }
    }

    public class DeleteStdCode
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UpdateBy { get; set; }
    }

    public class GetAllStdCode
    {
        public string CodeGroup { get; set; }
        public string CodeId { get; set; }
        public string CodeDesc { get; set; }
    }

    public class UpdateStdCode
    {
        [Required]
        public int Id { get; set; }
        public string CodeGroup { get; set; }
        public string CodeId { get; set; }
        public string CodeDesc { get; set; }
        public int? UpdatedBy { get; set; }
        [Required]
        public DateTime? UpdateDate { get; set; }
        public int CompanyId { get; set; }
        public string Remark { get; set; }
        [Required]
        public string UpdatedByName { get; set; }
        public int? SeqNo { get; set; }
    }
}