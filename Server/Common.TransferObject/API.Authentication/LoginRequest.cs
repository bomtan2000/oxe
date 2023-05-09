using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Authentication
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string SystemId { get; set; }

        [Required]
        public string IPAddress { get; set; }
    }
}