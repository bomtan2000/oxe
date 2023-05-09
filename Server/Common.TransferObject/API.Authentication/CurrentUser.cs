namespace Common.TransferObject.API.Authentication
{
    public class CurrentUser
    {
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string ProfilePhoto { get; set; }
        public string Gender { get; set; }
        public string CompanyName { get; set; }
        public string CompanyShortCode { get; set; }
    }
}