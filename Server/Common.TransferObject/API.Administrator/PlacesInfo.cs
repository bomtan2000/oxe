using System;
using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Administrator
{
    public class DeletePlace
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int UpdateBy { get; set; }
    }

    public class GetAllPlaces
    {
        public string ContactPerson { get; set; }
        public string MobileNo { get; set; }
    }

    public class AddPlaces
    {
        public string PlaceDesc { get; set; }
        public string Address { get; set; }
        public string Postalcode { get; set; }
        public string ContactPerson { get; set; }
        public string MobileNo { get; set; }
        public int CompanyId { get; set; }
        public int? ClientsId { get; set; }
        public string Remark { get; set; }
        public string Country { get; set; }
        public string CreatedByName { get; set; }
    }

    public class UpdatePlace
    {
        [Required]
        public int Id { get; set; }
        public string PlaceDesc { get; set; }
        public string Address { get; set; }
        public string Postalcode { get; set; }
        public string ContactPerson { get; set; }
        public string MobileNo { get; set; }
        public int CompanyId { get; set; }
        public int? ClientsId { get; set; }
        public string Remark { get; set; }
        public string Country { get; set; }
        public string UpdatedByName { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
