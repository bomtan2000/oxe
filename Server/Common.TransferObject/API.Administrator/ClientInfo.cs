using System;
using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Administrator
{
    public class DeleteClient
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UpdateBy { get; set; }
        [Required]
        public DateTime UpdateDate { get; set; }
    }

    public class GetAllClient
    {

        public string ClientName { get; set; }

        public string CompanyId { get; set; }

        public string Phone { get; set; }
    }

    public class AddClient
    {
        [Required]
        public string? ClientName { get; set; }
        public string? Address { get; set; }
        public string? PostalCode { get; set; }
        public string? ContactPerson { get; set; }
        public string? MobileNo { get; set; }
        public int CompanyId { get; set; }
        public string? Country { get; set; }
        public string? CreateByName { get; set; }
    }

    public class UpdateClient
    {
        [Required]
        public int Id { get; set; }
        public string ClientName { get; set; }
        public string? Address { get; set; }
        public string? PostalCode { get; set; }
        public string? ContactPerson { get; set; }
        public string MobileNo { get; set; }
        public int CompanyId { get; set; }
        public string? Remark { get; set; }
        public string? Country { get; set; }
        public string? UpdatedByName { get; set; }
    }
}
