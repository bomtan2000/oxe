using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.TransferObject.API.Administrator
{
    public class AnnounceId
    {
        [Required]
        public int Id { get; set; }
        public int UpdateBy { get; set; }
    }

    public class GetAllAnnounce
    {
        public string Subject { get; set; }
        public string AnnounceType { get; set; }
    }

    public class AddAnnounce
    {
        public DateTime CreateDate { get; set; }
        public int CreateBy { get; set; }
        public string AnnounceType { get; set; }
        public string Subject { get; set; }
        public string AnnounceText { get; set; }
        public string AnnounceTypeDesc { get; set; }
        [Required]
        public char? IsRequireEndorse { get; set; }
        public string UserGroup { get; set; }
        public string UserGroupDesc { get; set; }
        public int? ReadCount { get; set; }
        [Required]
        public int CompanyId { get; set; }
    }

    public class UpdateAnounce
    {
        [Required]
        public int Id { get; set; }
        public DateTime? ExpiredDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int UpdateBy { get; set; }
        public string AnnounceType { get; set; }
        public string Subject { get; set; }
        public string AnnounceText { get; set; }
        public string AnnounceTypeDesc { get; set; }
        public char? IsRequireEndorse { get; set; }
        public string UserGroup { get; set; }
        public string UserGroupDesc { get; set; }
        public int? ReadCount { get; set; }
        [Required]
        public int CompanyId { get; set; }
    }
}