using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.FileUpload
{
    public class AvatarModel
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string LoginId { get; set; }

        [Required]
        public string CompanyShortCode { get; set; }

        [Required]
        public IFormFile AvatarFile { get; set; }

        [Required]
        public string IPAddress { get; set; }
        
        [Required]
        public string SystemId { get; set; }
    }

    public class AvatarInfo
    {
        public int UserId { get; set; }

        public string LoginId { get; set; }

        public string AvatarPath { get; set; }
    }
}