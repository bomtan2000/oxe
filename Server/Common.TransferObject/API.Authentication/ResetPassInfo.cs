using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Authentication
{
    public class ChangePassWithGuiId
    {
        [Required]
        public string VerifyGuiId { get; set; }
        [Required]
        public string Pwd { get; set; }
        [Required]
        public string SystemId { get; set; }
        [Required]
        public string IPAddress { get; set; }
    }
}
