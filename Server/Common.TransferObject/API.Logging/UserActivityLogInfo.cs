using System.ComponentModel.DataAnnotations;

namespace Common.TransferObject.API.Logging
{
    public class UserActivityLogInfo
    {
        [Required]
        public string UserId { get; set; }
        public string IPAddress { get; set; }
        public string SystemId { get; set; }
        public string FromServer { get; set; }    
        public string MetaData { get; set; }
        public string Remarks { get; set; }
    }

    public class GetAllActivity
    {
        [Required]
        public string UserId { get; set; }      
        public string SystemId { get; set; }
    }
}